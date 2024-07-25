const LogInSuccessModal = ({handleRedirect}) => {
  return(
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-hidden">
    <div className="w-[350px] h-[170px] px-[22px] py-6 bg-white rounded-2xl shadow flex-col justify-start items-start gap-7 inline-flex">
    <div className="self-stretch h-[62px] flex-col justify-center items-start gap-2 flex">
        <div className="self-stretch text-neutral-900 text-2xl font-semibold font-['Pretendard'] leading-[33.60px]">로그인 성공!</div>
        <div className="self-stretch text-neutral-500 text-sm font-medium font-['Pretendard'] leading-tight">REFERTO에 오신 것을 환영합니다.</div>
    </div>
    <div className="self-stretch p-2 bg-black rounded border border-black/10 justify-center items-center gap-1 inline-flex cursor-pointer" onClick={handleRedirect}>
      <div className="text-white text-sm font-semibold font-['Pretendard'] leading-tight">확인</div>
      </div>
    </div>
  </div>
 );
};

export default LogInSuccessModal;
