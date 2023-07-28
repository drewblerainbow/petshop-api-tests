/* tests for this route:
  PUT
  /user/{username}
*/
import request from 'supertest'

const app = "https://petstore.swagger.io/v2";
const route = function(username:string){
  return `/user/${username}`;
}
const postRoute = "/user"

describe('USER-05 - update user details', () => {
  describe('GIVEN user details are updated', () => {
    it("Return 200 status, with the user id as a message", async() => {

      // set up to ensure the user exists
      const username = "testUsername6"
      const postPayload = {
        "id": 0,
        "username": username,
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "password": "password",
        "phone": "string",
        "userStatus": 0
      };
      const postResponse = await request(app)
                                .post(postRoute)
                                .send(postPayload)
                                .set('Content-Type', 'application/json')
                                .set('Accept', 'application/json');
      expect(postResponse.statusCode).toBe(200);
      const postBody = JSON.parse(postResponse.text);
      const userId = postBody.message;
      
      const payload = {
        "id": userId,
        "username": username,
        "firstName": "new name",
        "lastName": "string",
        "email": "string",
        "password": "string",
        "phone": "string",
        "userStatus": 0
      }
      const response = await request(app)
                            .put(route(username))
                            .send(payload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json');
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.text);
      expect(body.code).toBe(200);      
      expect(body.message).toBe(userId);
    })
  })
})
