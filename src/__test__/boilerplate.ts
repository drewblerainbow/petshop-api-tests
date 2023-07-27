// boiler plate, not an actual test
/* tests for this route:
  HTTP Method
  /route/?params=p
*/
import supertest from 'supertest'
import {app} from '../app'

describe('template file', () => {
  describe('method 1 (route name)', () => {
    describe('given X/scenario', () => {
      it("expected behaviour", async() => {
        const itemId = "123";
        await supertest(app).get(`/api/boilerPlate/${itemId}`).expect(404); // expcted result here
      })
    })
  })
})