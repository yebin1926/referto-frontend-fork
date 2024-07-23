import { useState, useEffect } from "react";
import { Pencil, Copy, Trash2, Eye, Check } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { updatePaperInfo, deletePaper, getPaperInfo } from "../../apis/api";

const ReferenceItemDetail = ({
  index,
  reference,
  referenceId,
  referenceName,
  selectedStyleName,
  //assignmentId,
  paperId,
}) => {
  const [content, setContent] = useState(referenceName);
  const [isEdit, setIsEdit] = useState(false);
  const { assignmentId } = useParams();

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
    const newContent = {
      reference_type: selectedStyleName,
      new_reference: content,
    };
    const response = await updatePaperInfo(referenceId, newContent);
    setIsEdit(!isEdit);
  };

  const handleReferenceDelete = async (paperId) => {
    const response = await deletePaper(paperId);
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
        to={`/${assignmentId}`}
        className="w-11 self-stretch px-2.5 justify-center items-center gap-2.5 flex cursor-pointer"
      >
        <Trash2
          className="text-red-400 w-6 h-6 relative"
          onClick={(event) => handleReferenceDelete(paperId)}
        />
      </Link>
    </div>
  );
};

export default ReferenceItemDetail;
