import { Router } from 'express'
import { ticketController } from '../controllers/index.js'

const router = Router()

router.get('/:id', ticketController.getTickets)

export const ticketRouter = router
