import axios from 'axios'
import * as cheerio from 'cheerio'

interface Job {
  title: string
  company: string
  location: string
  link: string
}

// Helper to chunk array into smaller arrays of specified size
function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

export const scrapeIndeedJobs = async (
  query: string = 'developer',
  location: string = 'Remote'
): Promise<Job[][]> => {
  const jobs: Job[] = []

  const apiKey = '82abf87b380c028a56b055607f471d60'
  const targetUrl = `https://www.indeed.com/jobs?q=${encodeURIComponent(
    query
  )}&l=${encodeURIComponent(location)}`
  const scraperUrl = `http://api.scraperapi.com?api_key=${apiKey}&url=${encodeURIComponent(
    targetUrl
  )}`

  try {
    const response = await axios.get(scraperUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
      },
    })

    const $ = cheerio.load(response.data)

    $('.resultContent').each((_, el) => {
      const title = $(el).find('h2.jobTitle span').first().text().trim()
      const company = $(el).find('.companyName').text().trim()
      const location = $(el).find('.companyLocation').text().trim()
      const relativeLink = $(el).find('a').attr('href')
      const link = relativeLink ? `https://www.indeed.com${relativeLink}` : ''

      if (title && company && link) {
        jobs.push({ title, company, location, link })
      }
    })

    const chunkedJobs = chunkArray(jobs, 5)
    return chunkedJobs // You get [[{...},{...},...], [{...},...], ...]
  } catch (error) {
    console.error('Error scraping Indeed via ScraperAPI:', error)
    return []
  }
}

export default scrapeIndeedJobs
