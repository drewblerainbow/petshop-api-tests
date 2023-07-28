/* tests for this route:
  GET
  /user/login/?username={username}&password={password}
*/
import request from 'supertest'

const app = "https://petstore.swagger.io/v2";
const route = function(username:string, password:string){
  return `/user/login/?username=${username}&password=${password}`;
}

describe('USER-08 - log in', () => {
  describe('GIVEN a user tries to log in', () => {
    it("Return 200 status, message should contain the logged in message", async() => {

      let username = "testUsername1";
      let password = "password";
      let response = await request(app).get(route(username, password));
      expect(response.statusCode).toBe(200);
      let body = JSON.parse(response.text);
      expect(body.message).toContain("logged in user session");
    })
  })
})