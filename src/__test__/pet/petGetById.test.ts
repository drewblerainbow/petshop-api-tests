/* tests for this route:
  GET
  /pet/{petId}
*/
import request from 'supertest'
import { mocks } from '../__testUtils__/mocks/apiMocks'

const app = "https://petstore.swagger.io/v2";
const route = function(petId: any){
  return `/pet/${petId}`;
};
const postRoute = '/pet'

// NOTE: this test depends on the id actually existing on the server, so a post is run beforehand
// potentially flaky, a mock of the same test is found below
describe('PET-03 - get valid, available pet id', () => {
  describe('GIVEN petId exists', () => {
    it("Return 200 status, response body should contain the supplied id", async() => {

      // this is a test with an actual live id, fails if db is updated during the run
      const petId = "77777";

      // use post to set up since our only access to the server is through the api
      const payload = {
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
      const postResponse = await request(app)
                            .post(postRoute)
                            .send(payload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json');
      expect(postResponse.statusCode).toBe(200);
      // expect here to ensure item is created before we can delete it

      const response = await request(app).get(route(petId));
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.text);
      expect(body.id.toString()).toBe(petId);
    })
  })
})

describe('PET-03a - get valid, available pet id (MOCKED)', () => {
  describe('GIVEN petId exists', () => {
    it("Return 200 status, response body should contain the supplied id", () => {

      // same test as above but mocked to get expected values so it can pass without needed set up
      const petId = "1";
      // const response = await request(app).get(route(petId)); <- mocked
      const response = mocks(route(petId));

      expect(response.statusCode).toBe(200);
      const body = response.text;
      expect(body.id.toString()).toBe(petId);
    })
  })
})


describe('PET-04 - get valid, unavailable pet id', () => {
  describe('GIVEN petId does not exist', () => {
    it("Return 404 status, with not found message", async() => {

      const petId = "-1";
      const response = await request(app).get(route(petId));

      expect(response.statusCode).toBe(404);
      const errorBody = JSON.parse(response.text);
      expect(errorBody.code).toBe(1);
      expect(errorBody.message).toBe("Pet not found");
    })
  })
})

describe('PET-05 - get invalid pet id', () => {
  describe('GIVEN petId is non numeric', () => {
    it("Return a 404 status, throw an invalid input string exception", async() => {

      const petId = "asdf";
      const response = await request(app).get(route(petId));
      
      expect(response.statusCode).toBe(404);
      const errorBody = JSON.parse(response.text);
      expect(errorBody.message).toBe(`java.lang.NumberFormatException: For input string: \"${petId}\"`);
    })
  })
})