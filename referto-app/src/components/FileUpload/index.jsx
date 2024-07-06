import { Upload } from "lucide-react";
import { useState } from "react";
import SelectStyleModal from "../Modals/SelectStyle";

const FileUpload = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleUploadClick = () => {
    setIsOpen(true);
  };
  const handleCloseClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div
        className={`px-4 py-2 bg-neutral-900 rounded-md justify-center items-center gap-2.5 flex ${
          !isOpen ? "cursor-pointer" : ""
        }`}
        onClick={handleUploadClick}
      >
        <div className="justify-center items-center gap-2.5 flex">
          <Upload className="text-white selection:w-[18px] h-[18px] relative" />
        </div>
        <div className="text-right text-white text-lg font-light font-['Pretendard'] leading-normal">
          Upload
        </div>
      </div>
      {isOpen && <SelectStyleModal onClose={handleCloseClick} />}
    </div>
  );
};

export default FileUpload;
