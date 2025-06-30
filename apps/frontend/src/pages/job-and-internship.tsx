import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// @ts-ignore: Allow importing JSON (requires --resolveJsonModule in tsconfig)
import sampleApiResponse from "@/utils/sampleApiResponse.json";

interface Job {
  id: string;
  title: string;
  company?: { title?: string } | string;
  locations?: (string | { city?: string })[];
  location?: { city?: string } | string;
  type?: string;
  employmentType?: string;
  compensation?: string;
  description?: string;
  department?: string;
  url?: string;
  requirementsSection?: string;
  socialSharingDescription?: string;
  [key: string]: any;
}

const API_URL = "http://localhost:3001/api/jobs";

export default function JobAndInternshipPage() {
  const [jobs] = useState<Job[]>(sampleApiResponse.jobs || []);
  const [loading] = useState(false);
  const [error] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const jobsPerPage = 8;

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      (typeof job.company === "object" &&
        job.company?.title &&
        job.company.title.toLowerCase().includes(search.toLowerCase())) ||
      (Array.isArray(job.locations) &&
        job.locations.some((loc: any) => {
          if (typeof loc === "string")
            return loc.toLowerCase().includes(search.toLowerCase());
          if (typeof loc === "object" && loc.city)
            return loc.city.toLowerCase().includes(search.toLowerCase());
          return false;
        }))
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (page - 1) * jobsPerPage,
    page * jobsPerPage
  );
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));
  // Reset to page 1 on search
  React.useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div
      className="min-h-screen bg-background p-4 flex flex-col items-center"
      style={{ fontFamily: "Inter, Segoe UI, sans-serif" }}
    >
      <div className="w-full max-w-2xl mb-6">
        <h1 className="text-3xl font-bold mb-2">Job & Internship Listings</h1>
        <Input
          placeholder="Search jobs by title, company, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />
      </div>
      {loading ? (
        <div className="text-center text-muted-foreground">Loading jobs...</div>
      ) : error ? (
        <div className="text-center text-destructive">{error}</div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center text-muted-foreground">No jobs found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
            {paginatedJobs.map((job) => (
              <Card
                key={job.id}
                className="cursor-pointer rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-200 bg-white dark:bg-zinc-900 p-6"
                style={{
                  fontFamily: "Inter, Segoe UI, sans-serif",
                  minHeight: 220,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                onClick={() => setSelectedJob(job)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                    {job.title}
                  </CardTitle>
                  <div className="text-base text-gray-500 dark:text-gray-300 font-medium mb-1">
                    {typeof job.company === "object"
                      ? job.company?.title || "Unknown Company"
                      : typeof job.company === "string"
                        ? job.company
                        : "Unknown Company"}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-200">
                      {job.employmentType || job.type || "N/A"}
                    </span>
                    {job.compensation && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-200">
                        {job.compensation}
                      </span>
                    )}
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-800 dark:text-gray-200">
                      {Array.isArray(job.locations)
                        ? job.locations
                            .map((loc: any) =>
                              typeof loc === "string" ? loc : loc?.city || ""
                            )
                            .filter(Boolean)
                            .join(", ")
                        : typeof job.location === "object"
                          ? job.location?.city || "N/A"
                          : job.location || "N/A"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-200 mb-2 line-clamp-3">
                    {job.socialSharingDescription ||
                      job.description ||
                      "No description available."}
                  </div>
                  <div className="flex justify-end">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                      View Details →
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                className="px-4 py-2 rounded-lg font-semibold"
                onClick={handlePrev}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-base font-medium">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                className="px-4 py-2 rounded-lg font-semibold"
                onClick={handleNext}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Modal for job details */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-2"
          style={{ fontFamily: "Inter, Segoe UI, sans-serif" }}
        >
          <div className="bg-white dark:bg-background rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 relative border border-gray-200 dark:border-gray-700">
            <button
              className="absolute top-2 right-2 text-xl text-muted-foreground hover:text-destructive"
              onClick={() => setSelectedJob(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">
              {selectedJob.title}
            </h2>
            <div className="mb-2 text-lg text-gray-500 dark:text-gray-300 font-medium">
              {typeof selectedJob.company === "object"
                ? selectedJob.company?.title || "Unknown Company"
                : typeof selectedJob.company === "string"
                  ? selectedJob.company
                  : "Unknown Company"}
            </div>
            <div className="mb-2 text-base">
              <span className="font-semibold">Location:</span>{" "}
              {Array.isArray(selectedJob.locations)
                ? selectedJob.locations
                    .map((loc: any) =>
                      typeof loc === "string" ? loc : loc?.city || ""
                    )
                    .filter(Boolean)
                    .join(", ")
                : typeof selectedJob.location === "object"
                  ? selectedJob.location?.city || "N/A"
                  : selectedJob.location || "N/A"}
            </div>
            <div className="mb-2 text-base">
              <span className="font-semibold">Type:</span>{" "}
              {selectedJob.employmentType || selectedJob.type || "N/A"}
            </div>
            {selectedJob.compensation && (
              <div className="mb-2 text-base">
                <span className="font-semibold">Compensation:</span>{" "}
                {selectedJob.compensation}
              </div>
            )}
            {selectedJob.department && (
              <div className="mb-2 text-base">
                <span className="font-semibold">Department:</span>{" "}
                {selectedJob.department}
              </div>
            )}
            <div className="mb-4">
              <span className="font-semibold">Description:</span>
              <div
                className="prose prose-sm max-w-none mt-1"
                dangerouslySetInnerHTML={{
                  __html:
                    selectedJob.description || "No description available.",
                }}
              />
            </div>
            {selectedJob.requirementsSection && (
              <div className="mb-4">
                <span className="font-semibold">Skills/Requirements:</span>
                <div
                  className="prose prose-sm max-w-none mt-1"
                  dangerouslySetInnerHTML={{
                    __html: selectedJob.requirementsSection,
                  }}
                />
              </div>
            )}
            <Button
              asChild
              className="w-full mt-2 text-lg font-semibold rounded-lg"
              variant="default"
              onClick={() => window.open(selectedJob.url, "_blank")}
            >
              <a
                href={selectedJob.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
