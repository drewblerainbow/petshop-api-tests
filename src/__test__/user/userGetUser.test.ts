/* tests for this route:
  GET
  /user/{username}
*/
import request from 'supertest'

const app = "https://petstore.swagger.io/v2";
const route = function(username:string){
  return `/user/${username}`;
}
const postRoute = "/user"

describe('USER-03 - get user by username', () => {
  describe('GIVEN an existing username is supplied', () => {
    it("Return 200 status, response body should contain the user's details", async() => {

      const testUsername = "testUsername2";
      const password = "password";
      const payload = {
        "id": 0,
        "username": testUsername,
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "password": password,
        "phone": "string",
        "userStatus": 0
      };
      const postResponse = await request(app)
                            .post(postRoute)
                            .send(payload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json');
                            expect(postResponse.statusCode).toBe(200);

      const response = await request(app).get(route(testUsername));
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.text);
      expect(body.username).toContain(testUsername);
    })
  })
})

// this depends on the username not existing in the server,
// usernames are not unique so there is no way to guarantee success outside of a mock
describe('USER-04 - get nonexistent user', () => {
  describe('GIVEN an nonexisting username is supplied', () => {
    it("Return 404 status, response body should contain the message 'User not found'", async() => {

      const testUsername = "asdasfasdaw";
      const response = await request(app).get(route(testUsername));
      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.text);
      expect(body.code).toBe(1);
      expect(body.message).toBe("User not found");
    })
  })
})

// same test as above but mocked
describe('USER-04a - get nonexistent user (MOCKED)', () => {
  describe('GIVEN an nonexisting username is supplied', () => {
    it("Return 404 status, response body should contain the message 'User not found'", async() => {

      const testUsername = "mockUsername";
      const response = await request(app).get(route(testUsername));
      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.text);
      expect(body.code).toBe(1);
      expect(body.message).toBe("User not found");
    })
  })
})