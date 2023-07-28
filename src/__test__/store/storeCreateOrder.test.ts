/* tests for this route:
  POST
  /store/order/
*/
import request from 'supertest'

const app = "https://petstore.swagger.io/v2";
const route = "/store/order"

describe('STORE-01 - place an order for a pet', () => {
  describe('GIVEN the order exists', () => {
    it("Return 200 status, with response reflecting the order ID and the specified status", async() => {

      let orderId = 1;
      let orderStatus = "placed";
      let payload = {
        "id": orderId,
        "petId": 0,
        "quantity": 1,
        "shipDate": new Date(),
        "status": orderStatus,
        "complete": true
      };
      
      let postResponse = await request(app)
                            .post(route)
                            .send(payload)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json');
      expect(postResponse.statusCode).toBe(200);
      let body = JSON.parse(postResponse.text);
      expect(body.id).toBe(orderId);
      expect(body.status).toBe(orderStatus);
    })
  })
})
