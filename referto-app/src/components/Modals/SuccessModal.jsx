import checkCircle2 from "../../assets/images/check-circle-2.svg";
import { useEffect } from "react";

const SuccessModal = ({text, setModalOpen}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setModalOpen(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
  <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[450px] h-[39px] px-[15px] py-3 bg-white shadow border-t-2 border-green-600 flex-col justify-start items-start gap-7 inline-flex">
    <div className="self-stretch h-[15px] justify-between items-center inline-flex">
        <div className="justify-start items-center gap-2 flex">
            <img src={checkCircle2} className="w-3.5 h-3.5 relative" />
            <div className="text-center text-green-600 text-sm font-medium font-['Pretendard'] leading-tight">{text}</div>
        </div>
    </div>
  </div>
  );
};

export default SuccessModal;
