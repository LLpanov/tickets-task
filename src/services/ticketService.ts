import { AppError, hashTable } from '../utils/index.js'
import { IEvent, IPrice, ISeat, ITicketData, IZones } from '../interfaces/index.js'
import { laphiRepository } from '../repositories/index.js'

class TicketService {
  public async getTickets(eventId: string) {
    const [eventData, pricesData, zonesData, seatsData] = await this.fetchTicketsData(eventId)
    return this.groupTicketsFields(eventData, pricesData, zonesData, seatsData)
  }

  private async fetchTicketsData(eventId: string): Promise<[IEvent, IPrice[], IZones[], ISeat[]]> {
    return await Promise.all([
      laphiRepository.getEvent(eventId),
      laphiRepository.getPrices(eventId),
      laphiRepository.getZones(eventId),
      laphiRepository.getSeats(eventId)
    ])
  }

  private groupTicketsFields(eventData: IEvent, pricesData: IPrice[], zonesData: IZones[], seatsData: ISeat[]): ITicketData[] {
    const pricesMap = hashTable(pricesData, 'ZoneId')
    const zonesMap = hashTable(zonesData, 'Id')
    const tickets: ITicketData[] = []

    seatsData.forEach((seat) => {
      if (seat.SeatStatusId === 0) {
        const price = pricesMap.get(seat.ZoneId)
        const zoneDescription = zonesMap.get(seat.ZoneId)

        if (!price || !zoneDescription) {
          throw new AppError('doesnt exist price and zone',404)
        }

        const ticket: ITicketData = {
          event: eventData.Description,
          section: zoneDescription.Description,
          row: seat.SeatRow,
          seatNumber: seat.SeatNumber,
          price: price.Price
        }

        tickets.push(ticket)
      }
    })

    return tickets
  }
}

export const ticketService = new TicketService()
