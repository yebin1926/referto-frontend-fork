import { useState } from "react";
import { naverSignIn, signIn } from "../../apis/api"
import Naver from "../../assets/images/Naver.png"

const LogInModal = ({ onClose, onSwitch }) => {
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  const handleLogInData = (e) => {
    const { id, value } = e.target;
    setLogInData({ ...logInData, [id]: value });
  };
  
  const handleLogInSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(logInData);
      alert("로그인 되었습니다");
      onClose();
    } catch (error) {
      console.error('Error logging in:', error.message);
      alert('이메일 주소와 비밀번호를 확인해주세요.');
    }
  };

  const handleSignUpSwitch = () => {
    onClose();
    onSwitch();
  };

  const handleNaverLogin = async(e) => {
    e.preventDefault();
    try {
      await naverSignIn()
      onClose();
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-70 z-10">
      <div className="w-[400px] h-100% px-[30px] pt-6 pb-[30px] bg-neutral-50 rounded-[20px] flex-col justify-center items-center gap-[7px] inline-flex">
        <div className="self-stretch h-full flex-col justify-start items-center gap-6 flex">
          <div className="self-stretch h-full flex-col justify-start items-center gap-2.5 flex py-8">
            <div className="self-stretch text-center text-neutral-900 text-2xl font-black font-['Pretendard'] leading-9">
              Log in
            </div>
            <div className="text-center font-['Pretendard'] font-semibold">
              Enter your email and password to log in
            </div>
            <form onSubmit={handleLogInSubmit}>
              <input
                required
                type="email"
                placeholder="email"
                id="email"
                value={logInData.email}
                onChange={handleLogInData}
                className="font-['Pretendard'] input border my-2 px-4 py-2 rounded-md w-full"
              />
              <input
                required
                type="password"
                placeholder="password"
                id="password"
                value={logInData.password}
                onChange={handleLogInData}
                className="font-['Pretendard'] input border my-2 px-4 py-2 rounded-md w-full"
              />
              <button
                type="submit"
                className="bg-black text-white font-['Pretendard'] my-2 px-4 py-2 rounded-md w-full"
              >
                LOG IN
              </button>
            </form>
            <button className="w-full my-2 h-10 bg-green-500 rounded-lg justify-center items-center gap-2.5 inline-flex" onClick={handleNaverLogin}>
                <img className="w-10 h-10" alt='Naver'src={Naver} />
                <div className="justify-center items-center gap-2.5 flex">
                    <div className="w-full self-stretch text-center text-white text-base font-medium font-['Pretendard'] leading-normal">Log in with Naver</div>
                </div>
            </button>
            <div className="text-center font-['Pretendard'] text-gray-700">
              Are you new?
            </div>
            <button className="underline font-['Pretendard']" onClick={handleSignUpSwitch}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInModal;
