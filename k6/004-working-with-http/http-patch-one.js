import { sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
  const requestBody = `
    This is a multi-line string.
    This is the second line.
    This is the third line.
  `;

  const params = {
    headers: {
      'content-type': 'text/plain',
    },
  };

  const response = http.patch(BASE_URL + "/api/basic/echo", requestBody, params);

  console.log("Response status code: " + response.status);
  console.log("Response headers: " + JSON.stringify(response.headers));
  console.log("Response body: " + response.body);

  sleep(1);
}
