import { useState, useEffect } from "react";
import { Pencil, Copy, Trash2, Eye, Check } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ReferenceItem = ({
  reference,
  isVisible,
  handleReferenceDelete,
  handleReferenceUpdate,
  findIndexofReference,
  selectedStyleName,
}) => {
  console.log('reference item에서 보는 참고문헌 :', JSON.stringify(reference, null, 2));
  const referenceId = reference.paperInfo_id;
  const referenceName = reference[selectedStyleName];
  console.log(`reference item에서 보는 ${selectedStyleName} 스타일에 따른 참고문헌 각주 : ${referenceName}`);  

  const { assignmentId } = useParams(); //path 에 있는 parameter 숫자 가져오는 것
  const [content, setContent] = useState(referenceName);
  // 컴포넌트가 다시 렌더링될 때마다 상태를 초기화하는 useEffect 
  useEffect(() => { setContent(referenceName); });
  // setContent(referenceName);
  console.log('content', content);
  const [isEdit, setIsEdit] = useState(false);

  const handleEditContent = () => {
    setIsEdit(!isEdit);
  };
  const handleChange = (event) => {
    setContent(event.target.value);
  };
  const handleContentUpdate = () => {
    //handleReferenceUpdate(referenceId, content);
    setIsEdit(!isEdit);
  };
  const handleCopy = () => {
    const $textarea = document.createElement("textarea");
    document.body.appendChild($textarea);
    $textarea.value = content;
    $textarea.select();
    document.execCommand("copy");
    document.body.removeChild($textarea);
    alert("Your reference copied to clipboard!");
  };
  return (
    <div className="w-full h-[60px] py-2.5 border-b border-neutral-400 justify-start items-center gap-2.5 inline-flex">
      <div className="w-[53px] self-stretch px-2.5 flex-col justify-center items-center gap-2.5 inline-flex">
        <div className="text-neutral-500 text-lg font-medium font-['Pretendard'] leading-[27px]">
          {parseInt(findIndexofReference(referenceId)) + 1}
        </div>
      </div>
      <div className="grow shrink basis-0 self-stretch justify-start items-center gap-[15px] flex">
        <div className="grow shrink basis-0 text-neutral-700 text-sm font-medium font-['Pretendard'] leading-[27px]">
          {isEdit ? (
            <input
              value={content}
              onChange={handleChange}
              className="border border-gray-300 rounded-md"
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
      <Link
        to="/1"
        className="w-11 self-stretch px-2.5 justify-center items-center gap-2.5 flex cursor-pointer"
      >
        <Trash2
          className="text-red-400 w-6 h-6 relative"
          onClick={(event) => handleReferenceDelete(referenceId, event)}
        />
      </Link>
    </div>
  );
};

export default ReferenceItem;
