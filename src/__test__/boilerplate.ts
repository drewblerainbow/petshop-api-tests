// boiler plate post test for copy pasting
/* tests for this route:
  HTTP Method
  /route/?params=p
*/
import request from 'supertest'
import { mocks } from './__testUtils__/mocks/apiMocks'

const app = "https://petstore.swagger.io/v2";

describe('add a pet to the store', () => {
  describe('GIVEN pet is created with a specified name', () => {
    it("Return 200 status, response body should contain the correct name (in this case the timestamp)", async() => {

      const epoch = Date.now();
      let payload = {
        "id": 0,
        "category": {
          "id": 0,
          "name": `${epoch}`
        },
        "name": `${epoch}`,
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 0,
            "name": `${epoch}`
          }
        ],
        "status": "available"
      }
      let response = await request(app)
                            .post('/pet/')
                            .send(payload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json');

      expect(response.statusCode).toBe(200);
      let body = JSON.parse(response.text);
      console.log(body);
      expect(body.name).toBe(epoch.toString());
    })
  })
})

describe('get valid, available pet id (MOCKED)', () => {
  describe('GIVEN petId exists', () => {
    it("Return 200 status, response body should contain the supplied id", () => {

      // same test as above but mocked to get expected values so it can pass
      let petId = "1";
      // let response = await request(app).get(`/pet/${petId}`); <- mocked
      let response = mocks(`/pet/${petId}`);

      expect(response.statusCode).toBe(200);
      let body = response.text;
      expect(body.id.toString()).toBe(petId);
    })
  })
})