import Layout from "./layout/layout";
import { ResumeBuilder } from "./pages/resume-builder";
import JobAndInternshipPage from "./pages/job-and-internship";
import Interview from "./pages/interview";
import Dashboard from "./pages/dashboard";
import Settings from "./pages/settings";
import PrintResumePage from "./pages/print-resume";
import ResumePreviewPage from "./pages/preview-resume";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from './pages/auth';
import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/sign-in" element={<AuthPage />} />
          <Route path="/sign-up" element={<AuthPage />} />
          <Route
            path="*"
            element={
              <>
                <SignedIn>
                  <Routes>
                    <Route path="/resume" element={<ResumeBuilder />} />
                    <Route path="/resume/print" element={<PrintResumePage />} />
                    <Route path="/job-and-internship" element={<JobAndInternshipPage />} />
                    <Route path="/interview" element={<Interview />} />
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
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
