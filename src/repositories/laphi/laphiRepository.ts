import { PartialEvent } from '../../types/index.js'
import { IPrice, ISeat, IZones } from '../../interfaces/index.js'
import { laphiService } from '../../api/index.js';
import { ILaphiRepository } from './laphiRepository.interface.js';

class LaphiRepository implements ILaphiRepository{
  public async getEvent(eventId:string): Promise<PartialEvent> {
    return laphiService.getEvent(eventId)
  }

  public async getSeats(eventId: string): Promise<ISeat[]> {
    return laphiService.getSeats(eventId)
  }

  public async getZones(eventId: string): Promise<IZones[]> {
    return laphiService.getZones(eventId)
  }

  public async getPrices(eventId: string): Promise<IPrice[]> {
    return laphiService.getPrices(eventId)
  }
}

export const laphiRepository = new LaphiRepository()
