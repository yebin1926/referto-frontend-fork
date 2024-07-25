const ErrorModal = () => {
  return (
  <div className="w-[450px] h-[39px] px-[15px] py-3 bg-white shadow border-t-2 border-amber-500 flex-col justify-start items-start gap-7 inline-flex">
    <div className="self-stretch h-[15px] justify-between items-center inline-flex">
        <div className="justify-start items-center gap-2 flex">
            <div className="w-3.5 h-3.5 relative" />
            <div className="text-center text-amber-500 text-sm font-medium font-['Pretendard'] leading-tight">최소 1자 이상이어야 합니다.</div>
        </div>
        <div className="w-3.5 h-3.5 relative" />
    </div>
  </div>
  );
}

export default LogInSuccessModal;
