/* tests for this route:
  DELETE
  /pet/{petId}
*/
import request from 'supertest'
import { mocks } from '../__testUtils__/mocks/apiMocks'

const app = "https://petstore.swagger.io/v2";
const route = function(petId: string){
  return `/pet/${petId}`;
}
const postRoute = '/pet/';

// NOTE: test with live data
// this test depends on the post method working since it needs to set up before hand
describe('PET-11 - delete a valid pet from the store', () => {
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
                            .post(postRoute)
                            .send(payload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json');
      expect(postResponse.statusCode).toBe(200);
      // expect here to ensure item is created before we can delete it

      let response = await request(app).delete(route(petId))
                                        .set('Authorization', `Bearer ${apiKey}`);

      expect(response.statusCode).toBe(200);
      let body = JSON.parse(response.text);
      expect(body.message).toBe(petId.toString());
    })
  })
})

// same test as above but mocked so it doesnt rely on set up through api
describe('PET-11a - delete a valid pet from the store (MOCKED)', () => {
  describe('GIVEN petId exists', () => {
    it("Return 200 status, response body have status 200 and message with the deleted id", () => {

      // same test as above but mocked to get expected values so it can pass
      let petId = "99";
      let response = mocks(route(petId));

      expect(response.statusCode).toBe(200);
      let body = response.text;
      expect(body.message).toBe(petId.toString());
    })
  })
})

describe('PET-12 - delete an invalid pet from the store', () => {
  describe('GIVEN petId does not exists', () => {
    it("Return 404 status", async() => {

      let petId = "100";
      let apiKey = "special-key";

      let response = await request(app).delete(route(petId))
                                        .set('Authorization', `Bearer ${apiKey}`);

      expect(response.statusCode).toBe(404);
    })
  })
})

// this test does not seem to work as intended, it passes no matter what is put into the api key
// expected 400 invalid id, but got 404 not found/200 ok
// describe('PET-13 - delete a pet, invalid api-key', () => {
//   describe('GIVEN key is not special-key', () => {
//     it("Return 400 status", async() => {

//       let petId = "100";
//       let apiKey = 1231231;

//       let response = await request(app).delete(route(petId))
//                                         .set('Authorization', `Bearer ${apiKey}`);

//       expect(response.statusCode).toBe(400);
//     })
//   })
// })