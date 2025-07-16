import { Request, Response } from "express";
import axios from "axios";

export const fetchJobs = async (req: Request, res: Response) => {
  // Accept query params from the frontend (req.query)
  const {
    employment_type,
    experience,
    workplace,
    day_range,
    query,
    location,
  } = req.query;

  // Build the query string for the external API
  const params = new URLSearchParams();

  if (query) params.append("query", String(query));
  if (employment_type) params.append("employment_type", String(employment_type));
  if (experience) params.append("experience", String(experience));
  if (workplace) params.append("workplace", String(workplace));
  if (day_range) params.append("day_range", String(day_range));
  if (location) params.append("location", String(location));

  try {
    const jobs = await axios.get(
      `https://jobs.workable.com/api/v1/jobs?${params.toString()}`
    );
    console.log(jobs.data.jobs);
    res.status(200).json(jobs.data.jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
};