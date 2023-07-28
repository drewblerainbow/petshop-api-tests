/* tests for this route:
  POST
  /user/createWithArray
*/
import request from 'supertest'

const app = "https://petstore.swagger.io/v2";
const route = "/user/createWithArray";

describe('USER-01 - create users with array', () => {
  describe('GIVEN an array of users is supplied', () => {
    it("Return 200 status, with response message ok", async() => {

      const payload = [
        {
          "id": 0,
          "username": "arrayname1",
          "firstName": "string",
          "lastName": "string",
          "email": "string",
          "password": "password",
          "phone": "string",
          "userStatus": 0
        },
        {
          "id": 1,
          "username": "arraynam2",
          "firstName": "string",
          "lastName": "string",
          "email": "string",
          "password": "password",
          "phone": "string",
          "userStatus": 0
        }
      ];
      
      const postResponse = await request(app)
                            .post(route)
                            .send(payload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json');
      expect(postResponse.statusCode).toBe(200);
      const body = JSON.parse(postResponse.text);
      expect(body.code).toBe(200);
      expect(body.message).toBe("ok");
    })
  })
})