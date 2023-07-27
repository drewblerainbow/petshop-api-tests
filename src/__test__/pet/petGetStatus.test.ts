/* tests for this route:
  GET
  /pet/findByStatus/
*/
import request from 'supertest'

const app = "https://petstore.swagger.io/v2";

describe('get all available pets', () => {
  describe('GIVEN pets with available exists', () => {
    it("Return 200 status, response body should contain some pets with available status", async() => {

      let petStatus = "available";
      let response = await request(app).get(`/pet/findByStatus?status=${petStatus}`);

      expect(response.statusCode).toBe(200);
      let body = JSON.parse(response.text);
      expect(body.length).toBeGreaterThan(0); // num pets returned should be > 0
      // assert only pets with status available are returned
      body.forEach((pet: { status: string; }) => {
        expect(pet.status).toBe(petStatus);
      });
    })
  })
})

describe('get all pending pets', () => {
  describe('GIVEN pets with pending exists', () => {
    it("Return 200 status, response body should contain some pets with pending status", async() => {

      let petStatus = "pending";
      let response = await request(app).get(`/pet/findByStatus?status=${petStatus}`);

      expect(response.statusCode).toBe(200);
      let body = JSON.parse(response.text);
      expect(body.length).toBeGreaterThan(0); // num pets returned should be > 0
      // assert only pets with status pending are returned
      body.forEach((pet: { status: string; }) => {
        expect(pet.status).toBe(petStatus);
      });
    })
  })
})

describe('get all sold pets', () => {
  describe('GIVEN pets with sold exists', () => {
    it("Return 200 status, response body should contain some pets with sold status", async() => {

      let petStatus = "sold";
      let response = await request(app).get(`/pet/findByStatus?status=${petStatus}`);

      expect(response.statusCode).toBe(200);
      let body = JSON.parse(response.text);
      expect(body.length).toBeGreaterThan(0); // num pets returned should be > 0
      // assert only pets with status sold are returned
      body.forEach((pet: { status: string; }) => {
        expect(pet.status).toBe(petStatus);
      });
    })
  })
})

describe('get pet with invalid category', () => {
  describe('GIVEN category input is invalid', () => {
    it("Return 200 status, response body should have no pets since this category does not exist", async() => {

      let petStatus = "invalid";
      let response = await request(app).get(`/pet/findByStatus?status=${petStatus}`);

      expect(response.statusCode).toBe(200);
      let body = JSON.parse(response.text);
      expect(body.length).toBe(0);
    });
  })
})