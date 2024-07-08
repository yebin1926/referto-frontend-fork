import { Pencil, Copy, Trash2, Eye } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ReferenceItem = ({ referenceId, referenceName, isVisible }) => {
  const { assignmentId } = useParams(); //path 에 있는 parameter 숫자 가져오는 것

  return (
    <div className="w-full h-[60px] py-2.5 border-b border-neutral-400 justify-start items-center gap-2.5 inline-flex">
      <div className="w-[53px] self-stretch px-2.5 flex-col justify-center items-center gap-2.5 inline-flex">
        <div className="text-neutral-500 text-lg font-medium font-['Pretendard'] leading-[27px]">
          {referenceId}
        </div>
      </div>
      <div className="grow shrink basis-0 self-stretch justify-start items-center gap-[15px] flex">
        <div className="grow shrink basis-0 text-neutral-700 text-lg font-medium font-['Pretendard'] leading-[27px]">
          {referenceName}
        </div>
        <div className="w-[83px] self-stretch px-2.5 justify-start items-center gap-[15px] flex">
          <Pencil className="text-neutral-500 w-6 h-6 relative" />
          <Copy className="text-neutral-500 w-6 h-6 relative" />
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
      <div className="w-11 self-stretch px-2.5 justify-center items-center gap-2.5 flex">
        <Trash2 className="text-red-400 w-6 h-6 relative" />
      </div>
    </div>
  );
};

export default ReferenceItem;
