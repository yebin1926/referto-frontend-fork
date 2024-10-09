import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import HomePage from "./routes/HomePage";
import DetailPage from "./routes/DetailPage";
import "./App.css";
import LandingPage from "./routes/LandingPage";
import { getUser, getAssignments } from "./apis/api";
import LogInModal from "./components/Modals/LogIn";
import SignUpModal from "./components/Modals/SignUp";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [firstAssignmentId, setFirstAssignmentId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
        setIsUserLoggedIn(true);
        if (user && user.email) {
          const assignments = await getAssignments(user.email);
          if (assignments.length > 0) {
            setFirstAssignmentId(assignments[0]["assignment_id"]);
          }
        }
      } catch (error) {
        setIsUserLoggedIn(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}
        />
        <Routes>
          <Route
            path="/:assignmentId/:referenceId"
            element={
              <DetailPage
              // referencesList={referencesList}
              // handleReferenceDelete={handleReferenceDelete}
              // handleReferenceUpdate={handleReferenceUpdate}
              // findIndexofReference={findIndexofReference}
              // selectedStyleName={selectedStyleName}
              />
            }
          />
          <Route
            path="/:assignmentId"
            element={
              <HomePage
                // referencesList={referencesList}
                // setReferencesList={setReferencesList}
                // handleReferenceDelete={handleReferenceDelete}
                // handleReferenceUpdate={handleReferenceUpdate}
                // getAllReferences={getAllReferences}
                // findIndexofReference={findIndexofReference}
                isUserLoggedIn={isUserLoggedIn}
                // selectedStyleName={selectedStyleName}
                // setSelectedStyleName={setSelectedStyleName}
              />
            }
          />
          <Route
            path="/account/login"
            element={
              <LogInModal
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
              />
            }
          />
          <Route
            path="/account/signup"
            element={
              <SignUpModal
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
              />
            }
          />
          <Route
            path="/"
            element={
              isUserLoggedIn ? (
                <Navigate to={`/${firstAssignmentId}`} />
              ) : (
                <LandingPage
                  isUserLoggedIn={isUserLoggedIn}
                  setIsUserLoggedIn={setIsUserLoggedIn}
                />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
