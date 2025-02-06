import { FileUp, X } from "lucide-react";
import { useState, useRef } from "react";
import { uploadPaper, uploadPaperInfo, testUploadPaper } from "../../apis/api";
import { useParams } from "react-router-dom";
import Loading from "./loading";
import AlertModal from "./AlertModal";
import SuccessModal from "./SuccessModal";
import alertCircle from "../../assets/images/alert-circle.svg";
import { trackEvent } from "../../utils/analytics";

const FileUploadModal = ({
  setIsOpen,
  isLandingPage,
  setTestReferencesList,
  onUploadSuccess,
}) => {
  const [uploadStatus, setUploadStatus] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorAlertModalIsOpen, setErrorAlertModalIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [uploadSuccessModalIsOpen, setUploadSuccessModalIsOpen] =
    useState(false);
  const fileInputRef = useRef(null);
  const { assignmentId } = useParams();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (files) => {
    if (!files || files.length === 0) return;

    if (isLandingPage && files.length > 1) {
      setErrorAlertModalIsOpen(true);
      return;
    }

    setUploadStatus(true);
    setIsVisible(false);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      if (isLandingPage) {
        const formData = new FormData();
        formData.append("pdf", files[0]);

        try {
          trackEvent("file_upload_start", {
            page: "landing",
            file_count: 1,
            file_size: files[0].size,
          });

          const response = await testUploadPaper(formData, config);
          const references = [response.data.paper_info];
          setTestReferencesList(references);
          setUploadStatus(false);
          setUploadSuccessModalIsOpen(true);

          trackEvent("file_upload_success", {
            page: "landing",
            file_count: 1,
          });

          if (onUploadSuccess) onUploadSuccess();
          setTimeout(() => {
            setIsOpen(false);
          }, 1000);
        } catch (error) {
          trackEvent("file_upload_error", {
            page: "landing",
            error: error.message,
          });
          setErrorAlertModalIsOpen(true);
          setUploadStatus(false);
        }
        return;
      }

      // For non-landing page uploads
      trackEvent("file_upload_start", {
        page: "main",
        file_count: files.length,
        total_size: Array.from(files).reduce((acc, file) => acc + file.size, 0),
      });

      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("pdf", files[i]);
        formData.append("assignment", assignmentId);

        try {
          const response_paper = await uploadPaper(formData, config);

          if (
            !response_paper ||
            !response_paper.data ||
            !response_paper.data.paper_id
          ) {
            throw new Error("Paper ID not found in response");
          }

          // Generate paper info after successful upload
          await uploadPaperInfo(response_paper.data.paper_id);
          trackEvent("file_upload_success", {
            page: "main",
            file_index: i + 1,
            file_count: files.length,
          });
        } catch (error) {
          trackEvent("file_upload_error", {
            page: "main",
            file_index: i + 1,
            error: error.message,
          });
          setErrorAlertModalIsOpen(true);
          setUploadStatus(false);
          return;
        }
      }

      setUploadStatus(false);
      setUploadSuccessModalIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
        window.location.reload();
      }, 1000);
    } catch (error) {
      setErrorAlertModalIsOpen(true);
      setUploadStatus(false);
    }
  };

  const handleErrorAlertCancel = () => {
    setErrorAlertModalIsOpen(false);
    setIsOpen(false);
    window.location.reload();
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
    trackEvent("file_drop", {
      page: isLandingPage ? "landing" : "main",
    });
    handleFileChange(e.dataTransfer.files);
  };

  const handleInputChange = (e) => {
    trackEvent("file_select", {
      page: isLandingPage ? "landing" : "main",
      method: "click",
    });
    handleFileChange(e.target.files);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-hidden">
      <div
        className={`w-[90%] sm:w-[600px] h-auto px-4 sm:px-8 py-6 sm:py-8 bg-white rounded-2xl shadow flex-col justify-start items-start gap-5 sm:gap-7 inline-flex ${
          !isVisible ? "hidden" : ""
        }`}
      >
        <div className="h-auto self-stretch flex-col justify-center items-start gap-2 inline-flex">
          <div className="self-stretch justify-between items-start inline-flex">
            <div className="text-neutral-900 text-xl sm:text-2xl font-semibold font-['Pretendard'] leading-normal sm:leading-[33.60px]">
              파일 업로드
            </div>
            <X
              className="w-[18px] sm:w-[20px] h-[18px] sm:h-[20px] relative cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
        <input
          type="file"
          multiple={!isLandingPage}
          accept=".pdf"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleInputChange}
        />
        <div
          className={`self-stretch px-2 sm:px-2.5 py-4 sm:py-6 bg-neutral-50 rounded border border-2 border-dashed border-neutral-300 flex-col justify-center items-center gap-1 flex cursor-pointer ${
            isDragOver ? "bg-neutral-400" : ""
          }`}
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FileUp className="w-5 sm:w-6 h-5 sm:h-6 relative text-neutral-400" />
          <div className="text-center text-neutral-400 text-sm sm:text-base font-medium font-['Pretendard'] leading-tight sm:pt-4 pt-2">
            PDF 파일을 업로드해주세요
            {!isLandingPage && (
              <div className="text-neutral-400">(여러 파일 선택 가능)</div>
            )}
          </div>
        </div>
      </div>
      {uploadStatus && <Loading />}
      {errorAlertModalIsOpen && (
        <SuccessModal
          text={"파일 업로드 성공!"}
          setModalOpen={setUploadSuccessModalIsOpen}
        />
      )}
      {uploadSuccessModalIsOpen && (
        <SuccessModal
          text={"파일 업로드 성공!"}
          setModalOpen={setUploadSuccessModalIsOpen}
        />
      )}
    </div>
  );
};

export default FileUploadModal;
