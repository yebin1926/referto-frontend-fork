import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './redux/store';
import { login, logout, setUser } from './redux/authSlice';
import LandingPage from "./routes/LandingPage";
import HomePage from "./routes/HomePage";
import DetailPage from "./routes/DetailPage";
import LogInModal from "./components/Modals/LogIn";
import SignUpModal from "./components/Modals/SignUp";
import GoogleCallback from "./components/Auth/GoogleCallback";
import { getUser, getAssignments } from "./apis/api";
import { getCookie, removeCookie } from './utils/cookie';

function App() {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [firstAssignmentId, setFirstAssignmentId] = useState('');
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const accessToken = getCookie('access_token');
        
        if (!accessToken) {
          dispatch(logout());
          return;
        }

        const userData = await getUser();
        if (userData) {
          dispatch(login());
          dispatch(setUser(userData));
          const assignments = await getAssignments();
          if (assignments && assignments.length > 0) {
            setFirstAssignmentId(assignments[0].assignment_id);
          }
        }
      } catch (error) {
        dispatch(logout());
        removeCookie('access_token');
        removeCookie('refresh_token');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App h-screen flex flex-col w-full overflow-hidden">
      <BrowserRouter>
        <div className="flex-1 w-full overflow-hidden">
          <Routes>
            <Route
              path="/:assignmentId/:referenceId"
              element={
                <DetailPage 
                  setIsDetailPage={setIsDetailPage}
                />
              }
            />
            <Route
              path="/:assignmentId"
              element={
                <HomePage
                  isUserLoggedIn={isUserLoggedIn}
                  setIsUserLoggedIn={(value) => dispatch(value ? login() : logout())}
                  isSidebarOpen={isSidebarOpen}
                  setIsSidebarOpen={setIsSidebarOpen}
                  setIsDetailPage={setIsDetailPage}
                />
              }
            />
            <Route
              path="/account/login"
              element={<LogInModal />}
            />
            <Route
              path="/account/signup"
              element={<SignUpModal />}
            />
            <Route
              path="/"
              element={
                isUserLoggedIn ? (
                  <Navigate to={`/${firstAssignmentId}`} />
                ) : (
                  <LandingPage />
                )
              }
            />    
            <Route path="/google/callback" element={<GoogleCallback />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default function AppWithProvider() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
