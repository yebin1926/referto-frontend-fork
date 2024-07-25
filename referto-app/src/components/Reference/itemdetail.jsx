import { useState, useEffect, useRef } from "react";
import { Pencil, Copy, Trash2, Eye, Check } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { updatePaperInfo, deletePaper, getPaperInfo } from "../../apis/api";
import DeleteConfirmModal from "../Modals/DeleteConfirmModal";

const ReferenceItemDetail = ({
  index,
  referenceId,
  content,
  setContent,
  selectedStyleName,
  //assignmentId,
  paperId,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const { assignmentId } = useParams();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
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
      alert("Reference Content must be at least 1 character long!");
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0); // Set a timeout to ensure it runs after the alert is dismissed
      return;
    }
    const newContent = {
      reference_type: selectedStyleName,
      new_reference: content,
    };
    const response = await updatePaperInfo(referenceId, newContent);
    setIsEdit(!isEdit);
  };

  const handleReferenceDelete = async (paperId) => {
    const response = await deletePaper(paperId);
    window.location.href = (`/${assignmentId}`)
  };

  const handleReferenceDeleteCancel = () => {
    setDeleteModalIsOpen(false);
    return; 
  }
  const handleCopy = () => {
    const $textarea = document.createElement("textarea");
    document.body.appendChild($textarea);
    $textarea.value = content;
    $textarea.select();
    document.execCommand("copy");
    document.body.removeChild($textarea);
    alert("Your reference copied to clipboard!");
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleContentUpdate();
    }
  };

  return (
    <div className="w-full h-100% py-2.5 border-b border-neutral-400 justify-start items-center gap-2.5 inline-flex">
      <div className="w-[53px] self-stretch px-2.5 flex-col justify-center items-center gap-2.5 inline-flex">
        <div className="text-neutral-500 text-lg font-medium font-['Pretendard'] leading-[27px]">
          {index}
        </div>
      </div>
      <div className="grow shrink basis-0 self-stretch justify-start items-center gap-[15px] flex">
        <div className="grow shrink basis-0 text-neutral-700 text-sm font-medium font-['Pretendard'] leading-[27px]">
          {isEdit ? (
            <textarea
              value={content}
              onChange={handleChange}
              className="border border-gray-300 rounded-m w-full"
              ref={inputRef}
              onKeyDown={handleKeyDown}
            />
          ) : (
            content
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
      {deleteModalIsOpen && <DeleteConfirmModal 
      deleteParams={paperId}
      handleDelete={handleReferenceDelete}
      handleDeleteCancel={handleReferenceDeleteCancel}
        />}
    </div>
  );
};

export default ReferenceItemDetail;
