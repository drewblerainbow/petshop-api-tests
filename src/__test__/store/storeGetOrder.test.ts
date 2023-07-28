/* tests for this route:
  GET
  /store/order/{orderId}
*/
import request from 'supertest'

const app = "https://petstore.swagger.io/v2";
const route = function(orderId: number){
  return `/store/order/${orderId}`;
};
const postRoute = '/store/order';

describe('STORE-02 - get an order', () => {
  describe('GIVEN an order exists', () => {
    it("Return 200 status, response body should contain details of the order", async() => {

      let orderId = 9;
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

      let response = await request(app).get(route(orderId));
      expect(response.statusCode).toBe(200);
      let body = JSON.parse(response.text);
      expect(body.id).toBe(orderId);
    })
  })
})

describe('STORE-03 - get a nonexistent order', () => {
  describe('GIVEN an order does not exist', () => {
    it("Return 404 status, response body should contain message with 'Order not found'", async() => {

      let orderId = 100;
      await request(app).delete(route(orderId)); // running delete beforehand to ensure order does not exist

      let response = await request(app).get(route(orderId));
      expect(response.statusCode).toBe(404);
      let body = JSON.parse(response.text);
      expect(body.code).toBe(1);
      expect(body.message).toBe("Order not found");
    })
  })
})