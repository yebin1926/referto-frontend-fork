import { useState } from "react";
import { signUp, getUser, getAssignments } from "../../apis/api";
import { useNavigate } from "react-router-dom";

const SignUpModal = ( props ) => {
  const { isUserLoggedIn, setIsUserLoggedIn} = props;
  const navigate = useNavigate()
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
  });

  const handleSignUpData = (e) => {
    const { id, value } = e.target;
    setSignUpData({ ...signUpData, [id]: value });
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

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(signUpData);
      // onClose();
      setIsUserLoggedIn(true)
    } catch (error) {
      console.error('Error signing up:', error);
      alert('이미 가입되어 있는 이메일 주소입니다.');
    }
    handleRedirect();
  };

  // const handleLogInSwitch = () => {
  //   onClose();
  //   onSwitch();
  // };


  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200">
      <div className="w-[400px] h-100% px-[30px] pt-6 pb-[30px] bg-neutral-50 rounded-[20px] flex-col justify-center items-center gap-[7px] inline-flex">
        <div className="self-stretch h-full flex-col justify-start items-center gap-6 flex">
          <div className="self-stretch h-full flex-col justify-start items-center gap-2.5 flex py-8">
            <div className="self-stretch text-center text-neutral-900 text-2xl font-['Pretendard'] font-extrabold leading-9">
              Sign Up
            </div>
            <div className="text-center font-['Pretendard'] font-semibold">
              Enter your email and password to sign up
            </div>
            <form onSubmit={handleSignUpSubmit}>
              <input
                required
                type="email"
                placeholder="email"
                id="email"
                value={signUpData.email}
                onChange={handleSignUpData}
                className="font-['Pretendard'] input border-2 border-neutral-300 focus:outline-none focus:border-neutral-500 my-2 px-4 py-2 rounded-md w-full"
              />
              <input
                required
                type="password"
                placeholder="password"
                id="password"
                value={signUpData.password}
                onChange={handleSignUpData}
                className="font-['Pretendard'] input border-2 border-neutral-300 focus:outline-none focus:border-neutral-500 my-2 px-4 py-2 rounded-md w-full"
              />
              <button
                type="submit"
                className="bg-black text-white font-['Pretendard'] my-2 px-4 py-2 rounded-md w-full"
              >
                SIGN UP
              </button>
            </form>
            <div className="text-center font-['Pretendard'] text-gray-700">
              Already have an account?
            </div>
            <button className="underline font-['Pretendard']" onClick={() => navigate('/account/login')}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpModal;
