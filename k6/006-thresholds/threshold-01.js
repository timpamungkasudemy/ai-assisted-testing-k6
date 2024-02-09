import { sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export let options = {
  thresholds: {
    http_req_failed: ['rate < 0.01'],
    http_req_duration: ['p(95) < 200'],
    iterations: ['count >= 100', 'count <= 500'],
  },
};

export default function () {
  const response = http.get(BASE_URL + '/api/basic/fast');

  sleep(1);
}
