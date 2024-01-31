import { sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
  const params = {
    headers: {
      'source': 'k6-course',
      'multiple-values': ['hello', 'this is', 'my header']
    }
  }

  const response = http.get(`${BASE_URL}/api/basic/echo?color=blue&month=january&month=february&amount=1000`, params);

  console.log("Response status code: " + response.status);
  console.log("Response headers: " + JSON.stringify(response.headers));
  console.log("Response body: " + response.body);

  sleep(1);
}
