import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import HomePage from "./routes/HomePage";
import DetailPage from "./routes/DetailPage";
import "./App.css";
import LandingPage from "./routes/LandingPage";
import { getUser } from "./apis/api";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const getUserAPI = async () => {
      try {
        const currUser = await getUser();
        setIsUserLoggedIn(true);
      } catch (error) {
        setIsUserLoggedIn(false);
      }
    };
    getUserAPI();
  }, []);

  // const [firstAssignmentId, setFirstAssignmentId] = useState('')

  // useEffect(() => {
  //   const fetchAssignments = async () => {
  //       try {
  //         const assignments = await getAssignments(user);
  //         setFirstAssignmentId(assignments[0]['assignment_id'])
  //       } catch (error) {
  //         console.error('Error fetching assignments:', error);
  //       }
  //     }
  //   fetchAssignments()
  // }, [isUserLoggedIn]);

  // const [referencesList, setReferencesList] = useState([]);
  // const [selectedStyleName, setSelectedStyleName] = useState("APA")

  // const findIndexofReference = (referenceId) => {
  //   const index = referencesList.findIndex(
  //     (reference) => reference.paperInfo_id === referenceId
  //   );
  //   return index;
  // };

  // const handleReferenceDelete = (referenceId, event) => {
  //   if (window.confirm("Do you really want to delete?")) {
  //     setReferencesList(
  //       referencesList.filter(
  //         (reference) => reference.paperInfo_id !== referenceId
  //       )
  //     );
  //   } else {
  //     event.preventDefault();
  //   }
  // };

  // const handleReferenceUpdate = (referenceId, newContent) => {
  //   updatePaperInfo(referenceId, newContent);
  // };

  // const getAllReferences = useCallback(() => {
  //   return referencesList.map((ref) => ref.reference);
  // }, [referencesList]);
  // //referencesList에서 reference각주부분만 가져와서 리스트로 만듦.

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
            path="/"
            element={
              <LandingPage
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
