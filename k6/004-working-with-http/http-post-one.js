import { sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
  const requestBody = {
    "alias": "Superman",
    "real-name": "Clark Kent",
    "abilities": ["flying", "superhuman strength", "heat vision"]
  };

  const params = {
    headers: {
      'content-type': 'application/json',
    },
  };

  const response = http.post(BASE_URL + "/api/basic/echo", JSON.stringify(requestBody), params);

  console.log("Response status code: " + response.status);
  console.log("Response headers: " + JSON.stringify(response.headers));
  console.log("Response body: " + response.body);

  sleep(1);
}
