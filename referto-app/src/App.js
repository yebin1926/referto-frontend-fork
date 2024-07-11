import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useCallback } from "react"
import Header from "./components/Header";
import HomePage from "./routes/HomePage";
import ReferenceDetailPage from "./routes/ReferenceDetailPage";
import references from "./data/references.js"
import "./App.css";

function App() {
  const [referencesList, setReferencesList] = useState(references);
  const findIndexofReference = (referenceId) => {
    const index = referencesList.findIndex(reference => reference.paperInfo_id === referenceId);
    return index;
  }
  const handleReferenceDelete = (referenceId, event) => {
    if (window.confirm("Do you really want to delete?")){
      setReferencesList(
        referencesList.filter(
          (reference) => reference.paperInfo_id !== referenceId
        )
      ); 
    } else {
      event.preventDefault();
    }
  };

  const handleReferenceUpdate = (referenceId, newContent) => {
    setReferencesList(
      referencesList.map((reference) => {
        if (reference.paperInfo_id === referenceId) {
          return { ...reference, reference: newContent };
        }
        return reference;
      })
    );
  };

  const getAllReferences = useCallback(() => {
    return referencesList.map((ref) => ref.reference);
  }, [referencesList]);
  //referencesList에서 reference각주부분만 가져와서 리스트로 만듦.
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/:assignmentId/:referenceId"
            element={
            <ReferenceDetailPage
              referencesList={referencesList}
              handleReferenceDelete={handleReferenceDelete}
              handleReferenceUpdate={handleReferenceUpdate}
              findIndexofReference={findIndexofReference}
            />}
          />
          <Route 
            path="/:assignmentId" 
            element={
            <HomePage 
              referencesList={referencesList}
              handleReferenceDelete={handleReferenceDelete}
              handleReferenceUpdate={handleReferenceUpdate}
              getAllReferences={getAllReferences}
              findIndexofReference={findIndexofReference}
            />} />
          <Route path="/" element={<Navigate to="/1" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
