/* tests for this route:
  PUT
  /pet
*/
import request from 'supertest'

const app = "https://petstore.swagger.io/v2";
const route = '/pet'

describe('PET-14 - update an existing pet', () => {
  describe('GIVEN pet exists with some details, users should be able to update those details', () => {
    it("Return 200 status, response body should contain the updated values", async() => {

      const petId = "88";
      const oldName = "not kurikuri";
      const newName = "kurikuri";
      const oldCategory = "not Pomeranian";
      const newCategory = "Pomeranian";
      const oldTag = "not cute";
      const newTag = "Super Cute";

      // use post to set up since our only access to the server is through the api
      const payload = {
        "id": petId,
        "category": {
          "id": petId,
          "name": oldCategory
        },
        "name": oldName,
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": petId,
            "name": oldTag
          }
        ],
        "status": "available"
      }
      const createResponse = await request(app)
                          .post(route)
                          .send(payload)
                          .set('Content-Type', 'application/json')
                          .set('Accept', 'application/json');

      expect(createResponse.statusCode).toBe(200);
      const createBody = JSON.parse(createResponse.text);
      expect(createBody.name).toBe(oldName);
      expect(createBody.category.name).toBe(oldCategory);
      expect(createBody.tags[0].name).toBe(oldTag);
      // expect here to ensure item is created with "old data" before we can update it

      const updatePayload = {
        "id": petId,
        "category": {
          "id": petId,
          "name": newCategory
        },
        "name": newName,
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": petId,
            "name": newTag
          }
        ],
        "status": "available"
      }
      const response = await request(app)
                            .put(route)
                            .send(updatePayload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json');

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.text);
      // ensure relevant fields are updated
      expect(body.name).toBe(newName);
      expect(body.category.name).toBe(newCategory);
      expect(body.tags[0].name).toBe(newTag);
    })
  })
})