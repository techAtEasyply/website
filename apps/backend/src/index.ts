import express from 'express'
import cors from 'cors'
import jobsRouter from './routes/jobs.route'
import interviewRouter from "./routes/interview.route"
import dotenv from 'dotenv'
import { app , server } from './lib/socket.js';
import scrapeIndeedJobs from './utils/scraper/indeed'
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'
import { clerkClient } from '@clerk/clerk-sdk-node'

dotenv.config();


const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin : 'http://localhost:5173'
}))

app.use('/api/jobs', jobsRouter)
app.use('/api/interview', interviewRouter)

// Protect all routes with ClerkExpressRequireAuth and redirect to frontend sign-in
app.use(ClerkExpressRequireAuth({ signInUrl: 'http://localhost:5173/sign-in' }))

app.get('/', (req, res) => {
  res.send("Hello World")
})

server.listen(port, () => {
  console.log(`server running on http://localhost:${port}`)
})
app.get('/api/userinfo', async (req, res) => {
  // Clerk attaches auth info to the request
  const { userId } = req.auth

  if (!userId) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  // Fetch full user details from Clerk
  const user = await clerkClient.users.getUser(userId)

  // Example: get email
  const email = user.emailAddresses[0]?.emailAddress

  // Now you can use userId/email to find or create a user in your DB
  // Example: findOrCreateUserInDB(userId, email, ...)

  res.json({ userId, email, firstName: user.firstName, lastName: user.lastName })
})

async function scrape() {
  const data = await scrapeIndeedJobs()
  // prod
  console.log(data)
}

app.listen(3000)
