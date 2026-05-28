import Interview from "./pages/interview";
import StartInterview from "./pages/startInterview";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/interview" element={<Interview />} />
        <Route path="/startInterview" element={<StartInterview />} />
        <Route path="*" element={<Navigate to="/interview" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
