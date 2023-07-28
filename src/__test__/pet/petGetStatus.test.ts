/* tests for this route:
  GET
  /pet/findByStatus/?status={statusParam}
*/
import request from 'supertest'

const app = "https://petstore.swagger.io/v2";
const route = function(petStatus: string){
  return `/pet/findByStatus?status=${petStatus}`;
}
const postRoute = '/pet'

describe('PET-06 - get all available pets', () => {
  describe('GIVEN pets with available exists', () => {
    it("Return 200 status, response body should contain some pets with available status", async() => {

      const petStatus = "available";
      const response = await request(app).get(route(petStatus));

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.text);
      expect(body.length).toBeGreaterThan(0); // num pets returned should be > 0
      // assert only pets with status available are returned
      body.forEach((pet: { status: string; }) => {
        expect(pet.status).toBe(petStatus);
      });
    })
  })
})

describe('PET-07 - get all pending pets', () => {
  describe('GIVEN pets with pending exists', () => {
    it("Return 200 status, response body should contain some pets with pending status", async() => {

      const petStatus = "pending";

      // set up to ensure at least one pet with pending status is present
      const payload = {
        "id": 0,
        "category": {
          "id": 0,
          "name": "test"
        },
        "name": "test",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 0,
            "name": "test"
          }
        ],
        "status": petStatus
      }
      const createResponse = await request(app)
                          .post(postRoute)
                          .send(payload)
                          .set('Content-Type', 'application/json')
                          .set('Accept', 'application/json');
      expect(createResponse.statusCode).toBe(200);   

      const getResponse = await request(app).get(route(petStatus));
      expect(getResponse.statusCode).toBe(200);
      const body = JSON.parse(getResponse.text);
      expect(body.length).toBeGreaterThan(0); // num pets returned should be > 0
      // assert only pets with status pending are returned
      body.forEach((pet: { status: string; }) => {
        expect(pet.status).toBe(petStatus);
      });
    })
  })
})

describe('PET-08 - get all sold pets', () => {
  describe('GIVEN pets with sold exists', () => {
    it("Return 200 status, response body should contain some pets with sold status", async() => {

      const petStatus = "sold";
      const response = await request(app).get(route(petStatus));

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.text);
      expect(body.length).toBeGreaterThan(0); // num pets returned should be > 0
      // assert only pets with status sold are returned
      body.forEach((pet: { status: string; }) => {
        expect(pet.status).toBe(petStatus);
      });
    })
  })
})

describe('PET-09 - get pet with invalid category', () => {
  describe('GIVEN category input is invalid', () => {
    it("Return 200 status, response body should have no pets since this category does not exist", async() => {

      const petStatus = "invalid";
      const response = await request(app).get(route(petStatus));

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.text);
      expect(body.length).toBe(0);
    });
  })
})