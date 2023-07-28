/* tests for this route:
  DELETE
  /store/order/{orderId}
*/
import request from 'supertest'

const app = "https://petstore.swagger.io/v2";
const route = function(orderId: number){
  return `/store/order/${orderId}`;
};
const postRoute = '/store/order';

describe('STORE-04 - delete an existing order', () => {
  describe('GIVEN the order exists', () => {
    it("Return 200 status, with message reflecting the order ID", async() => {

      let orderId = 5;
      // set up to ensure this order exists before deleting
      let payload = {
        "id": orderId,
        "petId": 0,
        "quantity": 1,
        "shipDate": new Date(),
        "status": "placed",
        "complete": true
      };
      let postResponse = await request(app)
                            .post(postRoute)
                            .send(payload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json');
      expect(postResponse.statusCode).toBe(200);

      let deleteResponse = await request(app).delete(route(orderId));
      expect(deleteResponse.statusCode).toBe(200);
      let body = JSON.parse(deleteResponse.text);
      console.log(body);
      expect(body.message).toBe(orderId.toString());
    })
  })
})

describe('STORE-05 - delete a nonexistent order', () => {
  describe('GIVEN the order does not exist', () => {
    it("Return 404 status, with message order not found", async() => {

      let orderId = 999;
      let response = await request(app).delete(route(orderId));

      expect(response.statusCode).toBe(404);
      let body = JSON.parse(response.text);
      expect(body.message).toBe("Order Not Found");
    })
  })
})