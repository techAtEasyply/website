import React from "react";
import { TemplateProps } from "./types";

function ArjunTemplate({ resumeData, fontFamily }: TemplateProps) {
  return (
    <div
      style={{
        fontFamily,
        background: "#fff",
        color: "#222",
        padding: 0,
      }}
      className="bg-white text-gray-900 tracking-wide font-serif max-w-3xl mx-auto p-8 shadow-lg rounded-lg mt-8 mb-8"
    >
      {/* Header */}
      <div className="flex flex-col items-center border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-blue-900">
          {resumeData.personalInfo.fullName}
        </h1>
        <div className="mt-2 text-gray-700 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
          {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.phone && resumeData.personalInfo.email && <span>|</span>}
          {resumeData.personalInfo.email && (
            <span>
              <a href={`mailto:${resumeData.personalInfo.email}`} className="text-blue-600 underline">
                {resumeData.personalInfo.email}
              </a>
            </span>
          )}
          {resumeData.personalInfo.website && (
            <>
              <span>|</span>
              <span className="text-blue-600 underline cursor-pointer">
                <a 
                  href={
                    resumeData.personalInfo.website.startsWith("http")
                      ? resumeData.personalInfo.website
                      : `https://${resumeData.personalInfo.website}`
                  }
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2 tracking-tight">Education</h2>
          {resumeData.education.map((edu, idx) => (
            <div className="mb-3" key={idx}>
              <div className="flex justify-between items-center">
                <span className="font-bold">{edu.institution}</span>
                <span className="text-sm text-gray-500">{resumeData.personalInfo.location}</span>
              </div>
              <div className="flex justify-between items-center mt-0.5">
                <span>{edu.degree}</span>
                <span className="text-sm text-gray-500">{edu.year}</span>
              </div>
              {edu.gpa && (
                <div className="ml-1 text-sm text-gray-600">
                  Current CGPA: <span className="font-semibold">{edu.gpa}</span>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xl font-semibold text-blue-800 mb-2 tracking-tight">Experience</h2>
          {resumeData.experience.map((exp, idx) => (
            <div className="mb-3" key={idx}>
              <div className="flex justify-between items-center">
                <span className="font-bold">{exp.position}</span>
                <span className="text-sm text-gray-500">{exp.duration}</span>
              </div>
              {exp.company && (
                <div className="text-sm text-gray-600 mb-1">{exp.company}</div>
              )}
              {exp.description && (
                <ul className="ml-6 list-disc text-sm mt-0.5 text-gray-700 space-y-1">
                  {exp.description.split('\n').map((item, dIdx) => (
                    <li key={dIdx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {resumeData.personalInfo.summary && (
        <section className="mt-5">
          <h2 className="text-xl font-semibold text-blue-800 mb-2 tracking-tight">Projects</h2>
          <div className="mb-1">
            <div className="ml-1 text-sm text-gray-700">
              {resumeData.personalInfo.summary}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xl font-semibold text-blue-800 mb-2 tracking-tight">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-8 text-sm text-gray-700">
            <div>
              <span className="font-semibold">Technical Skills:</span> {resumeData.skills.join(", ")}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// export default ArjunTemplate;
export { ArjunTemplate };