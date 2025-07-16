"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, X } from "lucide-react"
// @ts-ignore: Allow importing JSON (requires --resolveJsonModule in tsconfig)
import sampleApiResponse from "@/utils/sampleApiResponse.json"
import axios from "axios"

interface Job {
  id: string
  title: string
  company?: { title?: string; image?: string } | string
  locations?: (string | { city?: string })[]
  location?: { city?: string } | string
  type?: string
  employmentType?: string
  compensation?: string
  description?: string
  department?: string
  url?: string
  requirementsSection?: string
  socialSharingDescription?: string
  datePosted?: string
  experienceLevel?: string
  workType?: string
  [key: string]: any
}

interface SearchFilters {
  query: string
  location: string
  datePosted: string
  employmentType: string
  experienceLevel: string
  workType: string
}

const API_URL = "http://localhost:3000/api/jobs"

function getDayRangeValue(datePosted: string): number {
  switch (datePosted) {
    case "last24hr":
      return 1
    case "lastweek":
      return 7
    case "lastmonth":
      return 30
    case "anytime":
    default:
      return 0
  }
}

function buildApiQueryParams(filters: SearchFilters) {
  // Build query string for API
  const params = new URLSearchParams()

  // Query: join with + for spaces, and encode
  if (filters.query) {
    params.append("query", filters.query.trim().replace(/\s+/g, "+"))
  }

  // Employment type
  if (filters.employmentType && filters.employmentType !== "all") {
    params.append("employment_type", filters.employmentType)
  }

  // Experience level
  if (filters.experienceLevel && filters.experienceLevel !== "all") {
    params.append("experience", filters.experienceLevel)
  }

  // Work type
  if (filters.workType && filters.workType !== "all") {
    params.append("workplace", filters.workType)
  }

  // Day range
  const dayRange = getDayRangeValue(filters.datePosted)
  if (dayRange > 0) {
    params.append("day_range", String(dayRange))
  } else {
    params.append("day_range", "0")
  }

  // Location (optional, not in your example, but included for completeness)
  if (filters.location) {
    params.append("location", filters.location)
  }

  return params.toString()
}

