/* tests for this route:
  POST
  /pet
*/
import request from 'supertest'

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
      expect(body.name).toBe(epoch.toString());
    })
  })
})