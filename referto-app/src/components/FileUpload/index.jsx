import { Upload, Loader } from "lucide-react";
import { useState, useRef } from "react";
// import SelectStyleModal from "../Modals/SelectStyle";
import { createMemo, uploadPaper, uploadPaperInfo } from "../../apis/api";
import { useParams } from "react-router-dom";
import Loading from "./loading";

const FileUpload = () => {
  const [uploadStatus, setUploadStatus] = useState("");
  const fileInputRef = useRef(null);

  // const [isOpen, setIsOpen] = useState(false);
  // const handleUploadClick = () => {
  //   setIsOpen(true);
  // };
  // const handleCloseClick = () => {
  //   setIsOpen(false);
  // };

  const { assignmentId } = useParams();

  const handleFileChange = async (e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    setUploadStatus("ing");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const formData = new FormData();
        formData.append("pdf", selectedFiles[i]);
        formData.append("assignment", assignmentId);

        const response_paper = await uploadPaper(formData, config);
        console.log("File uploaded successfully");

        await uploadPaperInfo(response_paper.data.paper_id);
        const response_memo = await createMemo(response_paper.data.paper_id);
        console.log("Paper info uploaded successfully");
      }
      window.location.reload();
    } catch (error) {
      console.error(
        "Error uploading file:",
        error.response ? error.response : error.message
      );
      alert('적절한 파일형식이 아닙니다.');
      window.location.reload();
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div
        className="px-4 py-2 bg-neutral-900 rounded-md justify-center items-center gap-2.5 flex cursor-pointer"
        onClick={handleUploadClick}
      >
        <div className="justify-center items-center gap-2.5 flex">
          {uploadStatus === "ing" ? (
            <Loader className="text-white selection:w-[18px] h-[18px] relative" /> 
          ) : (
            <Upload className="text-white selection:w-[18px] h-[18px] relative" />
          )}
        </div>
        <div className="text-right text-white text-lg font-light font-['Pretendard'] leading-normal">
          Upload
        </div>
      </div>
      {uploadStatus === "ing" && <Loading />}
    </>
  );
};

export default FileUpload;
