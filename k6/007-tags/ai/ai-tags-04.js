import { check, sleep } from 'k6';
import http from 'k6/http';

// Define BASE_URL
const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    // Make a GET request
    let response = http.get(`${BASE_URL}/api/basic/slow-if-error`);

    // Check response status code
    check(response, {
        'Status is 2xx': (r) => r.status >= 200 && r.status < 300
    });

    // Check "X-Boolean" header value
    check(response, {
        'X-Boolean header is "true"': (r) => r.headers['X-Boolean'] === 'true'
    });

    // Check response body field "message"
    check(response, {
        'Response body contains non-empty "message" field': (r) => r.json().message !== ''
    });

    // Sleep for 1 second
    sleep(1);
}