import Layout from "./layout/layout";
import { ResumeBuilder } from "./pages/resume-builder";
import JobAndInternshipPage from "./pages/job-and-internship";
import Interview from "./pages/interview";
import Dashboard from "./pages/dashboard";
import Settings from "./pages/settings";
import PrintResumePage from "./pages/print-resume";
import ResumePreviewPage from "./pages/preview-resume";
import Landing from './pages/Landing';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import StartInterview from "./pages/startInterview";
import { AuthPage } from "./pages/auth";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

function ProtectedRoutes() {
  return (
    <>
      <SignedIn>
        <Routes>
          <Route path="/resume" element={<ResumeBuilder />} />
          <Route path="/resume/print" element={<PrintResumePage />} />
          <Route
            path="/job-and-internship"
            element={<JobAndInternshipPage />}
          />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/preview" element={<ResumePreviewPage />} />

          <Route path="/" element={<Navigate to="/resume" replace />} />
        </Routes>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route path="/sign-in" element={<AuthPage />} />
          <Route path="/sign-up" element={<AuthPage />} />
          <Route path="*" element={<ProtectedRoutes />} />
        </Route>
        <Route path="/interview" element={<Interview />} />
        <Route path="/landing" element={<Landing />} />

        <Route path="/startInterview" element={<StartInterview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
