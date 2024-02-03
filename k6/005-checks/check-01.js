import { check, sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
  const response = http.get(BASE_URL + '/api/basic/fast');

  check(response, {
    'response status code is 2xx': (r) => r.status >= 200 && r.status < 300,
    'response duration < 500ms': (r) => r.timings.duration < 500,
    'response body contains field "message" and is not an empty string':
      (r) => r.body !== '' && r.json.message !== '',
  });

  sleep(1);
}
