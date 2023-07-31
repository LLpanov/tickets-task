import { NextFunction, Request, Response } from 'express';

import { ticketRepository } from '../repositories/index.js';
import { AppError, asyncHandler } from '../utils/index.js';

class TicketController {
  public getTickets = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.id;

    if (!eventId || eventId.length !== 4) {
      return next(new AppError('Invalid eventId. Please provide a valid eventId', 404));
    }

    const ticketData = await ticketRepository.getTickets(eventId);
    if (ticketData.length === 0) {
      return next(new AppError('No available tickets', 404));
    }

    res.status(200).json({
      status: 'success',
      result: ticketData.length,
      data: ticketData,
    });
  });
}


export const ticketController = new TicketController();
