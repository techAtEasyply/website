import React from "react";
import { TemplateProps, Experience, Education } from "./types";

export function MinimalistTemplate({ resumeData }: { resumeData: TemplateProps["resumeData"] }) {
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
