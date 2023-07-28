/* tests for this route:
  GET
  /store/inventory
*/
import request from 'supertest'

const app = "https://petstore.swagger.io/v2";
const route = "/store/inventory";

describe('STORE-06 - get store inventory', () => {
  describe('GIVEN some store inventory exists', () => {
    it("Return 200 status, body should contain the format specified in the test plan", async() => {

      let response = await request(app).get(route);
      expect(response.statusCode).toBe(200);

      let body = JSON.parse(response.text);
      console.log(body);
      expect(body.available).not.toBe(null);
    })
  })
})