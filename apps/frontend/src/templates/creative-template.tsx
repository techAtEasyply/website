import React from "react";
import { TemplateProps, Experience, Education } from "./types";

export function CreativeTemplate({ resumeData }: { resumeData: TemplateProps["resumeData"] }) {
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
