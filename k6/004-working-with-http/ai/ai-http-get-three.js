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

  // Define the headers
  const headers = {
    'source': 'k6-course-with-ai',
    'multiple-values': ['hello', 'this is', 'my header']
  };

  // Send the GET request with the query parameters and headers
  let res = http.get(url.toString(), { headers });

  console.log('Status: ' + res.status);
  console.log('Headers: ' + JSON.stringify(res.headers));
  console.log('Body: ' + res.body);

  sleep(1);
}