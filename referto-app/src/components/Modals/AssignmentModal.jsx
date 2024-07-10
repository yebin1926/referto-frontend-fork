import { useRef, useEffect } from "react";
import { Pencil, Trash2 } from 'lucide-react';

const AssignmentModal = ({ position, assignmentId, onClose, handleAssignmentDelete, setIsRenameTrue }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  const MenuItem = ({ text, icon, assignmentId, onClick }) => {
    return (
      <div className="px-8 py-2 bg-white justify-center items-center gap-2.5 flex" onClick={onClick}>
        <div className="justify-center items-center gap-2.5 flex">
          {icon}
        </div>
        <div className="px-2.5 justify-center items-center gap-2.5 flex">
          <div className="text-black text-xs font-['Pretendard'] font-inter text-center">{text}</div>
        </div>
      </div>
    );
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-start justify-end z-50 cursor-pointer">
      <div className="absolute modal-overlay rounded-lg overflow-hidden shadow-lg" ref={modalRef} style={{ top: position.top, left: position.left }}>
        <div className="flex flex-col">
          <MenuItem text="rename" icon={<Pencil className="w-4 h-4"/>} assignmentId={assignmentId} onClick={setIsRenameTrue}/>
          <MenuItem text="delete" icon={<Trash2 className="w-4 h-4"/>} assignmentId={assignmentId} onClick={() => handleAssignmentDelete(assignmentId)}/>
        </div>
      </div>
    </div>
  );
}

export default AssignmentModal;
