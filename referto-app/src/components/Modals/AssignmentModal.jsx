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
      <div className="px-8 py-2 bg-white hover:bg-neutral-300 justify-center items-center gap-2.5 flex cursor-pointer pointer-events-auto" onClick={onClick}>
        <div className="justify-center items-center gap-2.5 flex">
          {icon}
        </div>
        <div className="px-2.5 justify-center items-center gap-2.5 flex">
          <div className="text-black text-xs font-['Pretendard'] font-inter text-center">
            {text}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-start justify-end z-50 pointer-events-none" ref={modalRef} style={{ top: 0, left: 0 }}>
      <div className="absolute modal-overlay rounded-lg overflow-hidden shadow-lg" style={{ top: position.top, left: position.left }}>
      <MenuItem
      text={"edit"}
      icon={<Pencil className="w-4 h-4"/>}
      onClick={() => {setIsEdit(true); setIsOpen(false);}}
    />
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
