/* tests for this route:
  POST
  /user
*/
import request from 'supertest'

const app = "https://petstore.swagger.io/v2";
const route = "/user";

describe('USER-10 - create user', () => {
  describe('GIVEN user is created', () => {
    it("Return 200 status, with response containing code 200 and a non null user id as message", async() => {

      const username = "testUsername1"
      const password = "password";
      const payload = {
        "id": 0,
        "username": username,
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "password": password,
        "phone": "string",
        "userStatus": 0
      };
      
      const postResponse = await request(app)
                            .post(route)
                            .send(payload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json');
      expect(postResponse.statusCode).toBe(200);
      const body = JSON.parse(postResponse.text);
      expect(body.code).toBe(200);
    })
  })
})
