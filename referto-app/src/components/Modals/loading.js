import { FadeLoader } from 'react-spinners';

export const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
      <FadeLoader color="#ffffff" />
      <div className="mt-5 text-neutral-50 font-md">
        파일을 분석하고 있어요
      </div>
    </div>
  );
};

export default Loading;
