import { X } from "lucide-react";
import StyleList from "../Style/list";
import { useRef } from "react";

const SelectStyleModal = ({ onClose }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-70 z-10">
      <div className="w-100%  h-100% px-[30px] pt-6 pb-[30px] bg-neutral-50 rounded-[20px] flex-col justify-center items-center gap-[7px] inline-flex">
        <div className="self-stretch justify-end items-center gap-2.5 inline-flex">
          <X
            className="w-[18px] h-[18px] relative cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="self-stretch h-full flex-col justify-start items-center gap-10 flex">
          <div className="self-stretch flex-col justify-start items-center gap-2.5 flex pt-3">
            <div className="self-stretch text-center text-neutral-900 text-2xl font-bold font-['Pretendard'] leading-9">
              Select your citation style!
            </div>
          </div>
          <div className="px-4">
            <StyleList />
          </div>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <div className="w-full px-4 py-2 bg-neutral-900 rounded-lg justify-center items-center gap-2 inline-flex">
            <div
              className="w-full text-center text-neutral-50 text-lg font-light font-['Pretendard'] leading-normal cursor-pointer"
              onClick={handleButtonClick}
            >
              Done
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectStyleModal;
