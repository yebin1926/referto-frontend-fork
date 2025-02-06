import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, ChevronLeft } from "lucide-react";
import logo from "../../assets/images/logo.svg";
import userprofile from "../../assets/images/user.svg";
import { removeCookie } from "../../utils/cookie";
import { useEffect } from 'react';

const Header = ({ isSidebarOpen, setIsSidebarOpen, isDetailPage, firstAssignmentId }) => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  const handleOpenModal = () => {
    navigate('/account/login');
  };

  const handleSignOut = () => {
    removeCookie("access_token");
    removeCookie("refresh_token");
    dispatch(logout());
    window.location.href = "/";
  };

  const handleLogoClick = () => {
    if (isUserLoggedIn) {
      if (firstAssignmentId) {
        navigate(`/${firstAssignmentId}`);
      } else {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex w-full h-[55px] sm:h-[65px] items-center justify-between px-4 sm:px-10 py-0 relative bg-neutral-700">
      <div className="inline-flex items-center justify-center gap-2 sm:gap-2.5 relative flex-[0_0_auto]">
        {!isLandingPage && (
          <>
            {isDetailPage ? (
              <button
                onClick={() => navigate(-1)}
                className="sm:hidden mr-1"
              >
                <ChevronLeft className="text-white w-6 h-6" />
              </button>
            ) : (
              !isDetailPage && (
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="sm:hidden mr-1"
                >
                  <Menu className="text-white w-6 h-6" />
                </button>
              )
            )}
          </>
        )}
        <div className="flex w-[120px] sm:w-[145px] items-center gap-2 sm:gap-2.5 relative">
          <div className="relative w-[120px] sm:w-[146.54px] h-[32px] sm:h-[38px] mr-[-1.54px] cursor-pointer" 
            onClick={handleLogoClick}
          >
            <img
              className="absolute w-[22px] sm:w-[26px] h-6 sm:h-7 top-[5px] -left-px"
              alt="logo"
              src={logo}
            />
            <div className="absolute top-0 left-[30px] sm:left-[34px] font-[Pretendard] font-bold text-neutral-50 text-[20px] sm:text-[25px] tracking-[0] leading-[32px] sm:leading-[37.5px] whitespace-nowrap">
              REFERTO
            </div>
          </div>
        </div>
      </div>
      <div className="inline-flex items-center justify-end gap-2 sm:gap-2.5 relative self-stretch flex-[0_0_auto]">
        <div className="inline-flex items-center justify-center gap-2 sm:gap-2.5 relative self-stretch flex-[0_0_auto]">
          {isUserLoggedIn && user ? (
            <div className="flex flex-row items-center">
              <div className="w-fit mx-3 font-[Pretendard] font-medium text-neutral-50 text-base sm:text-lg text-center hidden sm:block">
                {user.email || '이메일 없음'}
              </div>
              <img alt="profile" src={userprofile} className="w-5 h-5 sm:w-6 sm:h-6 mr-5 hidden sm:block" />
              <Link
                to="/"
                onClick={handleSignOut}
                className="w-fit ml-3 sm:ml-5 font-[Pretendard] font-medium text-neutral-50 text-base sm:text-lg text-center"
              >
                로그아웃
              </Link>
            </div>
          ) : (
            <div className="items-center justify-center flex">
              <div
                className="relative w-fit font-[Pretendard] font-medium text-neutral-50 text-base sm:text-lg text-center tracking-[0] leading-6 whitespace-nowrap cursor-pointer"
                onClick={handleOpenModal}
              >
                로그인
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
