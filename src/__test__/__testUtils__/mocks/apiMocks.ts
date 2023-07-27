export const mocks = function(mockedApi){
  switch(mockedApi) {
    case "/pet/find?name=pupo?category=pajaro":
      return {
        "statusCode": 200,
        "text": {
          "id": 0,
          "category": {
            "id": 0,
            "name": "pajaro"
          },
          "name": "pupo",
          "photoUrls": [
            "string"
          ],
          "tags": [
            {
            "id": 0,
            "name": "string"
            }
          ],
          "status": "available"
        }
      };
    case "/pet/1":
      return {
        "statusCode": 200,
        "text": {
          "id": 1,
          "category": {
            "id": 1,
            "name": "string"
          },
          "name": "doggie",
          "photoUrls": [
            "string"
          ],
          "tags": [
            {
              "id": 1,
              "name": "string"
            }
          ],
          "status": "available"
        }
      };
      case "/pet/99":
        return {
          "statusCode": 200,
          "text": {
            "code": 200, 
            "type": "unknown",
            "message": "99"
          }
        };
    default:
      return {
        "statusCode": 404,
        "text": {
          "code": 1,
          "type": "error",
          "message": "Pet not found"
        }
      };
  }
}