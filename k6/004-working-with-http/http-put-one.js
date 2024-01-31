import { sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
  const requestBody = `
  {
    "name": "Jakarta",
    "country": "Indonesia",
    "coordinate": {
      "latitude": -6.2088,
      "longitude": 106.8456
    }
  }
  `;

  const params = {
    headers: {
      'content-type': 'application/json',
    },
  };

  const response = http.put(BASE_URL + "/api/basic/echo", requestBody, params);

  console.log("Response status code: " + response.status);
  console.log("Response headers: " + JSON.stringify(response.headers));
  console.log("Response body: " + response.body);

  sleep(1);
}
