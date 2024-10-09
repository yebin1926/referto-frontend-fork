import { useState, useEffect, useRef } from "react";
import {
  Pencil,
  Copy,
  Trash2,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { updatePaperInfo, deletePaper } from "../../apis/api";
import DeleteConfirmModal from "../Modals/DeleteConfirmModal";
import AlertModal from "../Modals/AlertModal";
import SuccessModal from "../Modals/SuccessModal";
import alertTriangle from "../../assets/images/alert-triangle.svg";

const ReferenceItemDetail = ({
  index,
  referenceId,
  referenceName,
  content,
  setContent,
  selectedStyleName,
  paperId,
  handlePrevPage,
  handleNextPage,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editAlertModalIsOpen, setEditAlertModalIsOpen] = useState(false);
  const [copySuccessModalIsOpen, setCopySuccessModalIsOpen] = useState(false);
  const { assignmentId } = useParams();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Initialize content when referenceName changes
  useEffect(() => {
    setContent(referenceName);
  }, [referenceName, setContent]);

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.style.height = "10px";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [isEdit]);

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEdit]);

  const handleEditContent = () => {
    setIsEdit(!isEdit);
  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleContentUpdate = async () => {
    if (content.trim().length < 1) {
      setEditAlertModalIsOpen(true);
      return;
    }
    const newContent = {
      reference_type: selectedStyleName,
      new_reference: content,
    };

    try {
      await updatePaperInfo(referenceId, newContent);
      setIsEdit(false);
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  const handleEditAlertCancel = () => {
    setEditAlertModalIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleReferenceDelete = async () => {
    try {
      await deletePaper(paperId);
      navigate(`/${assignmentId}`);
    } catch (error) {
      console.error("Error deleting paper:", error);
    }
  };

  const handleReferenceDeleteCancel = () => {
    setDeleteModalIsOpen(false);
  };

  const handleCopy = () => {
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = content;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setCopySuccessModalIsOpen(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleContentUpdate();
    }
  };

  useEffect(() => {
    const handleClickOutsideInput = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        handleContentUpdate();
      }
    };

    document.addEventListener("mousedown", handleClickOutsideInput);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideInput);
    };
  }, [handleContentUpdate]);

  return (
    <div
      className={`w-full h-100% py-2.5 border-b border-neutral-400 flex items-center gap-2.5`}
    >
      <div className="p-4 cursor-pointer">
        <ChevronLeft
          className="text-neutral-700 w-6 h-6"
          onClick={handlePrevPage}
        />
      </div>
      <div className="w-[53px] px-2.5 flex flex-col items-center gap-2.5 ">
        <div className=" text-lg font-medium font-['Pretendard'] leading-[27px]">
          {index}
        </div>
      </div>
      <div className="flex-grow flex items-center gap-[15px] overflow-hidden">
        <div className="flex-grow text-md font-medium font-['Pretendard'] leading-[27px] overflow-hidden">
          {isEdit ? (
            <textarea
              value={content}
              onChange={handleChange}
              className="border-2 border-neutral-300 rounded-md w-full px-1 py-1 focus:outline-none focus:border-neutral-500 resize-none"
              ref={inputRef}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <div className="break-words whitespace-pre-wrap">{content}</div>
          )}
        </div>
        <div className="w-[83px] px-2.5 flex items-center gap-[15px] cursor-pointer">
          {isEdit ? (
            <Check
              className="text-neutral-500 w-6 h-6"
              onClick={handleContentUpdate}
            />
          ) : (
            <Pencil
              className="text-neutral-500 w-6 h-6"
              onClick={handleEditContent}
            />
          )}
          <Copy className="text-neutral-500 w-6 h-6" onClick={handleCopy} />
        </div>
      </div>
      <div className="w-11 px-2.5 flex items-center gap-2.5 cursor-pointer">
        <Trash2
          className="text-red-400 w-6 h-6"
          onClick={() => setDeleteModalIsOpen(true)}
        />
      </div>
      <div className="p-6 cursor-pointer">
        <ChevronRight
          className="text-neutral-700 h-6 w-6"
          onClick={handleNextPage}
        />
      </div>
      {deleteModalIsOpen && (
        <DeleteConfirmModal
          deleteParams={paperId}
          handleDelete={handleReferenceDelete}
          handleDeleteCancel={handleReferenceDeleteCancel}
        />
      )}
      {editAlertModalIsOpen && (
        <AlertModal
          icon={alertTriangle}
          color={"#F59E0B"}
          handleAlertCancel={handleEditAlertCancel}
          text={"최소 1자 이상이어야 합니다."}
        />
      )}
      {copySuccessModalIsOpen && (
        <SuccessModal
          text={"클립보드에 복사되었습니다."}
          setModalOpen={setCopySuccessModalIsOpen}
        />
      )}
    </div>
  );
};

export default ReferenceItemDetail;
