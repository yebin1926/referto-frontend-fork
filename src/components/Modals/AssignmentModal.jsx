import { useRef, useEffect } from "react";
import { Pencil, Trash2, Check } from 'lucide-react';

const AssignmentModal = ({ position, options, setIsOpen }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div 
      ref={modalRef}
      className="w-[100px] absolute bg-white rounded-lg shadow-lg p-1 z-10"
      style={{ 
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
    >
      {options.map((option, index) => (
        <div 
          key={index}
          className={`px-5 py-2 hover:bg-neutral-100 hover:rounded-md flex items-center gap-2 cursor-pointer`}
          onClick={option.onClick}
        >
          {option.icon}
          <span className={`text-sm ${option.textColor || 'text-neutral-700'} font-medium font-['Pretendard']`}>
            {option.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AssignmentModal;
