import { X } from "lucide-react";
import { useState } from "react";
import Google from "../../assets/images/Google_SI.png";

const SignInModal = ({ onClose }) => {
  const [signInData, setSignInData] = useState({});
  const handleSignInSubmit = (e) => {
    //
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-70 z-10">
      <div className="w-[360px] h-100% px-[30px] pt-6 pb-[30px] bg-neutral-50 rounded-[20px] flex-col justify-center items-center gap-[7px] inline-flex">
        <div className="self-stretch justify-end items-center gap-2.5 inline-flex">
          <X
            className="w-[18px] h-[18px] relative cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="self-stretch h-full flex-col justify-start items-center gap-6 flex">
          <div className="self-stretch h-9 flex-col justify-start items-center gap-2.5 flex py-3">
            <div className="self-stretch text-center text-neutral-900 text-2xl font-black font-['Pretendard'] leading-9">
              Sign in
            </div>
            <div className="text-center font-['Pretendard']">
              Enter your email and password to sign in
            </div>
          </div>
          <form onSubmit={handleSignInSubmit}>
            <input
              required
              type="text"
              id="email"
              placeholder="email"
              value={signInData.email}
              onChange={handleSignInData}
            />
          </form>

          <img
            alt="Sign in with Google"
            src={Google}
            className="w-[200px] py-3"
          />
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
