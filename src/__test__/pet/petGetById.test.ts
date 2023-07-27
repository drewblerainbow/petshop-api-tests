/* tests for this route:
  GET
  /pet
*/
import request from 'supertest'
import { mocks } from '../__testUtils__/mocks/apiMocks'

const app = "https://petstore.swagger.io/v2";

// NOTE: this test depends on the id actually existing on the server, so a post is run beforehand
// potentially flaky, a mock of the same test is found below
describe('get valid, available pet id', () => {
  describe('GIVEN petId exists', () => {
    it("Return 200 status, response body should contain the supplied id", async() => {

      // this is a test with an actual live id, fails if db is updated during the run
      let petId = "1";

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

      let response = await request(app).get(`/pet/${petId}`);

      expect(response.statusCode).toBe(200);
      let body = JSON.parse(response.text);
      expect(body.id.toString()).toBe(petId);
    })
  })
})

describe('get valid, available pet id (MOCKED)', () => {
  describe('GIVEN petId exists', () => {
    it("Return 200 status, response body should contain the supplied id", () => {

      // same test as above but mocked to get expected values so it can pass without needed set up
      let petId = "1";
      // let response = await request(app).get(`/pet/${petId}`); <- mocked
      let response = mocks(`/pet/${petId}`);

      expect(response.statusCode).toBe(200);
      let body = response.text;
      expect(body.id.toString()).toBe(petId);
    })
  })
})


describe('get valid, unavailable pet id', () => {
  describe('GIVEN petId does not exist', () => {
    it("Return 404 status, with not found message", async() => {

      let petId = "-1";
      let response = await request(app).get(`/pet/${petId}`);

      expect(response.statusCode).toBe(404);
      let errorBody = JSON.parse(response.text);
      expect(errorBody.code).toBe(1);
      expect(errorBody.message).toBe("Pet not found");
    })
  })
})

describe('get invalid pet id', () => {
  describe('GIVEN petId is non numeric', () => {
    it("Return a 404 status, throw an invalid input string exception", async() => {

      let petId = "asdf";
      let response = await request(app).get(`/pet/${petId}`);
      
      expect(response.statusCode).toBe(404);
      let errorBody = JSON.parse(response.text);
      expect(errorBody.message).toBe(`java.lang.NumberFormatException: For input string: \"${petId}\"`);
    })
  })
})