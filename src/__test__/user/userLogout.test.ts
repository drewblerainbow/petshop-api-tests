/* tests for this route:
  GET
  /user/logout
*/
import request from 'supertest'

const app = "https://petstore.swagger.io/v2";
const route = '/user/logout';

describe('USER-09 - log out', () => {
  describe('GIVEN a user is logged in, and tries to log out', () => {
    it("Return 200 status, message should say ok", async() => {

      const response = await request(app).get(route);
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.text);
      expect(body.message).toBe("ok");
    })
  })
})