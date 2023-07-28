/* tests for this route:
  **this is not an actual route supplied by the petstore, it is here to meet the requirement:
  "Buyer can check available pets named “pupo” with category name “pajaro” and place an order for a pet"
  
  GET
  /pet/find
*/
import { mocks } from '../__testUtils__/mocks/apiMocks'

const app = "https://petstore.swagger.io/v2";

describe('PET-01 - find by name and category', () => {
  describe('GIVEN 1 pet with name "pupo" and category "pajaro" exists', () => {
    it("Return 200 status, response body should contain the supplied name and category", () => {

      let petName = "pupo";
      let petCategory = "pajaro";
      // let response = await request(app).get(`/pet/find?name=${petName}?category=${petCategory}`); <- mock
      let response = mocks(`/pet/find?name=${petName}&category=${petCategory}`);

      expect(response.statusCode).toBe(200);
      let body = response.text;
      expect(body.name).toBe(petName);
      expect(body.category.name).toBe(petCategory);
    })
  })
})

describe('PET-02 - find by category, no pet exists', () => {
  describe('GIVEN no pets in this category exist', () => {
    it("Return 404 status, with not found message", () => {

      let petCategory = "human";
      // let response = await request(app).get(`/pet/find?category=${petCategory}`); <- mocked
      let response = mocks(`/pet/find?category=${petCategory}`);

      expect(response.statusCode).toBe(404);
      let errorBody = response.text;
      expect(errorBody.code).toBe(1);
      expect(errorBody.message).toBe("Pet not found");
    })
  })
})