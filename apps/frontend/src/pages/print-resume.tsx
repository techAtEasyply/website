import { useEffect } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import {
  FONT_OPTIONS,
  ModernTemplate,
  MinimalistTemplate,
  ElegantTemplate,
  CreativeTemplate,
} from "./resume-builder";

const TEMPLATES = [
  { label: "Modern", component: ModernTemplate },
  { label: "Minimalist", component: MinimalistTemplate },
  { label: "Elegant", component: ElegantTemplate },
  { label: "Creative", component: CreativeTemplate },
];

export default function PrintResumePage() {
  const { data: resumeData, fontFamily, selectedTemplate } = useResumeStore();
  const templateObj =
    TEMPLATES.find((t) => t.label === selectedTemplate) || TEMPLATES[0];

  useEffect(() => {
    setTimeout(() => {
      window.print();
    }, 100);
    const closeAfterPrint = () => window.close();
    window.addEventListener("afterprint", closeAfterPrint);
    return () => window.removeEventListener("afterprint", closeAfterPrint);
  }, []);

  return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        fontFamily,
        background: "#fff",
        color: "#111",
        padding: "32px 40px",
        boxSizing: "border-box",
        margin: "auto",
      }}
      className="print-resume-page"
    >
      {templateObj && templateObj.component({ resumeData, fontFamily })}
      <style>{`
        @media print {
          body, html, #root, .print-resume-page {
            width: 210mm !important;
            min-height: 297mm !important;
            background: #fff !important;
            color: #000 !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
          * {
            background: #fff !important;
            color: #000 !important;
            box-shadow: none !important;
            text-shadow: none !important;
            border-color: #000 !important;
          }
          a, a:visited {
            color: #000 !important;
            text-decoration: underline !important;
          }
        }
      `}</style>
    </div>
  );
}
