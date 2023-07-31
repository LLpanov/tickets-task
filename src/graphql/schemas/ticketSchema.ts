import { buildSchema } from 'graphql'

export const ticketSchema = buildSchema(`
  type FreeSeats {
    event: String
    section: String
    row: String
    seatNumber: String
    price: Int
  }
  
  type Query {
    freeSeats(eventId: String!): [FreeSeats]
  }
`)
