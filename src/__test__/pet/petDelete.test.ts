/* tests for this route:
  DELETE
  /pet
*/
import request from 'supertest'
import { mocks } from '../__testUtils__/mocks/apiMocks'

const app = "https://petstore.swagger.io/v2";

// NOTE: test with live data
// this test depends on the post method working since it needs to set up before hand
describe('delete a valid pet from the store', () => {
  describe('GIVEN petId exists', () => {
    it("Return 200 status, response body have status 200 and message with the deleted id", async() => {

      let petId = "100";
      let apiKey = "special-key";

      // use post to set up since our only access to the server is through the api
      let payload = {
        "id": petId,
        "category": {
          "id": petId,
          "name": "string"
        },
        "name": "string",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": petId,
            "name": "string"
          }
        ],
        "status": "available"
      }
      let postResponse = await request(app)
                            .post('/pet/')
                            .send(payload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json');
      expect(postResponse.statusCode).toBe(200);
      // expect here to ensure item is created before we can delete it

      let response = await request(app).delete(`/pet/${petId}`)
                                        .set('Authorization', `Bearer ${apiKey}`);

      expect(response.statusCode).toBe(200);
      let body = JSON.parse(response.text);
      expect(body.message).toBe(petId.toString());
    })
  })
})

// same test as above but mocked so it doesnt rely on set up through api
describe('delete a valid pet from the store (MOCKED)', () => {
  describe('GIVEN petId exists', () => {
    it("Return 200 status, response body have status 200 and message with the deleted id", () => {

      // same test as above but mocked to get expected values so it can pass
      let petId = "99";
      let response = mocks(`/pet/${petId}`);

      expect(response.statusCode).toBe(200);
      let body = response.text;
      expect(body.message).toBe(petId.toString());
    })
  })
})

describe('delete an invalid pet from the store', () => {
  describe('GIVEN petId does not exists', () => {
    it("Return 404 status", async() => {

      let petId = "100";
      let apiKey = "special-key";

      let response = await request(app).delete(`/pet/${petId}`)
                                        .set('Authorization', `Bearer ${apiKey}`);

      expect(response.statusCode).toBe(404);
    })
  })
})

// this test does not seem to work as intended, it passes no matter what is put into the api key
// describe('delete a pet, invalid api-key', () => {
//   describe('GIVEN key is not special-key', () => {
//     it("Return 404 status", async() => {

//       let petId = "100";
//       let apiKey = 1231231;

//       let response = await request(app).delete(`/pet/${petId}`)
//                                         .set('Authorization', `Bearer ${apiKey}`);

//       expect(response.statusCode).toBe(404);
//     })
//   })
// })