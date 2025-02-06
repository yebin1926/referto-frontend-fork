import { useState, useRef } from "react";
import { signIn, getAssignments, getUser, googleSignIn, naverSignIn, kakaoSignIn } from "../../apis/api";
import Google from "../../assets/images/Google.png"
import Naver from "../../assets/images/Naver.png"
import Kakao from "../../assets/images/Kakao.png"
import { useNavigate } from "react-router-dom";
import AlertModal from "./AlertModal";
import alertCircle from "../../assets/images/alert-circle.svg";
import { useDispatch } from 'react-redux';
import { login, setUser } from '../../redux/authSlice';
import { trackEvent } from '../../utils/analytics';
import { store } from '../../redux/store';

const LogInModal = (props) => {
  const inputRef = useRef(null);
  const [errorAlertModalIsOpen, setErrorAlertModalIsOpen] = useState(false);
  const { isUserLoggedIn, setIsUserLoggedIn } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleErrorAlertCancel = () => {
    setErrorAlertModalIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    };
  };

  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  const handleLogInData = (e) => {
    const { id, value } = e.target;
    setLogInData({ ...logInData, [id]: value });
  };

  const handleRedirect = async () => {
    const getUserAPI = async () => {
      const user = await getUser();
      return user;
    };

    const fetchAssignments = async (email) => {
      try {
        const assignments = await getAssignments(email);
        return assignments[0]["assignment_id"]; // Return the first id
      } catch (error) {
        throw error;
      }
    };

    const user = await getUserAPI();
    const firstAssignmentId = await fetchAssignments(user.email);

    if (firstAssignmentId) {
      navigate(`/${firstAssignmentId}`);
    }
  };

  const handleLogInSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(logInData);
      const userData = await getUser();
      
      trackEvent('login', { method: 'email' });
      dispatch(login());
      dispatch(setUser(userData));
      
      handleRedirect();
    } catch (error) {
      trackEvent('login_error', { 
        method: 'email',
        error: error.response?.data || error.message 
      });
      setErrorAlertModalIsOpen(true);
    }
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    trackEvent('login', { method: 'google' });
    googleSignIn();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-column items-center justify-center bg-gray-200 z-50">
      <div className="w-[400px] h-auto px-[30px] pt-6 pb-[30px] bg-neutral-50 rounded-[20px] flex flex-col justify-center items-center gap-[7px]">
        <div className="self-stretch flex flex-col justify-start items-center gap-6">
          <div className="self-stretch flex flex-col justify-start items-center gap-2.5 py-8">
            <div className="self-stretch text-center text-neutral-900 text-2xl font-['Pretendard'] font-extrabold leading-9">
              로그인
            </div>
            <div className="text-center font-['Pretendard'] font-md">
              이메일과 비밀번호를 입력하세요.
            </div>
            <form onSubmit={handleLogInSubmit}>
              <input
                required
                type="email"
                placeholder="이메일"
                id="email"
                value={logInData.email}
                onChange={handleLogInData}
                ref={inputRef}
                className="font-['Pretendard'] input border-2 border-neutral-300 focus:outline-none focus:border-neutral-500 my-2 px-4 py-2 rounded-md w-full"
              />
              <input
                required
                type="password"
                placeholder="비밀번호"
                id="password"
                value={logInData.password}
                onChange={handleLogInData}
                className="font-['Pretendard'] input border-2 border-neutral-300 focus:outline-none focus:border-neutral-500 my-2 px-4 py-2 rounded-md w-full"
              />
              <button
                type="submit"
                className="bg-black text-white font-['Pretendard'] my-2 px-4 py-2 rounded-md w-full"
              >
                로그인하기
              </button>
            </form>
            {/* <div className="text-center font-['Pretendard'] text-gray-700">
              or
            </div> */}
            {/* <div className="w-full flex flex-col justify-center items-center gap-2 my-2">
              <button
                className="w-full h-11 bg-white border-2 border-neutral-200 rounded-lg flex justify-center items-center gap-2.5"
                onClick={handleGoogleLogin}
              >
                <img className="w-4 h-4" alt="Google" src={Google} />
                <div className="justify-center items-center flex">
                  <div className="w-full text-center text-neutral-900 text-base font-medium font-['Pretendard'] leading-normal">
                    구글로 시작하기
                  </div>
                </div>
              </button>
              <button
                className="w-full h-11 bg-[#03C75A] rounded-lg flex justify-center items-center gap-2.5"
                onClick={handleNaverLogin}
              >
                <img className="w-4 h-4" alt="Naver" src={Naver} />
                <div className="justify-center items-center flex">
                  <div className="w-full text-center text-white text-base font-medium font-['Pretendard'] leading-normal">
                    네이버로 시작하기
                  </div>
                </div>
              </button>
              <button
                className="w-full h-11 bg-[#FEE500] rounded-lg flex justify-center items-center gap-2.5"
                onClick={handleKakaoLogin}
              >
                <img className="w-4 h-4" alt="Kakao" src={Kakao} />
                <div className="justify-center items-center flex">
                  <div className="w-full text-center text-neutral-900 text-base font-medium font-['Pretendard'] leading-normal">
                    카카오로 시작하기
                  </div>
                </div>
              </button>
            </div> */}
            <div className="text-center font-['Pretendard'] text-neutral-700">
              회원이 아니신가요?
            </div>
            <button
              className="underline font-['Pretendard']"
              onClick={() => navigate("/account/signup")}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
      {errorAlertModalIsOpen && <AlertModal 
        icon={alertCircle}
        color={"#EF4444"}
        handleAlertCancel={handleErrorAlertCancel}
        text={"이메일 주소와 비밀번호를 확인해주세요."}
     />}
    </div>
  );
};

export default LogInModal;
