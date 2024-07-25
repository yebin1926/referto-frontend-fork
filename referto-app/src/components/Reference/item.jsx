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
  // isVisible,
  // handleReferenceDelete,
  // handleReferenceUpdate,
  // findIndexofReference,
  selectedStyleName,
  index,
  referencesList, 
  setReferencesList,
}) => {
  // console.log('reference item에서 보는 참고문헌 :', JSON.stringify(reference, null, 2));
  const referenceId = reference["paperInfo_id"];
  const referenceName = reference[selectedStyleName];
  // console.log(`reference item에서 보는 ${selectedStyleName} 스타일에 따른 참고문헌 각주 : ${referenceName}`);
  const paperId = reference["paper"];
  const { assignmentId } = useParams(); //path 에 있는 parameter 숫자 가져오는 것
  const [content, setContent] = useState(referenceName);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editAlertModalIsOpen, setEditAlertModalIsOpen] = useState(false);
  const [copySuccessModalIsOpen, setCopySuccessModalIsOpen] = useState(false);
  const inputRef = useRef(null);

  // 컴포넌트가 다시 렌더링될 때마다 상태를 초기화하는 useEffect
  useEffect(() => {
    setContent(referenceName);
  }, []);
  // setContent(referenceName);
  // console.log('content', content);
  const [isEdit, setIsEdit] = useState(false);

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
    const response = await updatePaperInfo(referenceId, newContent);
    setIsEdit(!isEdit);
    const updatedReferencesList = referencesList;
    updatedReferencesList[index - 1][selectedStyleName] = content; 
    console.log(updatedReferencesList);
    setReferencesList(updatedReferencesList);
  };

  const handleEditAlertCancel = () => {
    setEditAlertModalIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    };
  };

  const handleReferenceDelete = async (paperId) => { 
    const response = await deletePaper(paperId);
    window.location.reload();
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

  const navigate = useNavigate();

  const handleClickView = () => {
    navigate(`/${assignmentId}/${referenceId}`, {
      state: {
        reference,
        selectedStyleName,
        index,
        referenceId,
        referenceName,
        assignmentId,
        paperId,
      },
    });
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
          {/* {parseInt(findIndexofReference(referenceId)) + 1} */}
          {index}
        </div>
      </div>
      <div className="grow shrink basis-0 self-stretch justify-start items-center gap-[15px] flex">
        <div className="grow shrink basis-0 text-neutral-700 text-md font-medium font-['Pretendard'] leading-[27px]">
          {isEdit ? (
            <textarea
              value={content}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full"
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
      <div
        onClick={handleClickView}
        className={`px-3 py-2 bg-neutral-900 rounded-md justify-center items-center gap-2.5 flex cursor-pointer`}
        //  ${
        //   isVisible ? "block" : "hidden"
        // }`}
      >
        <div className="justify-center items-center gap-2.5 flex">
          <Eye className="text-white w-[18px] h-[18px] relative" />
        </div>
        <div className="text-right text-white text-lg font-medium font-['Pretendard'] leading-normal">
          View
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
      {deleteModalIsOpen && <DeleteConfirmModal 
      deleteParams={paperId}
      handleDelete={handleReferenceDelete}
      handleDeleteCancel={handleReferenceDeleteCancel}
        />}
      {editAlertModalIsOpen && <AlertModal 
        icon={alertTriangle}
        color={"#F59E0B"}
        handleAlertCancel={handleEditAlertCancel}
        text={"최소 1자 이상이어야 합니다."}
     />}
     {copySuccessModalIsOpen && <SuccessModal 
        text={"클립보드에 복사되었습니다."}
        setModalOpen={setCopySuccessModalIsOpen}
     />}
    </div>
  );
};

export default ReferenceItem;
