import HttpService from './http.service.js'
import { IEvent, IPrice, ISeat, IZone, IZones } from '../interfaces/index.js'
import { PartialEvent } from '../types/index.js'
import { AppError } from '../utils/index.js'

class LaphiService extends HttpService {
  public async getEvent(eventId: string ): Promise<PartialEvent> {
    const response = await this.get<IEvent>(`/Packages/${eventId}`)
    if (!response || Object.keys(response).length === 0) {
      throw new AppError('Event not found', 404);
    }
    return { Description: response.Description }
  }

  public async getSeats(eventId: string): Promise<ISeat[]> {
    const response = await this.get<ISeat[]>(`/Packages/${eventId}/Seats?constituentId=0&modeOfSaleId=26&packageId=${eventId}`)

    const filteredSeats: ISeat[] = response.map(({ SeatStatusId, SectionId, SeatRow, SeatNumber, ZoneId }: ISeat) => ({
      SeatStatusId,
      SectionId,
      SeatRow,
      SeatNumber,
      ZoneId
    }))

    return filteredSeats
  }

  public async getZones(eventId: string): Promise<IZones[]> {
    const response = await this.get<IZone[]>(`/PriceTypes/Details?modeOfSaleId=26&packageId=${eventId}&sourceId=30885`)

    const zones: IZones[] = response.flatMap((zone) =>
      zone.Zones.map((zone) => ({
        Id: zone.Id,
        Description: zone.Description
      }))
    )

    return zones
  }

  public async getPrices(eventId: string): Promise<IPrice[]> {
    const response = await this.get<IPrice[]>(
      `/Packages/${eventId}/Prices?expandPerformancePriceType=&includeOnlyBasePrice=&modeOfSaleId=26&priceTypeId=&sourceId=30885`
    )

    return response.map((price) => ({
      Price: price.Price,
      ZoneId: price.ZoneId
    }))
  }
}

export const laphiService = new LaphiService()
