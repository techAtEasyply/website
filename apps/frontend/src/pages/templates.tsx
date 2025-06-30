// Template and font options for resume-builder
import React from "react";

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

export interface TemplateProps {
  resumeData: ResumeData;
  fontFamily: string;
}

export function ModernTemplate({ resumeData, fontFamily }: TemplateProps) {
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

export function MinimalistTemplate({ resumeData }: { resumeData: ResumeData }) {
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

export function ElegantTemplate({ resumeData }: { resumeData: ResumeData }) {
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

export function CreativeTemplate({ resumeData }: { resumeData: ResumeData }) {
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

export const TEMPLATES = [
  { label: "Modern", component: ModernTemplate },
  { label: "Minimalist", component: MinimalistTemplate },
  { label: "Elegant", component: ElegantTemplate },
  { label: "Creative", component: CreativeTemplate },
];
