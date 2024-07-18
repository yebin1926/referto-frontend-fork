import { Upload, Loader } from "lucide-react";
import { useState, useRef } from "react";
// import SelectStyleModal from "../Modals/SelectStyle";
import { uploadPaper, uploadPaperInfo } from "../../apis/api";
import { useParams } from "react-router-dom";

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
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("pdf", selectedFile);
    formData.append("assignment", assignmentId);

    setUploadStatus("ing");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await uploadPaper(formData, config);
      const response2 = await uploadPaperInfo(response.data.paper_id);
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
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
    </>
    //{isOpen && <SelectStyleModal onClose={handleCloseClick} onClick={handleUpload} />}
  );
};

export default FileUpload;
