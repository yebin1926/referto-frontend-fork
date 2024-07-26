import { useState } from "react";
import { signIn, getAssignments, getUser } from "../../apis/api";
import Naver from "../../assets/images/Naver.png";
import { useNavigate } from "react-router-dom";
// import logo from "../../assets/images/logo.svg"
// import { getCookie } from "../../utils/cookie";
// import SignUpModal from "../Modals/SignUp";
// import LogInSuccessModal from "./LogInSuccessModal";

const LogInModal = (props) => {
  // const [showLogIn, setShowLogIn] = useState(true);
  // const [showSignUp, setShowSignUp] = useState(false);
  // const [logInSuccessModalIsOpen, setLogInSuccessModalIsOpen] = useState(false);
  const { isUserLoggedIn, setIsUserLoggedIn } = props;
  const navigate = useNavigate();

  // const openLogInModal = () => {
  //   console.log("openLogIn");
  //   setShowLogIn(true);
  // };

  // const closeLogInModal = () => {
  //   console.log("closeLogIn");
  //   setShowLogIn(false);
  // };

  // const openSignUpModal = () => {
  //   console.log("openSignup");
  //   setShowSignUp(true);
  // };

  // const closeSignUpModal = () => {
  //   console.log("closeSignup");
  //   setShowSignUp(false);
  // };

  // useEffect(() => {
  //   const loggedIn = !!getCookie("access_token");
  //   setIsUserLoggedIn(loggedIn);
  //   if (loggedIn) {
  //     setShowLogIn(false);
  //     setShowSignUp(false);
  //   }
  //   console.log("useEffect loggedIn:", loggedIn);
  // }, [isUserLoggedIn]);

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
        console.error("Error fetching assignments:", error);
      }
    };

    const user = await getUserAPI();
    const firstAssignmentId = await fetchAssignments(user.email);

    if (firstAssignmentId) {
      console.log("Redirecting to:", `/${firstAssignmentId}`);
      navigate(`/${firstAssignmentId}`);
    } else {
      console.error("First assignment ID is null");
    }
  };

  const handleLogInSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(logInData);
      setIsUserLoggedIn(true);
      // setLogInSuccessModalIsOpen(true);
      // closeLogInModal();
      handleRedirect();
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert("이메일 주소와 비밀번호를 확인해주세요.");
    }
  };

  // const handleSignUpSwitch = () => {
  //   // closeLogInModal();
  //   openSignUpModal();
  // };

  // const handleNaverLogin = async(e) => {
  //   e.preventDefault();
  //   try {
  //     await naverSignIn()
  //     closeLogInModal();
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //   }
  // }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-column items-center justify-center bg-gray-200 z-100">
      <div className="w-[400px] h-auto px-[30px] pt-6 pb-[30px] bg-neutral-50 rounded-[20px] flex flex-col justify-center items-center gap-[7px]">
        <div className="self-stretch flex flex-col justify-start items-center gap-6">
          <div className="self-stretch flex flex-col justify-start items-center gap-2.5 py-8">
            <div className="self-stretch text-center text-neutral-900 text-2xl font-['Pretendard'] font-extrabold leading-9">
              Log in
            </div>
            <div className="text-center font-['Pretendard'] font-semibold">
              Enter your email and password to log in
            </div>
            <form onSubmit={handleLogInSubmit}>
              <input
                required
                type="email"
                placeholder="Email"
                id="email"
                value={logInData.email}
                onChange={handleLogInData}
                className="font-['Pretendard'] input border-2 border-neutral-300 focus:outline-none focus:border-neutral-500 my-2 px-4 py-2 rounded-md w-full"
              />
              <input
                required
                type="password"
                placeholder="Password"
                id="password"
                value={logInData.password}
                onChange={handleLogInData}
                className="font-['Pretendard'] input border-2 border-neutral-300 focus:outline-none focus:border-neutral-500 my-2 px-4 py-2 rounded-md w-full"
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
              <img className="w-10 h-10" alt="Naver" src={Naver} />
              <div className="justify-center items-center gap-2.5 flex">
                <div className="w-full text-center text-white text-base font-medium font-['Pretendard'] leading-normal">
                  Log in with Naver
                </div>
              </div>
            </button>
            <div className="text-center font-['Pretendard'] text-gray-700">
              Are you new?
            </div>
            <button
              className="underline font-['Pretendard']"
              onClick={() => navigate("/account/signup")}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInModal;
