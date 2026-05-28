import express from "express";
import cors from "cors";
import interviewRouter from "./routes/interview.route";
import dotenv from "dotenv";
import { app, server } from "./lib/socket";
import helmet from "helmet";
import morgan from "morgan";
dotenv.config();

const port = process.env.PORT || 3000;
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use("/api/interview", interviewRouter);

app.get("/", (req, res) => {
  res.send("server is up!");
});

server.listen(port, () => {
  console.log(
    `server running on ${process.env.BACKEND_URL || `http://localhost:${port}`}`
  );
});
