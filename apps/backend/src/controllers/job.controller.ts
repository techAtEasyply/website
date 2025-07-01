import { Request, Response } from "express";
import axios from "axios";

export const fetchJobs = async (req: Request, res: Response) => {
  const { query } = req.body;
  try {
    const jobs = await axios.get(`https://jobs.workable.com/api/v1/jobs?query=${query}`)
    console.log(jobs.data.jobs);
    res.status(200).json(jobs.data.jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs" });
  }

};