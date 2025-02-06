import { useState, useEffect, useRef } from "react";
import { Pencil, Copy, Trash2, Eye, Check, MoreVertical } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deletePaper, updatePaperInfo } from "../../apis/api";
import DeleteConfirmModal from "../Modals/DeleteConfirmModal";
import AlertModal from "../Modals/AlertModal";
import SuccessModal from "../Modals/SuccessModal";
import alertTriangle from "../../assets/images/alert-triangle.svg";
import checkCircle2 from "../../assets/images/check-circle-2.svg";
import { trackEvent } from '../../utils/analytics';

const ReferenceItem = ({
  reference,
  selectedStyleName,
  index,
  referencesList,
  setReferencesList,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
    trackEvent('update_reference', { style: selectedStyleName });
    setIsEdit(!isEdit);
    const updatedReferencesList = [...referencesList];
    updatedReferencesList[index-1][selectedStyleName] = content;
    setReferencesList(updatedReferencesList);
  };

  const handleEditAlertCancel = () => {
    setEditAlertModalIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleReferenceDelete = async () => {
    trackEvent('delete_reference', { index });
    await deletePaper(paperId);
    window.location.reload();
  };

  const handleReferenceDeleteCancel = () => {
    setDeleteModalIsOpen(false);
  };

  const handleCopy = () => {
    trackEvent('copy_reference', { style: selectedStyleName });
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
      },
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
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
    document.addEventListener('mousedown', handleClickOutsideInput);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideInput);
    }
  },);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-100% py-2 sm:py-2.5 border-b border-neutral-400 justify-start items-center gap-1.5 sm:gap-2.5 inline-flex">
      <div className="w-[40px] sm:w-[53px] self-stretch px-1.5 sm:px-2.5 flex-col justify-center items-center gap-2.5 inline-flex">
        <div className="text-neutral-500 text-md sm:text-lg font-medium font-['Pretendard'] leading-[27px]">
          {index}
        </div>
      </div>
      <div className="grow shrink basis-0 self-stretch justify-start items-center gap-2 sm:gap-[15px] flex overflow-hidden">
        <div 
          className={`h-100% grow shrink basis-0 text-neutral-700 text-md sm:text-lg font-medium font-['Pretendard'] leading-[24px] sm:leading-[27px] overflow-hidden ${!isEdit && 'sm:cursor-default cursor-pointer'}`}
          onClick={() => {
            if (!isEdit) {
              handleClickView();
            }
          }}
        >
          {isEdit ? (
            <textarea
              value={content}
              onChange={handleChange}
              className="border-2 border-neutral-300 rounded-md w-full h-100% px-1 py-1 focus:outline-none focus:border-neutral-500 resize-none text-md sm:text-lg"
              ref={inputRef}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <div className="break-words whitespace-pre-wrap cursor-pointer">{content}</div>
          )}
        </div>
        <div className="hidden sm:flex w-[83px] self-stretch px-2.5 justify-start items-center gap-[15px] cursor-pointer">
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
        className={`hidden sm:flex px-2 sm:px-2.5 py-1 sm:py-1.5 bg-neutral-900 rounded-md justify-center items-center gap-1.5 sm:gap-2 cursor-pointer`}
      >
        <div className="justify-center items-center gap-1.5 sm:gap-2 flex">
          <Eye className="text-white w-3.5 sm:w-4 h-3.5 sm:h-4 relative" />
        </div>
        <div className="text-right text-white text-sm sm:text-base font-medium font-['Pretendard'] leading-normal">
          보기
        </div>
      </div>
      <Link
        to={`/${assignmentId}`}
        className="hidden sm:flex w-11 self-stretch px-2.5 justify-center items-center gap-2.5 cursor-pointer"
      >
        <Trash2
          className="text-red-400 w-6 h-6 relative"
          onClick={() => setDeleteModalIsOpen(true)}
        />
      </Link>
      <div className="relative sm:hidden">
        <MoreVertical
          className="text-neutral-500 w-5 h-5 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        {isMenuOpen && (
          <div 
            ref={menuRef}
            className="w-[100px] absolute right-0 top-6 bg-white rounded-lg shadow-lg p-1 z-10"
          >
            <div 
              className="px-5 py-2 hover:bg-neutral-100 hover:rounded-md flex items-center gap-2 cursor-pointer"
              onClick={() => {
                handleEditContent();
                setIsMenuOpen(false);
              }}
            >
              <Pencil className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-700 font-medium font-['Pretendard']">수정</span>
            </div>
            <div 
              className="px-5 py-2 hover:bg-neutral-100 hover:rounded-md flex items-center gap-2 cursor-pointer"
              onClick={() => {
                handleCopy();
                setIsMenuOpen(false);
              }}
            >
              <Copy className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-700 font-medium font-['Pretendard']">복사</span>
            </div>
            <div 
              className="px-5 py-2 hover:bg-neutral-100 hover:rounded-md flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setDeleteModalIsOpen(true);
                setIsMenuOpen(false);
              }}
            >
              <Trash2 className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400 font-medium font-['Pretendard']">삭제</span>
            </div>
          </div>
        )}
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

export default ReferenceItem;
