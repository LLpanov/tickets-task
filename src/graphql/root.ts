import { ticketRepository } from '../repositories/index.js'
import { AppError } from '../utils/index.js'

export const resolvers = {
  freeSeats: async ({ eventId }: { eventId: string }) => {
    try {
      return await ticketRepository.getTickets(eventId)
    } catch (error) {
      throw new AppError('Failed to fetch free seats.', 404)
    }
  }
}
