import express from 'express'
import cors from 'cors'
import jobsRouter from './routes/jobs.route'
import interviewRouter from "./routes/interview.route"
import dotenv from 'dotenv'
import { app , server } from './lib/socket.js';

dotenv.config();


const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin : 'http://localhost:5173'
}))

app.use('/api/jobs', jobsRouter)
app.use('/api/interview', interviewRouter)

app.get('/', (req, res) => {
  res.send("Hello World")
})

server.listen(port, () => {
  console.log(`server running on http://localhost:${port}`)
})
