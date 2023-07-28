/* tests for this route:
  DELETE
  /user/{username}
*/
import request from 'supertest'
import { mocks } from '../__testUtils__/mocks/apiMocks'

const app = "https://petstore.swagger.io/v2";
const route = function(username: string){
  return `/user/${username}`
};
const postRoute = "/user";

describe('USER-06 - delete user', () => {
  describe('GIVEN an existing user is deleted', () => {
    it("Return 200 status, with response message containing the deleted username", async() => {

      let username = "testUsername3"
      // set up to ensure the user exists
      let payload = {
        "id": 0,
        "username": username,
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "password": "password",
        "phone": "string",
        "userStatus": 0
      };
      let postResponse = await request(app)
                            .post(postRoute)
                            .send(payload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json');
      expect(postResponse.statusCode).toBe(200);
      
      let response = await request(app).delete(route(username));
      expect(response.statusCode).toBe(200);
      let body = JSON.parse(response.text);
      expect(body.code).toBe(200);
      expect(body.message).toBe(username);
    })
  })
})

// this depends on the username not existing in the server,
// usernames are not unique so there is no way to guarantee success outside of a mock
describe('USER-07 - delete nonexistent user', () => {
  describe('GIVEN an invalid user is deleted', () => {
    it("Return 404 not found", async() => {

      let username = "asdafasdasdsa"
      let response = await request(app).delete(route(username));
      expect(response.statusCode).toBe(404);
    })
  })
})

// same test as above but mocked
describe('USER-07a - delete nonexistent user (MOCKED)', () => {
  describe('GIVEN an invalid user is deleted', () => {
    it("Return 404 not found", () => {

      let username = "mockUsername"
      let response = mocks(route(username));
      expect(response.statusCode).toBe(404);
    })
  })
})

