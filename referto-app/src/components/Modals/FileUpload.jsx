import { FileUp, X } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { createMemo, uploadPaper, uploadPaperInfo } from "../../apis/api";
import { useParams } from "react-router-dom";
import Loading from "./loading";

const FileUploadModal = ({setIsOpen}) => {
  const [uploadStatus, setUploadStatus] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const { assignmentId } = useParams();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (files) => {
    if (!files || files.length === 0) return;

    setUploadStatus(true); //왜 안되는겨!!!!!
    setIsOpen(false);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("pdf", files[i]);
        formData.append("assignment", assignmentId);

        try {
          const response_paper = await uploadPaper(formData, config);
          const response_paperinfo = await uploadPaperInfo(response_paper.data.paper_id);
          await createMemo(response_paper.data.paper_id);
        } catch (error) {
          console.error("Error during file processing:", error);
          alert("적절한 파일형식이 아닙니다.");
          setUploadStatus(false);
          return;
        }
      }

      console.log("All files processed successfully.");
      setUploadStatus(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error during file processing:", error);
      alert("적절한 파일형식이 아닙니다.");
      setUploadStatus(false);
    }
  };

  // Drag and Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFileChange(files);
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    handleFileChange(files);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-hidden">
      <div
        className="w-[600px] h-auto px-8 py-8 bg-white rounded-2xl shadow flex-col justify-start items-start gap-7 inline-flex"
      >
        <div className="h-auto self-stretch flex-col justify-center items-start gap-2 inline-flex">
          <div className="self-stretch justify-between items-start inline-flex">
            <div className="text-neutral-900 text-2xl font-semibold font-['Pretendard'] leading-[33.60px]">
              파일 업로드
            </div>
            <X
              className="w-[20px] h-[20px] relative cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="self-stretch text-neutral-500 text-sm font-medium font-['Pretendard'] leading-tight">
            * 인터넷 자료의 경우 사이트에서 ctr+s를 눌러 html 파일을 저장한 후 업로드해주세요.
          </div>
        </div>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleInputChange}
        />
        <div
          className={`self-stretch px-2.5 py-6 bg-neutral-50 rounded border border-2 border-dashed border-neutral-300 flex-col justify-center items-center gap-1 flex cursor-pointer ${isDragOver ? 'bg-neutral-400' : ''}`}
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="self-stretch flex-col justify-start items-center gap-2 flex">
            <FileUp className="w-8 h-8 text-neutral-300" />
            <div className="self-stretch text-center text-neutral-300 text-sm font-medium font-['Pretendard'] leading-none">
              html, pdf, doc, hwp 첨부 가능
            </div>
            <div className="self-stretch text-center text-neutral-300 text-sm font-medium font-['Pretendard'] leading-none">
              클릭하거나 업로드할 파일을 드롭하세요.
            </div>
          </div>
        </div>
      </div>
      {uploadStatus && <Loading />}
    </div>
  );
};

export default FileUploadModal;
