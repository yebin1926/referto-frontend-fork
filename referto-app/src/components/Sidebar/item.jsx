import dotDark from "../../assets/images/dot-dark.svg";
import dotLight from "../../assets/images/dot-light.svg";
import { Link } from "react-router-dom";
import { Ellipsis } from 'lucide-react';
import { useState, useRef, useEffect } from "react";
import AssignmentModal from "../Modals/AssignmentModal";

const SidebarItem = ({
  assignmentId,
  assignmentName,
  selectedAssignmentId,
  setSelectedAssignmentId,
  handleAssignmentDelete,
  handleAssignmentUpdate
}) => {
  const handleSelect = () => {
    setSelectedAssignmentId(assignmentId);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [name, setName] = useState(assignmentName);
  const [isRename, setIsRename] = useState(false);
  const buttonRef = useRef(null);
  const renameRef = useRef(null);
  const setIsRenameTrue = () => {
    setIsRename(true);
  };
  const handleAssignment = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setModalPosition({top: rect.bottom, left: rect.left});
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };
  const handleCloseClick = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleNameUpdate = () => {
    if (name.length < 1) {
      alert("Assignment name must be at least 1 character long!")
    } else {
      handleAssignmentUpdate(assignmentId, name);
      setIsRename(!isRename);
    }
  };
  useEffect(() => {
    const handleClickOutsideRename = (event) => {
      if (renameRef.current && !renameRef.current.contains(event.target)) {
        handleNameUpdate();
      }
    };
    document.addEventListener('mousedown', handleClickOutsideRename);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideRename);
    }
  },);
  return (
    <div
      id="item"
      className="rounded flex items-center justify-start gap-1.5 px-3.5 py-2.5 relative self-stretch w-full flex-[0_0_auto] overflow-hidden"
    >
      {selectedAssignmentId === assignmentId ? (
        <div className="bg-neutral-300 rounded-[20px] flex items-center justify-start gap-1.5 px-3.5 py-2.5 relative self-stretch w-full flex-[0_0_auto] overflow-hidden">
          <img alt="dot" src={dotDark} className="h-2 w-2 relative" />
          <div className="font-bold text-neutral-700 leading-6 text-lg tracking-0">
            {isRename ? <input className="border text-neutral-700 w-20 h-10 p-1" value={name} onChange={handleNameChange} ref={renameRef} minLength="1" required/> : assignmentName}
          </div>
          <div className="flex-grow"></div>
          <Ellipsis className=" text-neutral-700 selection:w-[18px] h-[18px] relative cursor-pointer" onClick={handleAssignment} ref={buttonRef}/>
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
      {isOpen && <AssignmentModal position={modalPosition} assignmentId={assignmentId} onClose={handleCloseClick} handleAssignmentDelete={handleAssignmentDelete} setIsRenameTrue={setIsRenameTrue}/>}
    </div>
  );
};

export default SidebarItem;
