import React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, ChevronDown, Download, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import type { Theme } from "@/components/theme-provider";
import { useResumeStore } from "@/store/useResumeStore";

import {
  FONT_OPTIONS,
  TEMPLATES,
  Experience,
  Education,
  TemplateProps,
} from "./templates";

const API_URL =
  "https://corsproxy.io/?https://jobs.workable.com/api/v1/jobs?query=react";

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
    <div className="min-h-screen bg-background p-4 overflow-x-hidden">
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
                (tpl: {
                  label: string;
                  component: (props: TemplateProps) => React.ReactElement;
                }) => (
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

      <div className="flex flex-col-reverse lg:flex-row gap-6 overflow-x-hidden">
        {/* Tabbed Form Section */}
        <div className="w-full lg:w-1/2 min-h-[500px] flex flex-col items-center min-w-0">
          <Tabs defaultValue="personal" className="w-full max-w-[650px]">
            <TabsList>
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="work">Work Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <Card className="mt-4">
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
            </TabsContent>
            <TabsContent value="work">
              <Card className="mt-4">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Work Experience</CardTitle>
                  <Button onClick={addExperience} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resumeData.experience.map((exp: Experience) => (
                    <div
                      key={exp.id}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "company",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label>Position</Label>
                            <Input
                              value={exp.position}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "position",
                                  e.target.value
                                )
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
                            updateExperience(
                              exp.id,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="education">
              <Card className="mt-4">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Education</CardTitle>
                  <Button onClick={addEducation} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resumeData.education.map((edu: Education) => (
                    <div
                      key={edu.id}
                      className="border rounded-lg p-4 space-y-3"
                    >
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
                                updateEducation(
                                  edu.id,
                                  "degree",
                                  e.target.value
                                )
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
            </TabsContent>
            <TabsContent value="skills">
              <Card className="mt-4">
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
            </TabsContent>
          </Tabs>
        </div>

        {/* Resume Preview */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-4 flex justify-center items-center relative min-h-[297mm] min-w-0">
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
            className="bg-card text-card-foreground rounded-xl shadow-sm pdf-friendly w-full max-w-full box-border overflow-x-auto p-2 lg:max-w-[210mm] lg:p-[32px_40px] lg:h-[297mm]"
            style={{
              fontFamily: fontFamily,
              background: "#fff",
              color: "#111",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "stretch",
            }}
          >
            {templateObj && templateObj.component({ resumeData, fontFamily })}
          </div>
        </div>
      </div>
    </div>
  );
}