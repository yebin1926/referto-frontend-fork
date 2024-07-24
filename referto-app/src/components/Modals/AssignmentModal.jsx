import { useRef, useEffect } from "react";
import { Pencil, Trash2, Check } from 'lucide-react';

const AssignmentModal = ({ position, handleEditAssignment, handleDeleteAssignment, isEdit, setIsEdit, setIsOpen }) => {
  const modalRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && (isEdit === false)) {
        setIsOpen(false)
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEdit]);

  const MenuItem = ({ text, icon, onClick }) => {
    return (
      <div className="px-1.5 py-1.5 bg-white justify-center items-center gap-2.5 flex cursor-pointer pointer-events-auto" onClick={onClick}>
        <div className="flex flex-column w-full px-1.5 py-1.5 hover:bg-neutral-100 rounded-md ">
          <div className="w-100% justify-center items-center gap-2.5 flex text-neutral-700">
            {icon}
          </div>
          <div className="px-2.5 justify-center items-center gap-2.5 flex flex-1">
            <div className="text-xs font-['Pretendard'] font-medium text-center text-neutral-700">
              {text}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-start justify-end z-50 pointer-events-none" ref={modalRef} style={{ top: 0, left: 0 }}>
      <div className="absolute modal-overlay rounded-lg overflow-hidden shadow-lg" style={{ top: position.top, left: position.left }}>
      {isEdit? <MenuItem
        text={"save"}
        icon={<Check className="w-4 h-4"/>}
        onClick={handleEditAssignment}
      /> : <MenuItem
      text={"edit"}
      icon={<Pencil className="w-4 h-4"/>}
      onClick={() => setIsEdit(true)}
    />}
      <MenuItem
        text="delete"
        icon={<Trash2 className="w-4 h-4"/>}
        onClick={handleDeleteAssignment}
      />
      </div>
    </div>
  );
}

export default AssignmentModal;
