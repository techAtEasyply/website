import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Experience = {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  year: string;
  gpa?: string;
};

export type ResumeData = {
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
};

export type ResumeUISettings = {
  fontFamily: string;
  selectedTemplate: string; // label from TEMPLATES
};

type ResumeStore = {
  data: ResumeData;
  fontFamily: string;
  selectedTemplate: string;
  updateField: (section: keyof ResumeData, value: unknown) => void;
  updatePersonalInfo: (
    field: keyof ResumeData["personalInfo"],
    value: string
  ) => void;
  setFontFamily: (font: string) => void;
  setSelectedTemplate: (template: string) => void;
};

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "123-456-7890",
    location: "City, Country",
    website: "johndoe.com",
    summary:
      "Motivated professional with experience in web development and a passion for building impactful solutions. Skilled in modern technologies and effective team collaboration.",
  },
  experience: [
    {
      id: "1",
      company: "Acme Corp",
      position: "Frontend Developer",
      duration: "2022 - Present",
      description:
        "• Developed and maintained web applications using React and TypeScript.\n• Collaborated with designers and backend developers to deliver seamless user experiences.\n• Improved application performance and accessibility.",
    },
    {
      id: "2",
      company: "Beta Solutions",
      position: "Intern Developer",
      duration: "2021 - 2022",
      description:
        "• Assisted in building internal tools with Node.js and Express.\n• Wrote unit and integration tests to ensure code quality.\n• Participated in code reviews and agile ceremonies.",
    },
  ],
  education: [
    {
      id: "1",
      institution: "State University",
      degree: "B.Sc. in Computer Science",
      year: "2018 - 2022",
      gpa: "3.8/4.0",
    },
    {
      id: "2",
      institution: "Central High School",
      degree: "High School Diploma",
      year: "2016 - 2018",
      gpa: "4.0/4.0",
    },
  ],
  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "Git",
    "GitHub",
    "SQL",
    "MongoDB",
    "Unit Testing",
    "Agile",
    "Teamwork",
  ],
};

export const useResumeStore = create(
  persist<ResumeStore>(
    (set) => ({
      data: defaultResumeData,
      fontFamily: "'Garamond', serif", // FONT_OPTIONS[0].value
      selectedTemplate: "Modern",
      updateField: (section, value) =>
        set((state) => ({
          data: {
            ...state.data,
            [section]: value,
          },
        })),
      updatePersonalInfo: (field, value) =>
        set((state) => ({
          data: {
            ...state.data,
            personalInfo: {
              ...state.data.personalInfo,
              [field]: value,
            },
          },
        })),
      setFontFamily: (font) => set(() => ({ fontFamily: font })),
      setSelectedTemplate: (template) =>
        set(() => ({ selectedTemplate: template })),
    }),
    {
      name: "resume-store",
      partialize: (state) => ({
        data: state.data,
        fontFamily: state.fontFamily,
        selectedTemplate: state.selectedTemplate,
        // Add no-op functions to satisfy ResumeStore type
        updateField: () => {},
        updatePersonalInfo: () => {},
        setFontFamily: () => {},
        setSelectedTemplate: () => {},
      }),
    }
  )
);
