import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./routes/HomePage";
import ReferenceDetailPage from "./routes/ReferenceDetailPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/:assignmentId/:referenceId"
            element={<ReferenceDetailPage />}
          />
          <Route path="/:assignmentId" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
