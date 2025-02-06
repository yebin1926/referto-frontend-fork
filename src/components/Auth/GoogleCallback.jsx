import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser, getAssignments } from '../../apis/api';
import { login, logout, setUser } from '../../redux/authSlice';
import { getCookie, removeCookie, setCookie } from '../../utils/cookie';
import { store } from '../../redux/store';
import { instanceWithToken } from '../../apis/axios';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleAuthSuccess = async () => {
      try {
        console.log('[GoogleCallback] Starting auth success handling');
        
        const params = new URLSearchParams(location.search);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        
        console.log('[GoogleCallback] Tokens from URL:', { accessToken, refreshToken });
        
        if (!accessToken || !refreshToken) {
          console.error('[GoogleCallback] Missing tokens in URL');
          throw new Error('Missing tokens in URL');
        }

        setCookie("access_token", accessToken);
        setCookie("refresh_token", refreshToken);
        
        const savedToken = getCookie('access_token');
        console.log('[GoogleCallback] Saved access token:', savedToken);

        instanceWithToken.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        console.log('[GoogleCallback] Set Authorization header:', `Bearer ${accessToken}`);

        const userData = await getUser();
        console.log('[GoogleCallback] User data received:', userData);
        
        if (!userData || !userData.email) {
          console.error('[GoogleCallback] Invalid user data:', userData);
          throw new Error('Invalid user data');
        }

        dispatch(login());
        dispatch(setUser(userData));
        
        console.log('[GoogleCallback] Redux state after dispatch:', store.getState());

        const assignments = await getAssignments();
        console.log('[GoogleCallback] Assignments received:', assignments);
        
        if (assignments && assignments.length > 0) {
          navigate(`/${assignments[0].assignment_id}`);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('[GoogleCallback] Auth success handling error:', error);
        dispatch(logout());
        removeCookie('access_token');
        removeCookie('refresh_token');
        navigate('/account/login');
      }
    };

    handleAuthSuccess();
  }, [dispatch, navigate, location]);

  return <div>구글 로그인 처리중...</div>;
};

export default GoogleCallback; 