import { sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
  const response = http.get(BASE_URL + '/api/basic/slow');

  sleep(1);
}
