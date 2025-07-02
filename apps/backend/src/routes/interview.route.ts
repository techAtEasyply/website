import express from 'express'
import { evaluate , techInterview  } from '../controllers/interview.controller';

const router = express.Router();

//@ts-ignore
router.post('/evaluate', evaluate)
//@ts-ignore
router.post('/techInterview', techInterview)
//@ts-ignore
// router.post('/nontechInterview', nontechInterview)

export default router;
