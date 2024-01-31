import { sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
  let res = http.get(BASE_URL + '/api/basic/echo');

  console.log('Status: ' + res.status);
  console.log('Headers: ' + JSON.stringify(res.headers));
  console.log('Body: ' + res.body);

  sleep(1);
}