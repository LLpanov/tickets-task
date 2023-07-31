import { ITicketData } from '../../interfaces/index.js'

export interface ITicketRepository {
  getTickets(eventId: string): Promise<ITicketData[]>
}
