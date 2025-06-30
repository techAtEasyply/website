import { useResumeStore } from "@/store/useResumeStore";
import {
  ModernTemplate,
  MinimalistTemplate,
  ElegantTemplate,
  CreativeTemplate,
} from "./templates";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TEMPLATES = [
  { label: "Modern", component: ModernTemplate },
  { label: "Minimalist", component: MinimalistTemplate },
  { label: "Elegant", component: ElegantTemplate },
  { label: "Creative", component: CreativeTemplate },
];

export default function ResumePreviewPage() {
  const { data: resumeData, fontFamily, selectedTemplate } = useResumeStore();
  const templateObj =
    TEMPLATES.find((t) => t.label === selectedTemplate) || TEMPLATES[0];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-6">
      <div className="w-full max-w-4xl flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Resume Preview</h1>
        <Button variant="outline" onClick={() => navigate("/resume")}>
          Back to Edit
        </Button>
      </div>
      <div
        className="shadow-2xl rounded-md bg-white border border-gray-200 flex items-center justify-center"
        style={{
          width: "210mm",
          height: "297mm",
          transform: "scale(0.7)",
          transformOrigin: "top center",
          background: "#fff",
          color: "#111",
          padding: "32px 40px",
          boxSizing: "border-box",
          overflow: "visible",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {templateObj && templateObj.component({ resumeData, fontFamily })}
      </div>
    </div>
  );
}
