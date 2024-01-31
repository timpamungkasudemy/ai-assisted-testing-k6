import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
  // Create a new URL object
  const url = new URL(`${BASE_URL}/api/basic/echo`);

  // Append the query parameters
  url.searchParams.append('color', 'yellow');
  url.searchParams.append('month', 'may');
  url.searchParams.append('month', 'june');
  url.searchParams.append('show-detail', 'true');

  // Send the GET request with the query parameters
  let res = http.get(url.toString());

  console.log('Status: ' + res.status);
  console.log('Headers: ' + JSON.stringify(res.headers));
  console.log('Body: ' + res.body);

  sleep(1);
}