/* tests for this route:
  POST
  /pet
*/
import request from 'supertest'

const app = "https://petstore.swagger.io/v2";
const route = '/pet/';

describe('PET-10 - add a pet to the store', () => {
  describe('GIVEN pet is created with a specified name', () => {
    it("Return 200 status, response body should contain the correct name (in this case the timestamp)", async() => {

      const epoch = Date.now();
      const payload = {
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
      const response = await request(app)
                            .post(route)
                            .send(payload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json');

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.text);
      expect(body.name).toBe(epoch.toString());
    })
  })
})