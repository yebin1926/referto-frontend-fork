import { Upload } from "lucide-react";
import { useState } from "react";
import SelectStyleModal from "../Modals/SelectStyle";
import { uploadPaper } from '../../apis/api';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  // const [uploadStatus, setUploadStatus] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleUploadClick = () => {
    setIsOpen(true);
  };
  const handleCloseClick = () => {
    setIsOpen(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('pdf', file);

    try {
        const response = await uploadPaper(formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('File uploaded successfully:', response.data);
        // setUploadStatus('Done')
    } catch (error) {
        console.error('Error uploading file:', error);
    }
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
      {isOpen && <SelectStyleModal onClose={handleCloseClick} onClick={handleUpload} />}
    </div>
  );
};

export default FileUpload;
