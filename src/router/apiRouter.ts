import { Router } from 'express'
import { ticketRouter } from './ticketRoute.js';

const router = Router()

router.use('/tickets',ticketRouter)

export const  apiRouter =router
