/* tests for this route:
  GET
  /pet
*/
import request from 'supertest'

const app = "https://petstore.swagger.io/v2";
// todo mocks

describe('positive workflow', () => {
  describe('GIVEN petId exists', () => {
    it("Return 200 status, response body should be contain the supplied id", async() => {

      // this is a test with an actual live id
      let petId = "9223372036854739000";
      let response = await request(app).get(`/pet/${petId}`);

      expect(response.statusCode).toBe(200);
      let body = JSON.parse(response.text);
      expect(body.id.toString()).toBe(petId);
    })
  })
})

describe('negative workflow: non existent id', () => {
  describe('GIVEN petId does not exist', () => {
    it("Return 404 status, with not found message", async() => {

      let petId = "-1";
      let response = await request(app).get(`/pet/${petId}`);

      expect(response.statusCode).toBe(404);
      let errorBody = JSON.parse(response.text);
      expect(errorBody.message).toBe("Pet not found");
    })
  })
})

describe('negative workflow: invalid id', () => {
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