import React from "react";
import { TemplateProps, Experience, Education } from "./types";

export function ElegantTemplate({ resumeData }: { resumeData: TemplateProps["resumeData"] }) {
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
