import { useState, useEffect, useRef } from "react";
import {
  Pencil,
  Copy,
  Trash2,
  Eye,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { updatePaperInfo, deletePaper, getPaperInfo } from "../../apis/api";
import DeleteConfirmModal from "../Modals/DeleteConfirmModal";
import AlertModal from "../Modals/AlertModal";
import SuccessModal from "../Modals/SuccessModal";
import alertTriangle from "../../assets/images/alert-triangle.svg";

const ReferenceItemDetail = ({
  index,
  referenceId,
  content,
  setContent,
  selectedStyleName,
  //assignmentId,
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

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.style.height = "10px";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [isEdit]);

  useEffect(() => {
    const fetchPaperInfo = async () => {
      const response = await getPaperInfo(assignmentId, paperId);
      const newContent = response[selectedStyleName];
      setContent(newContent);
    };
    fetchPaperInfo();
  }, []);

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
    const response = await updatePaperInfo(referenceId, newContent);
    window.location.reload();
    setIsEdit(!isEdit);
  };

  const handleEditAlertCancel = () => {
    setEditAlertModalIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleReferenceDelete = async (paperId) => {
    const response = await deletePaper(paperId);
    window.location.href = `/${assignmentId}`;
  };

  const handleReferenceDeleteCancel = () => {
    setDeleteModalIsOpen(false);
    return;
  };
  const handleCopy = () => {
    const $textarea = document.createElement("textarea");
    document.body.appendChild($textarea);
    $textarea.value = content;
    $textarea.select();
    document.execCommand("copy");
    document.body.removeChild($textarea);
    setCopySuccessModalIsOpen(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleContentUpdate();
    }
  };

  return (
    <div className="w-full h-100% py-2.5 border-b border-neutral-400 justify-start items-center gap-2.5 inline-flex">
      <div className="p-4 cursor-pointer">
        <ChevronLeft className="text-neutral-700 w-6 h-6" onClick={handlePrevPage} />
      </div>
      <div className="w-[53px] self-stretch px-2.5 flex-col justify-center items-center gap-2.5 inline-flex">
        <div className="text-neutral-500 text-lg font-medium font-['Pretendard'] leading-[27px]">
          {index}
        </div>
      </div>
      <div className="grow shrink basis-0 self-stretch justify-start items-center gap-[15px] flex overflow-hidden">
        <div className="grow shrink basis-0 text-neutral-700 text-md font-medium font-['Pretendard'] leading-[27px] overflow-hidden">
          {isEdit ? (
            <textarea
              value={content}
              onChange={handleChange}
              className="border-2 border-neutral-300 rounded-md w-full h-full px-1 py-1 focus:outline-none focus:border-neutral-500 resize-none"
              ref={inputRef}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <div className="break-words whitespace-pre-wrap">{content}</div>
          )}
        </div>
        <div className="w-[83px] self-stretch px-2.5 justify-start items-center gap-[15px] flex cursor-pointer">
          {isEdit ? (
            <Check
              className="text-neutral-500 w-6 h-6 relative"
              onClick={handleContentUpdate}
            />
          ) : (
            <Pencil
              className="text-neutral-500 w-6 h-6 relative"
              onClick={handleEditContent}
            />
          )}
          <Copy
            className="text-neutral-500 w-6 h-6 relative"
            onClick={handleCopy}
          />
        </div>
      </div>
      <div className="w-11 self-stretch px-2.5 justify-center items-center gap-2.5 flex cursor-pointer">
        <Trash2
          className="text-red-400 w-6 h-6 relative"
          onClick={() => setDeleteModalIsOpen(true)}
        />
      </div>
      <div className="p-6 cursor-pointer">
        <ChevronRight className="text-neutral-700 h-6 w-6" onClick={handleNextPage} />
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
