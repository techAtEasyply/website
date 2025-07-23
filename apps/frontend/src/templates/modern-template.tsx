import React from "react";
import { Experience, Education, TemplateProps } from "./types";

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
