// import alertCircle from "../../assets/images/alert-circle.svg";
// import checkCircle2 from "../../assets/images/check-circle-2.svg";
// import alertTriangle from "../../assets/images/alert-triangle.svg";
import x from "../../assets/images/x.svg";

const AlertModal = ({icon, color, handleAlertCancel, text}) => {
  return (
  <>
    <div className="fixed inset-0 bg-transparent z-40 pointer-events-auto"></div>
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[450px] h-[39px] px-[15px] py-3 bg-white shadow border-t-2 flex-col justify-start items-start gap-7 inline-flex z-50"
    style={{ borderColor: color }}>
      <div className="self-stretch h-[15px] justify-between items-center inline-flex">
          <div className="justify-start items-center gap-2 flex">
              <img src={icon} className="w-3.5 h-3.5 relative" />
              <div className="text-center text-sm font-medium font-['Pretendard'] leading-tight" style={{ color: color }}>{text}</div>
          </div>
          <img src={x} className="w-3.5 h-3.5 relative cursor-pointer" onClick={handleAlertCancel}/>
      </div>
    </div>
  </>
  );
}

export default AlertModal;
