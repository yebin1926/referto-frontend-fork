import dotDark from "../../assets/images/dot-dark.svg";
import dotLight from "../../assets/images/dot-light.svg";
import { Link } from "react-router-dom";

const SidebarItem = ({
  assignmentId,
  assignmentName,
  selectedAssignmentId,
  setSelectedAssignmentId,
}) => {
  const handleSelect = () => {
    setSelectedAssignmentId(assignmentId);
  };

  return (
    <div
      id="item"
      className="rounded flex items-center justify-start gap-1.5 px-3.5 py-2.5 relative self-stretch w-full flex-[0_0_auto] overflow-hidden"
    >
      {selectedAssignmentId === assignmentId ? (
        <div className="bg-neutral-300 rounded-[20px] flex items-center justify-start gap-1.5 px-3.5 py-2.5 relative self-stretch w-full flex-[0_0_auto] overflow-hidden">
          <img alt="dot" src={dotDark} className="h-2 w-2 relative" />
          <div className="font-bold text-neutral-700 leading-6 text-lg tracking-0">
            {assignmentName}
          </div>
        </div>
      ) : (
        <Link
          to={`/${assignmentId}`}
          onClick={handleSelect}
          className="rounded flex items-center justify-start gap-1.5 px-3.5 py-2.5 relative self-stretch w-full flex-[0_0_auto] overflow-hidden"
        >
          <img alt="dot" src={dotLight} className="h-2 w-2 relative" />
          <div className="font-bold text-neutral-400 leading-6 text-lg tracking-0">
            {assignmentName}
          </div>
        </Link>
      )}
    </div>
  );
};

export default SidebarItem;
