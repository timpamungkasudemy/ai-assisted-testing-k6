import { sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
  const params = {
    headers: {
      'my-header-one': 'hello',
      'my-header-two': 'world',
    },
  };

  const response = http.del(BASE_URL + "/api/basic/echo?user-id=9090", null, params);

  console.log("Response status code: " + response.status);
  console.log("Response headers: " + JSON.stringify(response.headers));
  console.log("Response body: " + response.body);

  sleep(1);
}
