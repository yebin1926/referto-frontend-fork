import { useState } from "react";
import { Pencil, Copy, Trash2, Eye, Check } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ReferenceItem = ({ referenceId, referenceName, isVisible, handleReferenceDelete, handleReferenceUpdate }) => {
  const { assignmentId } = useParams();
  const [content, setContent] = useState(referenceName);
  const [isEdit, setIsEdit] = useState(false);
  const handleEditContent = () => {
    setIsEdit(!isEdit);
  };
  const handleChange = (event) => {
    setContent(event.target.value);
  };
  const handleContentUpdate = () => {
    handleReferenceUpdate(referenceId, content);
    setIsEdit(!isEdit);
  }
  const handleCopy = () => {
    const $textarea = document.createElement('textarea');
    document.body.appendChild($textarea);
    $textarea.value = content;
    $textarea.select();
    document.execCommand('copy');
    document.body.removeChild($textarea);    
    alert('Your reference copied to clipboard!');
  };
  return (
    <div className="w-full h-[60px] py-2.5 border-b border-neutral-400 justify-start items-center gap-2.5 inline-flex">
      <div className="w-[53px] self-stretch px-2.5 flex-col justify-center items-center gap-2.5 inline-flex">
        <div className="text-neutral-500 text-lg font-medium font-['Pretendard'] leading-[27px]">
          {referenceId}
        </div>
      </div>
      <div className="grow shrink basis-0 self-stretch justify-start items-center gap-[15px] flex">
        <div className="grow shrink basis-0 text-neutral-700 text-lg font-medium font-['Pretendard'] leading-[27px]">
          {isEdit ? <input value={content} onChange={handleChange}  style={{ border: '1px solid black' }} /> : content}
        </div>
        <div className="w-[83px] self-stretch px-2.5 justify-start items-center gap-[15px] flex cursor-pointer">
          {isEdit ? <Check className="text-neutral-500 w-6 h-6 relative" onClick={handleContentUpdate}/> : <Pencil className="text-neutral-500 w-6 h-6 relative" onClick={handleEditContent}/>}
          <Copy className="text-neutral-500 w-6 h-6 relative" onClick={handleCopy}/>
        </div>
      </div>
      <Link
        to={`/${assignmentId}/${referenceId}`}
        className={`px-4 py-2 bg-neutral-900 rounded-md justify-center items-center gap-2.5 flex ${
          isVisible ? "block" : "hidden"
        }`}
      >
        <div className="justify-center items-center gap-2.5 flex">
          <Eye className="text-white w-[18px] h-[18px] relative" />
        </div>
        <div className="text-right text-white text-lg font-light font-['Pretendard'] leading-normal">
          View
        </div>
      </Link>
      <div className="w-11 self-stretch px-2.5 justify-center items-center gap-2.5 flex cursor-pointer">
        <Trash2 className="text-red-400 w-6 h-6 relative" onClick={() => handleReferenceDelete(referenceId)}/>
      </div>
    </div>
  );
};

export default ReferenceItem;
