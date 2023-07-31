import { PartialEvent } from '../../types/index.js';
import { IPrice, ISeat, IZones } from '../../interfaces/index.js';

export interface ILaphiRepository {
  getEvent(eventId: string): Promise<PartialEvent>;
  getSeats(eventId: string): Promise<ISeat[]>;
  getZones(eventId: string): Promise<IZones[]>;
  getPrices(eventId: string): Promise<IPrice[]>;
}
