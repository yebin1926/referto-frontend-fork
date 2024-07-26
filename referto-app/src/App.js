import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import HomePage from "./routes/HomePage";
import DetailPage from "./routes/DetailPage";
import "./App.css";
import LandingPage from "./routes/LandingPage";
import { getUser, getAssignments } from "./apis/api";
import LogInModal from "./components/Modals/LogIn";
import SignUpModal from "./components/Modals/SignUp";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);

  // Note: useNavigate should be used within a BrowserRouter context
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const currUser = await getUser();
        setIsUserLoggedIn(true);
        
        const fetchAssignments = async (email) => {
          try {
            const assignments = await getAssignments(email);
            return assignments[0]?.["assignment_id"];
          } catch (error) {
            console.error("Error fetching assignments:", error);
          }
        };

        const user = await getUser();
        const firstAssignmentId = await fetchAssignments(user.email);

        if (firstAssignmentId) {
          setRedirectTo(`/${firstAssignmentId}`);
        } else {
          console.error("First assignment ID is null");
        }

      } catch (error) {
        setIsUserLoggedIn(false);
      }
    };

    handleRedirect();
  }, []);

  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo);
    }
  }, [redirectTo, navigate]);

  return (
    <div className="App">
      <Header
        isUserLoggedIn={isUserLoggedIn}
        setIsUserLoggedIn={setIsUserLoggedIn}
      />
      <Routes>
        <Route
          path="/:assignmentId/:referenceId"
          element={<DetailPage />}
        />
        <Route
          path="/:assignmentId"
          element={<HomePage isUserLoggedIn={isUserLoggedIn} />}
        />
        <Route
          path="/account/login"
          element={<LogInModal isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} />}
        />
        <Route
          path="/account/signup"
          element={<SignUpModal isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} />}
        />
        <Route
          path="/"
          element={<LandingPage isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} />}
        />
      </Routes>
    </div>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
