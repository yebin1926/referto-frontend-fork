import { useState, useEffect, useRef } from "react";
import { Pencil, Copy, Trash2, Eye, Check } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deletePaper, updatePaperInfo } from "../../apis/api";
import DeleteConfirmModal from "../Modals/DeleteConfirmModal";
import AlertModal from "../Modals/AlertModal";
import SuccessModal from "../Modals/SuccessModal";
import alertTriangle from "../../assets/images/alert-triangle.svg";
import checkCircle2 from "../../assets/images/check-circle-2.svg";

const ReferenceItem = ({
  reference,
  selectedStyleName,
  index,
  referencesList,
  setReferencesList,
  darkMode,
}) => {
  const referenceId = reference["paperInfo_id"];
  const referenceName = reference[selectedStyleName];
  const paperId = reference["paper"];
  const { assignmentId } = useParams();
  const [content, setContent] = useState(referenceName);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editAlertModalIsOpen, setEditAlertModalIsOpen] = useState(false);
  const [copySuccessModalIsOpen, setCopySuccessModalIsOpen] = useState(false);
  const inputRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setContent(referenceName);
  }, [referenceName]);

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.style.height = "10px";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [content, isEdit]);

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
    await updatePaperInfo(referenceId, newContent);
    setIsEdit(!isEdit);
    const updatedReferencesList = [...referencesList];
    updatedReferencesList[index - 1][selectedStyleName] = content;
    setReferencesList(updatedReferencesList);
  };

  const handleEditAlertCancel = () => {
    setEditAlertModalIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleReferenceDelete = async () => {
    await deletePaper(paperId);
    window.location.reload();
  };

  const handleReferenceDeleteCancel = () => {
    setDeleteModalIsOpen(false);
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

  const navigate = useNavigate();

  const handleClickView = () => {
    navigate(`/${assignmentId}/${referenceId}`, {
      state: {
        index,
        reference,
        selectedStyleName,
        referenceId,
        referenceName,
        assignmentId,
        paperId,
        referencesList,
        darkMode,
      },
    });
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
  });

  return (
    <div className="w-full h-100% py-2.5 border-b border-neutral-400 justify-start items-center gap-2.5 inline-flex">
      <div className="w-[53px] self-stretch px-2.5 flex-col justify-center items-center gap-2.5 inline-flex">
        <div
          className={`text-neutral-500 text-lg font-medium font-['Pretendard'] leading-[27px] ${
            darkMode ? "text-white" : "text-neutral-900" // Conditional text color
          } `}
        >
          {index}
        </div>
      </div>
      <div className="grow shrink basis-0 self-stretch justify-start items-center gap-[15px] flex overflow-hidden">
        <div
          className={`h-100% grow shrink basis-0 text-md font-medium font-['Pretendard'] leading-[27px] overflow-hidden ${
            darkMode ? "text-white" : "text-neutral-700" // Conditional text color
          }`}
        >
          {isEdit ? (
            <textarea
              value={content}
              onChange={handleChange}
              className="border-2 border-neutral-300 rounded-md w-full h-100% px-1 py-1 focus:outline-none focus:border-neutral-500 resize-none text-neutral-700"
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
      <div
        onClick={handleClickView}
        className={`px-3 py-2 bg-neutral-900 rounded-md justify-center items-center gap-2.5 flex cursor-pointer`}
      >
        <div className="justify-center items-center gap-2.5 flex">
          <Eye className="text-white w-[18px] h-[18px] relative" />
        </div>
        <div className="text-right text-white text-lg font-medium font-['Pretendard'] leading-normal">
          보기
        </div>
      </div>
      <Link
        to={`/${assignmentId}`}
        className="w-11 self-stretch px-2.5 justify-center items-center gap-2.5 flex cursor-pointer"
      >
        <Trash2
          className="text-red-400 w-6 h-6 relative"
          onClick={() => setDeleteModalIsOpen(true)}
        />
      </Link>
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

export default ReferenceItem;