export default function JobAndInternshipPage() {
  const [jobs] = useState<Job[]>(sampleApiResponse.jobs || [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [page, setPage] = useState(1)
  const jobsPerPage = 12

  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    location: "",
    datePosted: "anytime",
    employmentType: "all",
    experienceLevel: "all",
    workType: "all",
  })

  async function QueryApiCall() {
    setLoading(true)
    setError("")
    try {
      const queryString = buildApiQueryParams(filters)
      const url = `${API_URL}?${queryString}`
      // You can use GET or POST as needed. Here, GET is used for query params.
      const response = await axios.get(url)
      // You may want to update jobs state here if you want to use live data
      // setJobs(response.data.jobs)
      console.log("API URL:", url)
      console.log("API Response:", response.data)
    } catch (err: any) {
      setError("Failed to fetch jobs from API.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // On mount, fetch jobs with default filters (or you can skip this)
    // For demo, just log the default query
    // QueryApiCall()
  }, [])

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPage(1) // Reset to first page when filters change
  }

  const clearFilter = (key: keyof SearchFilters) => {
    const defaultValue = key === "query" || key === "location" ? "" : key === "datePosted" ? "anytime" : "all"
    handleFilterChange(key, defaultValue)
  }

  const isDateWithinRange = (datePosted: string | undefined, range: string): boolean => {
    if (!datePosted || range === "anytime") return true

    const jobDate = new Date(datePosted)
    const now = new Date()
    const diffTime = now.getTime() - jobDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    switch (range) {
      case "last24hr":
        return diffDays <= 1
      case "lastweek":
        return diffDays <= 7
      case "lastmonth":
        return diffDays <= 30
      default:
        return true
    }
  }

  const filteredJobs = jobs.filter((job) => {
    // Text search filter
    const matchesQuery =
      !filters.query ||
      job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
      (typeof job.company === "object" &&
        job.company?.title &&
        job.company.title.toLowerCase().includes(filters.query.toLowerCase())) ||
      (Array.isArray(job.locations) &&
        job.locations.some((loc: any) => {
          if (typeof loc === "string") return loc.toLowerCase().includes(filters.query.toLowerCase())
          if (typeof loc === "object" && loc.city) return loc.city.toLowerCase().includes(filters.query.toLowerCase())
          return false
        }))

    // Location filter
    const matchesLocation =
      !filters.location ||
      (Array.isArray(job.locations) &&
        job.locations.some((loc: any) => {
          if (typeof loc === "string") return loc.toLowerCase().includes(filters.location.toLowerCase())
          if (typeof loc === "object" && loc.city)
            return loc.city.toLowerCase().includes(filters.location.toLowerCase())
          return false
        })) ||
      (typeof job.location === "object" &&
        job.location?.city &&
        job.location.city.toLowerCase().includes(filters.location.toLowerCase())) ||
      (typeof job.location === "string" && job.location.toLowerCase().includes(filters.location.toLowerCase()))

    // Date posted filter
    const matchesDate = isDateWithinRange(job.datePosted, filters.datePosted)

    // Employment type filter
    const matchesEmploymentType =
      filters.employmentType === "all" ||
      (job.employmentType && job.employmentType.toLowerCase().includes(filters.employmentType.toLowerCase())) ||
      (job.type && job.type.toLowerCase().includes(filters.employmentType.toLowerCase()))

    // Experience level filter
    const matchesExperience =
      filters.experienceLevel === "all" ||
      (job.experienceLevel && job.experienceLevel.toLowerCase().includes(filters.experienceLevel.toLowerCase()))

    // Work type filter (remote/hybrid/onsite)
    const matchesWorkType =
      filters.workType === "all" ||
      (job.workType && job.workType.toLowerCase().includes(filters.workType.toLowerCase()))

    return (
      matchesQuery && matchesLocation && matchesDate && matchesEmploymentType && matchesExperience && matchesWorkType
    )
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const paginatedJobs = filteredJobs.slice((page - 1) * jobsPerPage, page * jobsPerPage)

  const handlePrev = () => setPage((p) => Math.max(1, p - 1))
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1))

  // Helper to get company image if available
  const getCompanyImage = (company: Job["company"]) => {
    if (typeof company === "object" && company?.image) {
      return company.image
    }
    return null
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.query) count++
    if (filters.location) count++
    if (filters.datePosted !== "anytime") count++
    if (filters.employmentType !== "all") count++
    if (filters.experienceLevel !== "all") count++
    if (filters.workType !== "all") count++
    return count
  }

  return (
    <div
      className="min-h-screen p-4 w-full flex flex-col items-center"
      style={{ fontFamily: "Inter, Segoe UI, sans-serif" }}
    >
      <div className="w-full max-w-6xl mb-6">
        <h1 className="text-3xl font-bold mb-6">Job & Internship Listings</h1>

        {/* Main Search Bar */}
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search jobs by title, company, or skills..."
              value={filters.query}
              onChange={(e) => handleFilterChange("query", e.target.value)}
              className="pl-10 h-12 text-base"
            />
            {filters.query && (
              <button
                onClick={() => clearFilter("query")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Location (city, state, or remote)"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="pl-10 h-12 text-base"
            />
            {filters.location && (
              <button
                onClick={() => clearFilter("location")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Button
            className="h-12 px-8 text-base font-semibold bg-teal-600 hover:bg-teal-700"
            onClick={QueryApiCall}
          >
            Search jobs
          </Button>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Select  value={filters.datePosted} onValueChange={(value) => handleFilterChange("datePosted", value)}>
            <SelectTrigger className="h-12 w-full">
              <SelectValue placeholder="Date posted" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anytime">Anytime</SelectItem>
              <SelectItem value="last24hr">Last 24 hours</SelectItem>
              <SelectItem value="lastweek">Last week</SelectItem>
              <SelectItem value="lastmonth">Last month</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.workType} onValueChange={(value) => handleFilterChange("workType", value)}>
            <SelectTrigger className="h-12 w-full">
              <SelectValue placeholder="Work type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All work types</SelectItem>
              <SelectItem value="onsite">On-site</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.employmentType} onValueChange={(value) => handleFilterChange("employmentType", value)}>
            <SelectTrigger className="h-12 w-full">
              <SelectValue placeholder="Employment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="fulltime">Full time</SelectItem>
              <SelectItem value="parttime">Part time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="temporary">Temporary</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.experienceLevel}
            onValueChange={(value) => handleFilterChange("experienceLevel", value)}
          >
            <SelectTrigger className="h-12 w-full">
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="entry">Entry level</SelectItem>
              <SelectItem value="mid">Mid level</SelectItem>
              <SelectItem value="senior">Senior level</SelectItem>
              <SelectItem value="associate">Associate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters Display */}
        {getActiveFiltersCount() > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-600 mr-2">Active filters:</span>
            {filters.query && (
              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
                Query: {filters.query}
                <button onClick={() => clearFilter("query")} className="ml-1 hover:text-blue-600">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.location && (
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-200">
                Location: {filters.location}
                <button onClick={() => clearFilter("location")} className="ml-1 hover:text-green-600">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.datePosted !== "anytime" && (
              <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-purple-900 dark:text-purple-200">
                Date: {filters.datePosted}
                <button onClick={() => clearFilter("datePosted")} className="ml-1 hover:text-purple-600">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.employmentType !== "all" && (
              <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-orange-900 dark:text-orange-200">
                Type: {filters.employmentType}
                <button onClick={() => clearFilter("employmentType")} className="ml-1 hover:text-orange-600">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.experienceLevel !== "all" && (
              <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-teal-900 dark:text-teal-200">
                Experience: {filters.experienceLevel}
                <button onClick={() => clearFilter("experienceLevel")} className="ml-1 hover:text-teal-600">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.workType !== "all" && (
              <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-indigo-900 dark:text-indigo-200">
                Work: {filters.workType}
                <button onClick={() => clearFilter("workType")} className="ml-1 hover:text-indigo-600">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}
            {getActiveFiltersCount() > 0 && " (filtered)"}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground">Loading jobs...</div>
      ) : error ? (
        <div className="text-center text-destructive">{error}</div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No jobs found matching your criteria. Try adjusting your filters.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-8 w-full max-w-6xl">
            {paginatedJobs.map((job) => {
              const companyImage = getCompanyImage(job.company)
              return (
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
                  <CardHeader className="pb-2 flex flex-row items-center gap-3">
                    {companyImage && (
                      <img
                        src={companyImage || "/placeholder.svg"}
                        alt="Company Logo"
                        className="size-24 rounded-md object-contain border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-800 mr-2"
                        style={{ flexShrink: 0 }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
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
                              .map((loc: any) => (typeof loc === "string" ? loc : loc?.city || ""))
                              .filter(Boolean)
                              .join(", ")
                          : typeof job.location === "object"
                            ? job.location?.city || "N/A"
                            : job.location || "N/A"}
                      </span>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-200 mb-2 line-clamp-3">
                      {job.socialSharingDescription || job.description || "No description available."}
                    </div>
                    <div className="flex justify-end">
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                        View Details →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                className="px-4 py-2 rounded-lg font-semibold bg-transparent"
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
                className="px-4 py-2 rounded-lg font-semibold bg-transparent"
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
            <h2 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">{selectedJob.title}</h2>
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
                    .map((loc: any) => (typeof loc === "string" ? loc : loc?.city || ""))
                    .filter(Boolean)
                    .join(", ")
                : typeof selectedJob.location === "object"
                  ? selectedJob.location?.city || "N/A"
                  : selectedJob.location || "N/A"}
            </div>
            <div className="mb-2 text-base">
              <span className="font-semibold">Type:</span> {selectedJob.employmentType || selectedJob.type || "N/A"}
            </div>
            {selectedJob.compensation && (
              <div className="mb-2 text-base">
                <span className="font-semibold">Compensation:</span> {selectedJob.compensation}
              </div>
            )}
            {selectedJob.department && (
              <div className="mb-2 text-base">
                <span className="font-semibold">Department:</span> {selectedJob.department}
              </div>
            )}
            <div className="mb-4">
              <span className="font-semibold">Description:</span>
              <div
                className="prose prose-sm max-w-none mt-1"
                dangerouslySetInnerHTML={{
                  __html: selectedJob.description || "No description available.",
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
              <a href={selectedJob.url} target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
