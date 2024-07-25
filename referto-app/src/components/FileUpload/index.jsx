import { Upload } from "lucide-react";
import { useState, useRef } from "react";
import { createMemo, uploadPaper, uploadPaperInfo } from "../../apis/api";
import { useParams } from "react-router-dom";
import Loading from "./loading";

const FileUpload = () => {
  const [uploadStatus, setUploadStatus] = useState("");
  const fileInputRef = useRef(null);
  const { assignmentId } = useParams();

  const handleFileChange = async (e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploadStatus("uploading");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };


    try {
      
      for (let i = 0; i < selectedFiles.length; i++) {
        console.log(`Processing file ${i + 1} of ${selectedFiles.length}`);

        const formData = new FormData();

        formData.append("pdf", selectedFiles[i]);
        formData.append("assignment", assignmentId);

        try {
          console.log("Uploading paper...");
          const response_paper = await uploadPaper(formData, config);
          console.log("Paper upload response:", response_paper);
          console.log("File uploaded successfully");

          try {
            console.log("Uploading paper info...");
            const response_paperinfo = await uploadPaperInfo(response_paper.data.paper_id);
            console.log("Paper info upload response:", response_paperinfo);
            console.log("Paper info uploaded successfully");

            try {
              const response_memo = await createMemo(response_paper.data.paper_id);
            } catch (memoError) {
              console.error("Error creating memo:", memoError);
            }
          } catch (paperInfoError) {
            console.error("Error uploading paper info:", paperInfoError);
          }
        } catch (paperError) {
          console.error("Error uploading paper:", paperError);
        }
      }
      console.log("All files processed successfully.");
      window.location.reload();
    } catch (error) {
      console.error("Error during file processing:", error);
      alert("적절한 파일형식이 아닙니다.");
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
        className="px-3 py-2 bg-neutral-900 rounded-md justify-center items-center gap-2.5 flex cursor-pointer"
        onClick={handleUploadClick}
      >
        <div className="justify-center items-center gap-2.5 flex">
          <Upload className="text-white selection:w-[18px] h-[18px] relative" />
        </div>
        <div className="text-right text-white text-lg font-medium font-['Pretendard'] leading-normal">
          Upload
        </div>
      </div>
      {uploadStatus === "uploading" && <Loading />}
    </>
  );
};

export default FileUpload;
