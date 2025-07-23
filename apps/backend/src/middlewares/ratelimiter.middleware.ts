import ratelimiter from 'express-rate-limit';
const limiter = ratelimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max:10,
  message: "Too many requests, please try again later."
  
});

export default limiter;