import express from 'express'
import cors from 'cors'
import jobsRouter from './routes/jobs.route'

const app = express()

app.use(express.json());
app.use(cors({
  origin : 'http://localhost:5173'
}))

app.use('/api/jobs', jobsRouter)
app.get('/', (req, res) => {
  res.send("Hello World")
})


app.listen(3000, () => {
  console.log("server running")
})
