export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
  gpa?: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
  };
  experience: Experience[];
  education: Education[];
  skills: string[];
}

export interface TemplateProps {
  resumeData: ResumeData;
  fontFamily: string;
}

export const FONT_OPTIONS = [
  {
    label: "Garamond",
    value: "'Garamond', serif",
  },
  {
    label: "Calibri",
    value: "'Calibri', sans-serif",
  },
  {
    label: "Cambria",
    value: "'Cambria', serif",
  },
  {
    label: "Times New Roman",
    value: "'Times New Roman', Times, serif",
  },
  {
    label: "Georgia",
    value: "'Georgia', serif",
  },
  {
    label: "Arial",
    value: "'Arial', sans-serif",
  },
  {
    label: "Helvetica Neue",
    value: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  {
    label: "Liberation Serif",
    value: "'Liberation Serif', serif",
  },
  {
    label: "Liberation Sans",
    value: "'Liberation Sans', sans-serif",
  },
  {
    label: "Segoe UI",
    value: "'Segoe UI', sans-serif",
  },
  {
    label: "Verdana",
    value: "'Verdana', sans-serif",
  },
  {
    label: "Tahoma",
    value: "'Tahoma', sans-serif",
  },
  {
    label: "Monospace",
    value: "'monospace'",
  },
];
