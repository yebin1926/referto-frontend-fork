import { useState, useEffect } from "react";
import { signIn, getAssignments, getUser } from "../../apis/api"
import Naver from "../../assets/images/Naver.png"
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import SignUpModal from "../Modals/SignUp";

const LogInModal = ( props ) => {
  const [showLogIn, setShowLogIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const { isUserLoggedIn, setIsUserLoggedIn } = props;
  const navigate = useNavigate()

  const openLogInModal = () => {
    console.log("openLogIn");
    setShowLogIn(true);
  };

  const closeLogInModal = () => {
    console.log("closeLogIn");
    setShowLogIn(false);
  };

  const openSignUpModal = () => {
    console.log("openSignup");
    setShowSignUp(true);
  };

  const closeSignUpModal = () => {
    console.log("closeSignup");
    setShowSignUp(false);
  };

  useEffect(() => {
    const loggedIn = !!getCookie("access_token");
    setIsUserLoggedIn(loggedIn);
    if (loggedIn) {
      setShowLogIn(false);
      setShowSignUp(false);
    }
    console.log("useEffect loggedIn:", loggedIn);
  }, [isUserLoggedIn]);


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
      closeLogInModal();
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
    handleRedirect();
  };
  
  const handleSignUpSwitch = () => {
    closeLogInModal();
    openSignUpModal();
  };

  // const handleNaverLogin = async(e) => {
  //   e.preventDefault();
  //   try {
  //     await naverSignIn()
  //     closeLogInModal();
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //   }
  // }

  const handleRedirect = async() => {

    const getUserAPI = async () => {
      const user = await getUser();
      return user
    };

    const fetchAssignments = async (email) => {
      try {
        const assignments = await getAssignments(email);
        return assignments[0]['number']; // Return the first number
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    const user = await getUserAPI();
    const firstAssignmentId = await fetchAssignments(user.email);

    if (firstAssignmentId) {
      console.log('Redirecting to:', `/${firstAssignmentId}`);
      navigate(`/${firstAssignmentId}`);
    } else {
      console.error('First assignment ID is null');
    }
  }

  return (
    <>
      {showLogIn && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-70 z-10">
          <div className="w-[400px] h-100% px-[30px] pt-6 pb-[30px] bg-neutral-50 rounded-[20px] flex flex-col justify-center items-center gap-[7px]">
            <div className="self-stretch h-full flex flex-col justify-start items-center gap-6">
              <div className="self-stretch h-full flex flex-col justify-start items-center gap-2.5 py-8">
                <div className="self-stretch text-center text-neutral-900 text-2xl font-black leading-9">
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
                <button
                  className="w-full my-2 h-10 bg-green-500 rounded-lg flex justify-center items-center gap-2.5"
                  // onClick={handleNaverLogin}
                >
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
      )}

      {showSignUp && (
        <SignUpModal
          onClose={closeSignUpModal}
          onSwitch={openLogInModal}
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}
          handleRedirect={handleRedirect}
        />
      )}
    </>
  );
};

export default LogInModal;