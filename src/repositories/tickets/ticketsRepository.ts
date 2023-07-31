import { ticketService } from '../../services/index.js'
import { ITicketData } from '../../interfaces/index.js'
import { ITicketRepository } from './ticketsRepository.interface.js'

class TicketRepository implements ITicketRepository {
  public async getTickets(eventId: string): Promise<ITicketData[]> {
    return await ticketService.getTickets(eventId)
  }
}

export const ticketRepository = new TicketRepository()
