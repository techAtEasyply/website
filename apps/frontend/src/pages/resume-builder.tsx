import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, ChevronDown, Download, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import type { Theme } from "@/components/theme-provider";
import { useResumeStore } from "@/store/useResumeStore";

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
  gpa?: string;
}

interface ResumeData {
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

const FONT_OPTIONS = [
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

interface TemplateProps {
  resumeData: ResumeData;
  fontFamily: string;
}

// Template renderers
function ModernTemplate({ resumeData, fontFamily }: TemplateProps) {
  return (
    <div
      style={{
        fontFamily,
        background: "#fff",
        color: "#222",
        padding: 0,
      }}
      className="bg-white text-gray-900 font-serif px-10 py-12 max-w-4xl mx-auto"
    >
      {/* Name */}
      <h1 className="text-3xl font-bold text-center mb-1">
        {resumeData.personalInfo.fullName}
      </h1>

      {/* Contact info */}
      <div className="flex flex-wrap justify-center text-sm text-gray-700 gap-4 mb-6">
        {resumeData.personalInfo.location && (
          <div>📍 {resumeData.personalInfo.location}</div>
        )}
        {resumeData.personalInfo.email && (
          <div>
            ✉️{" "}
            <a
              href={`mailto:${resumeData.personalInfo.email}`}
              className="text-blue-700 underline"
            >
              {resumeData.personalInfo.email}
            </a>
          </div>
        )}
        {resumeData.personalInfo.phone && (
          <div>📞 {resumeData.personalInfo.phone}</div>
        )}
        {resumeData.personalInfo.website && (
          <div>
            🔗{" "}
            <a
              href={
                resumeData.personalInfo.website.startsWith("http")
                  ? resumeData.personalInfo.website
                  : `https://${resumeData.personalInfo.website}`
              }
              className="text-blue-700 underline"
            >
              {resumeData.personalInfo.website.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}
        {/* Add more links if available in resumeData */}
      </div>

      {/* Section: Welcome */}
      {resumeData.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">
            About Me
          </h2>
          <p className="text-sm mb-2">{resumeData.personalInfo.summary}</p>
        </section>
      )}

      {/* Section: Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">
            Experience
          </h2>
          {resumeData.experience.map((exp: Experience) => (
            <div className="mb-4" key={exp.id}>
              <div className="flex justify-between font-semibold text-sm">
                <div>{exp.position}</div>
                <div className="italic">{exp.duration}</div>
              </div>
              <div className="text-sm">{exp.company}</div>
              {exp.description && (
                <ul className="list-disc list-inside text-sm pl-2 mt-1 space-y-1">
                  {exp.description
                    .split("\n")
                    .map((desc: string, idx: number) => (
                      <li key={idx}>{desc}</li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Section: Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">
            Education
          </h2>
          {resumeData.education.map((edu: Education) => (
            <div key={edu.id}>
              <div className="flex justify-between text-sm font-semibold">
                <div>{edu.institution}</div>
                <div className="italic">{edu.year}</div>
              </div>
              <div className="italic text-sm">{edu.degree}</div>
              <ul className="list-disc list-inside text-sm pl-2 mt-1 space-y-1">
                {edu.gpa && <li>GPA: {edu.gpa}</li>}
                {/* Add coursework or links if available in resumeData */}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Section: Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-1 border rounded text-xs bg-blue-100 text-blue-900 border-blue-300 font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function MinimalistTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <div style={{ background: "#fff", color: "#222", padding: 0 }}>
      <div className="mb-6 pt-8 pb-2 px-8">
        <h1 className="text-3xl font-bold mb-1 text-gray-800 text-left tracking-tight">
          {resumeData.personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
          {resumeData.personalInfo.email && (
            <span>{resumeData.personalInfo.email}</span>
          )}
          {resumeData.personalInfo.phone && (
            <span>{resumeData.personalInfo.phone}</span>
          )}
          {resumeData.personalInfo.location && (
            <span>{resumeData.personalInfo.location}</span>
          )}
          {resumeData.personalInfo.website && (
            <span>{resumeData.personalInfo.website}</span>
          )}
        </div>
      </div>
      <div className="px-8 pb-8">
        {resumeData.personalInfo.summary && (
          <div className="mb-6 border-l-4 border-gray-200 pl-4">
            <h2 className="text-base font-semibold mb-2 text-gray-700 uppercase tracking-wider">
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed">
              {resumeData.personalInfo.summary}
            </p>
          </div>
        )}
        {resumeData.experience.length > 0 && (
          <div className="mb-6 border-t border-gray-200 pt-4">
            <h2 className="text-base font-semibold mb-3 text-gray-700 uppercase tracking-wider">
              Work Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp: Experience) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {exp.position}
                      </h3>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-400 font-bold">
                      {exp.duration}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm leading-relaxed mt-2">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {resumeData.education.length > 0 && (
          <div className="mb-6 border-t border-gray-200 pt-4">
            <h2 className="text-base font-semibold mb-3 text-gray-700 uppercase tracking-wider">
              Education
            </h2>
            <div className="space-y-3">
              {resumeData.education.map((edu: Education) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                    </div>
                    <div className="text-right text-sm text-gray-400 font-bold">
                      <div>{edu.year}</div>
                      {edu.gpa && <div>GPA: {edu.gpa}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {resumeData.skills.length > 0 && (
          <div>
            <h2 className="text-base font-semibold mb-3 text-gray-700 uppercase tracking-wider">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="px-2 py-1 border rounded text-xs bg-gray-100 text-gray-800 border-gray-300 font-normal"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ElegantTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <div
      style={{
        fontFamily: `'Playfair Display', serif`,
        background: "#fffbe6",
        color: "#7c5e10",
        padding: 0,
      }}
    >
      <div className="mb-6 pt-8 pb-2 px-8">
        <h1 className="text-4xl font-extrabold mb-1 text-yellow-800 text-center tracking-tight font-serif italic">
          {resumeData.personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-base text-yellow-900 font-serif italic mb-2">
          {resumeData.personalInfo.email && (
            <span>{resumeData.personalInfo.email}</span>
          )}
          {resumeData.personalInfo.phone && (
            <span>{resumeData.personalInfo.phone}</span>
          )}
          {resumeData.personalInfo.location && (
            <span>{resumeData.personalInfo.location}</span>
          )}
          {resumeData.personalInfo.website && (
            <span>{resumeData.personalInfo.website}</span>
          )}
        </div>
      </div>
      <div className="px-8 pb-8">
        {resumeData.personalInfo.summary && (
          <div className="mb-6 border-l-4 border-yellow-300 pl-4">
            <h2 className="text-lg font-semibold mb-2 text-yellow-700 uppercase tracking-wider font-serif italic">
              Professional Summary
            </h2>
            <p className="text-base leading-relaxed font-serif italic">
              {resumeData.personalInfo.summary}
            </p>
          </div>
        )}
        {resumeData.experience.length > 0 && (
          <div className="mb-6 border-t border-yellow-200 pt-4">
            <h2 className="text-lg font-semibold mb-3 text-yellow-700 uppercase tracking-wider font-serif italic">
              Work Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp: Experience) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-yellow-800 font-serif italic">
                        {exp.position}
                      </h3>
                      <p className="text-sm text-yellow-900 font-serif italic">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm text-yellow-700 font-serif italic font-bold">
                      {exp.duration}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm leading-relaxed mt-2 font-serif italic">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {resumeData.education.length > 0 && (
          <div className="mb-6 border-t border-yellow-200 pt-4">
            <h2 className="text-lg font-semibold mb-3 text-yellow-700 uppercase tracking-wider font-serif italic">
              Education
            </h2>
            <div className="space-y-3">
              {resumeData.education.map((edu: Education) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-yellow-800 font-serif italic">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-yellow-900 font-serif italic">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-right text-sm text-yellow-700 font-serif italic font-bold">
                      <div>{edu.year}</div>
                      {edu.gpa && <div>GPA: {edu.gpa}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {resumeData.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3 text-yellow-700 uppercase tracking-wider font-serif italic">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="px-2 py-1 border rounded text-xs bg-yellow-100 text-yellow-900 border-yellow-300 font-serif italic"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CreativeTemplate({ resumeData }: { resumeData: ResumeData }) {
  return (
    <div
      style={{
        background: "#fdf2f8",
        color: "#a21caf",
        padding: 0,
      }}
    >
      <div className="mb-6 pt-8 pb-2 px-8 bg-gradient-to-r from-pink-200 via-purple-200 to-pink-100 rounded-t-xl shadow-xl">
        <h1 className="text-4xl font-extrabold mb-1 text-pink-600 text-left tracking-tight">
          {resumeData.personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap gap-4 text-base text-purple-700 font-bold mb-2">
          {resumeData.personalInfo.email && (
            <span>{resumeData.personalInfo.email}</span>
          )}
          {resumeData.personalInfo.phone && (
            <span>{resumeData.personalInfo.phone}</span>
          )}
          {resumeData.personalInfo.location && (
            <span>{resumeData.personalInfo.location}</span>
          )}
          {resumeData.personalInfo.website && (
            <span>{resumeData.personalInfo.website}</span>
          )}
        </div>
      </div>
      <div className="px-8 pb-8">
        {resumeData.personalInfo.summary && (
          <div className="mb-6 border-l-4 border-pink-400 pl-4 bg-pink-50 rounded">
            <h2 className="text-lg font-extrabold mb-2 text-pink-600 uppercase tracking-wider">
              Professional Summary
            </h2>
            <p className="text-base leading-relaxed">
              {resumeData.personalInfo.summary}
            </p>
          </div>
        )}
        {resumeData.experience.length > 0 && (
          <div className="mb-6 border-t-4 border-purple-200 pt-4">
            <h2 className="text-lg font-extrabold mb-3 text-purple-700 uppercase tracking-wider">
              Work Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp: Experience) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-pink-700">
                        {exp.position}
                      </h3>
                      <p className="text-sm text-purple-700">{exp.company}</p>
                    </div>
                    <span className="text-sm text-purple-700 font-bold">
                      {exp.duration}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm leading-relaxed mt-2 text-purple-900">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {resumeData.education.length > 0 && (
          <div className="mb-6 border-t-4 border-pink-200 pt-4">
            <h2 className="text-lg font-extrabold mb-3 text-pink-600 uppercase tracking-wider">
              Education
            </h2>
            <div className="space-y-3">
              {resumeData.education.map((edu: Education) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-pink-700">{edu.degree}</h3>
                      <p className="text-sm text-purple-700">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-right text-sm text-purple-700 font-bold">
                      <div>{edu.year}</div>
                      {edu.gpa && <div>GPA: {edu.gpa}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {resumeData.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-extrabold mb-3 text-pink-600 uppercase tracking-wider">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="px-2 py-1 border rounded text-xs bg-purple-100 text-pink-700 border-pink-300 font-bold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const TEMPLATES = [
  { label: "Modern", component: ModernTemplate },
  { label: "Minimalist", component: MinimalistTemplate },
  { label: "Elegant", component: ElegantTemplate },
  { label: "Creative", component: CreativeTemplate },
];

export function ResumeBuilder() {
  const {
    data: resumeData,
    updateField,
    updatePersonalInfo,
    fontFamily,
    selectedTemplate,
    setFontFamily,
    setSelectedTemplate,
  } = useResumeStore();
  const [newSkill, setNewSkill] = useState("");
  const { theme, setTheme } = useTheme();
  const themeOptions = [
    { label: "Dark", value: "dark" },
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
    { label: "Lemon", value: "lemon" },
    { label: "Magenta", value: "magenta" },
  ];

  const previewRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      duration: "",
      description: "",
    };
    updateField("experience", [...resumeData.experience, newExp]);
  };

  const updateExperience = (id: string, field: string, value: string) => {
    updateField(
      "experience",
      resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id: string) => {
    updateField(
      "experience",
      resumeData.experience.filter((exp) => exp.id !== id)
    );
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      year: "",
      gpa: "",
    };
    updateField("education", [...resumeData.education, newEdu]);
  };

  const updateEducation = (id: string, field: string, value: string) => {
    updateField(
      "education",
      resumeData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const removeEducation = (id: string) => {
    updateField(
      "education",
      resumeData.education.filter((edu) => edu.id !== id)
    );
  };

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      updateField("skills", [...resumeData.skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    updateField(
      "skills",
      resumeData.skills.filter((s) => s !== skill)
    );
  };

  const handlePrint = () => {
    const printWindow = window.open(
      "/resume/print",
      "_blank",
      "width=900,height=1200"
    );
    if (printWindow) printWindow.focus();
  };

  const templateObj =
    TEMPLATES.find((t) => t.label === selectedTemplate) || TEMPLATES[0];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-7xl"></div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <h1 className="text-3xl font-bold">Build Resume</h1>
          <p className="text-muted-foreground">
            Create your professional resume with real-time preview
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Print Button */}
          <Button
            variant="default"
            shine
            onClick={handlePrint}
            className="flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Print Resume
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 w-44 h-10 justify-between pr-6"
              >
                <span className="truncate">
                  Font:{" "}
                  {FONT_OPTIONS.find((f) => f.value === fontFamily)?.label ||
                    "Font"}
                </span>
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {FONT_OPTIONS.map((font) => (
                <DropdownMenuItem
                  key={font.value}
                  onClick={() => setFontFamily(font.value)}
                  className={fontFamily === font.value ? "font-bold" : ""}
                >
                  {font.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                className="w-32 h-10 flex items-center justify-between theme-btn"
              >
                Theme:{" "}
                {themeOptions.find((t) => t.value === theme)?.label || "Theme"}
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {themeOptions.map((t) => (
                <DropdownMenuItem
                  key={t.value}
                  onClick={() => setTheme(t.value as Theme)}
                  className={theme === t.value ? "font-bold" : ""}
                >
                  {t.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-44 h-10 flex items-center justify-between"
              >
                Template: {selectedTemplate}
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {TEMPLATES.map(
                (tpl: { label: string; component: typeof ModernTemplate }) => (
                  <DropdownMenuItem
                    key={tpl.label}
                    onClick={() => setSelectedTemplate(tpl.label)}
                    className={
                      selectedTemplate === tpl.label ? "font-bold" : ""
                    }
                  >
                    {tpl.label}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-6">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 space-y-6">
          {/* ...rest of your form code remains unchanged... */}
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) =>
                      updatePersonalInfo("fullName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) =>
                      updatePersonalInfo("email", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) =>
                      updatePersonalInfo("phone", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={resumeData.personalInfo.location}
                    onChange={(e) =>
                      updatePersonalInfo("location", e.target.value)
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={resumeData.personalInfo.website}
                    onChange={(e) =>
                      updatePersonalInfo("website", e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  rows={3}
                  value={resumeData.personalInfo.summary}
                  onChange={(e) =>
                    updatePersonalInfo("summary", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>
          {/* ...rest of your form code remains unchanged... */}
          {/* Experience */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Work Experience</CardTitle>
              <Button onClick={addExperience} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {resumeData.experience.map((exp: Experience) => (
                <div key={exp.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                      <div>
                        <Label>Company</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(exp.id, "company", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Position</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) =>
                            updateExperience(exp.id, "position", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(exp.id)}
                      className="ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <Input
                      value={exp.duration}
                      onChange={(e) =>
                        updateExperience(exp.id, "duration", e.target.value)
                      }
                      placeholder="e.g., 2022 - Present"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      rows={2}
                      value={exp.description}
                      onChange={(e) =>
                        updateExperience(exp.id, "description", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          {/* Education */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education</CardTitle>
              <Button onClick={addEducation} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {resumeData.education.map((edu: Education) => (
                <div key={edu.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                      <div>
                        <Label>Institution</Label>
                        <Input
                          value={edu.institution}
                          onChange={(e) =>
                            updateEducation(
                              edu.id,
                              "institution",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Degree</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(edu.id, "degree", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Year</Label>
                        <Input
                          value={edu.year}
                          onChange={(e) =>
                            updateEducation(edu.id, "year", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>GPA (Optional)</Label>
                        <Input
                          value={edu.gpa}
                          onChange={(e) =>
                            updateEducation(edu.id, "gpa", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(edu.id)}
                      className="ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <Button onClick={addSkill}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill: string, idx: number) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="cursor-pointer"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-2 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resume Preview */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-4 flex justify-center relative">
          {/* Eye icon button for preview */}
          <button
            onClick={() => navigate("/preview")}
            className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
            title="Preview Resume"
            type="button"
          >
            <Eye className="w-6 h-6 text-gray-700" />
          </button>
          <div
            ref={previewRef}
            className="bg-card text-card-foreground rounded-xl shadow-sm pdf-friendly"
            style={{
              width: "100%",
              maxWidth: "210mm",
              fontFamily: fontFamily,
              background: "#fff",
              color: "#111",
              padding: "32px 40px",
              boxSizing: "border-box",
              overflow: "visible",
            }}
          >
            {templateObj && templateObj.component({ resumeData, fontFamily })}
          </div>
        </div>
      </div>
    </div>
  );
}

export {
  FONT_OPTIONS,
  ModernTemplate,
  MinimalistTemplate,
  ElegantTemplate,
  CreativeTemplate,
};
