import { useRef, useEffect } from "react";
import { Pencil, Trash2, Check } from 'lucide-react';

const AssignmentModal = ({ handleEditAssignment, handleDeleteAssignment, isEdit, setIsEdit }) => {
  // const modalRef = useRef(null);
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       onClose();
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [onClose]);

  const MenuItem = ({ text, icon, onClick }) => {
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
      <div className="absolute modal-overlay rounded-lg overflow-hidden shadow-lg" ref={useRef(null)} style={{ top: 0, left: 0 }}>
      <MenuItem
        text={isEdit ? "save" : "edit"}
        icon={isEdit ? <Check className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
        onClick={isEdit ? handleEditAssignment : setIsEdit(true)}
      />
      <MenuItem
        text="delete"
        icon={<Trash2 className="w-4 h-4" />}
        onClick={handleDeleteAssignment}
      />
      </div>
    </div>
  );
}

export default AssignmentModal;
