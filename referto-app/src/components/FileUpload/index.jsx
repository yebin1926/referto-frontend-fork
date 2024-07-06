import { Upload } from "lucide-react";
import { useRef } from "react";

const FileUpload = () => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <div
        className="px-4 py-2 bg-neutral-900 rounded-md justify-center items-center gap-2.5 flex cursor-pointer"
        onClick={handleButtonClick}
      >
        <div className="justify-center items-center gap-2.5 flex">
          <Upload className="text-white selection:w-[18px] h-[18px] relative" />
        </div>
        <div className="text-right text-white text-lg font-light font-['Pretendard'] leading-normal">
          Upload
        </div>
      </div>
    </>
  );
};

export default FileUpload;
