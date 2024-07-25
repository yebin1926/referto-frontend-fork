const LogInSuccessModal = ({handleRedirect}) => {
  return(
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-hidden">
    <div className="w-[300px] h-[153px] px-[22px] py-6 bg-white rounded-2xl shadow flex-col justify-start items-start gap-7 inline-flex">
      <div className="self-stretch h-12 flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch text-neutral-900 text-lg font-semibold font-['Pretendard'] leading-[25.20px]">로그인 성공!</div>
          <div className="self-stretch text-neutral-500 text-[11px] font-medium font-['Pretendard'] leading-none">REFERTO에 오신 것을 환영합니다.</div>
      </div>
      <div className="self-stretch h-[29px] px-2 py-1.5 bg-black rounded border border-black/10 justify-center items-center gap-1 inline-flex" onClick={handleRedirect}>
          <div className="text-white text-xs font-semibold font-['Pretendard'] leading-none">확인</div>
      </div>
    </div>
  </div>
  );
};

export default LogInSuccessModal;
