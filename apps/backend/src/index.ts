import express from 'express'
import scrapeIndeedJobs from './utils/scraper/indeed'

const app = express()

app.get('/', (req, res) => {
  res.send('hello')
})

async function scrape() {
  const data = await scrapeIndeedJobs()
  // prod
  console.log(data)
}

app.listen(3000)
