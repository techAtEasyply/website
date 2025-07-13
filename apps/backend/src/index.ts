import express from 'express'
import cors from 'cors'
import jobsRouter from './routes/jobs.route'
import interviewRouter from "./routes/interview.route"
import dotenv from 'dotenv'
import { app, server } from './lib/socket';
import { ClerkExpressRequireAuth, clerkClient } from '@clerk/clerk-sdk-node';

dotenv.config();


const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin : 'http://localhost:5173'
}))

app.use('/api/jobs', jobsRouter)
app.use('/api/interview', interviewRouter)

// Protect all routes with ClerkExpressRequireAuth and redirect to frontend sign-in
//@ts-ignore
app.use(ClerkExpressRequireAuth({ signInUrl: 'http://localhost:5173/sign-in' }))

app.get('/', (req, res) => {
  res.send("Hello World")
})


//@ts-ignore
app.get('/api/userinfo', async (req, res) => {
  // Clerk attaches auth info to the request
  //@ts-ignore
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

server.listen(port, () => {
  console.log(`server running on http://localhost:${port}`)
})


