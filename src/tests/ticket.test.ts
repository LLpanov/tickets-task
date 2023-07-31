import test from 'ava'
import supertest from 'supertest';
import app from '../app.js';

const request = supertest(app);
const eventIds = ['1195', '1192', '1196','1193','1191'];

eventIds.forEach((eventId) => {
  test(`should get free seats for eventId ${eventId}`, async (t) => {
    const response = await request.post('/graphql').send({
      query: `
        query {
          freeSeats(eventId: "${eventId}") {
            event
            section
            row
            seatNumber
            price
          }
        }
      `
    });

    t.is(response.status, 200);
    t.truthy(response.body.data.freeSeats);
  });
});
