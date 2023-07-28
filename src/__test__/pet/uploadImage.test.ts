/* tests for this route:
  POST
  /pet/{petId}/uploadImage
*/
import request from 'supertest'

const fs = require('mz/fs');
const app = "https://petstore.swagger.io/v2";
const route = function(petId: number){
  return `/pet/${petId}/uploadImage`;
}
const postRoute = '/pet'

// NOTE: test with live data
// this test depends on the post method working since it needs to set up before hand
describe('PET-15 - upload an image to an existing pet', () => {
  describe('GIVEN petId exists, upload an image to a pet', () => {
    it("Return 200 status, response message contains the specified file name", async() => {

      const petId = 111;
      const relativeFilePath = "./src/__test__/__testUtils__/resources/Untitled.png";

      // use post to set up since our only access to the server is through the api
      const createPayload = {
        "id": petId,
        "category": {
          "id": petId,
          "name": "string"
        },
        "name": "string",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": petId,
            "name": "string"
          }
        ],
        "status": "available"
      }
      const createResponse = await request(app)
                            .post(postRoute)
                            .send(createPayload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json');
      expect(createResponse.statusCode).toBe(200);
      // expect here to ensure pet is created before we can upload an image to it

      const response = await fs.exists(relativeFilePath).then((exists: boolean)=>{
        if (!exists){
          throw new Error("File not found");
        }
        return request(app)
                .post(route(petId))
                .attach('file', relativeFilePath);
      });
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.text);
      expect(body.message).toContain("File uploaded to ./Untitled.png");
    })
  })
})

describe('PET-16 - no image specified when uploading', () => {
  describe('GIVEN petId exists, call upload method with no attachment', () => {
    it("Return 400 status", async() => {

      const petId = 222;

      // use post to set up since our only access to the server is through the api
      const createPayload = {
        "id": petId,
        "category": {
          "id": petId,
          "name": "string"
        },
        "name": "string",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": petId,
            "name": "string"
          }
        ],
        "status": "available"
      }
      const createResponse = await request(app)
                            .post(postRoute)
                            .send(createPayload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json');
      expect(createResponse.statusCode).toBe(200);
      // expect here to ensure pet is created before we can upload an image to it

      const response = await request(app)
                            .post(route(petId));
      expect(response.statusCode).toBe(415);
      const body = JSON.parse(response.text);
      expect(body.message).toContain("application/octet-stream was not found");
    })
  })
})