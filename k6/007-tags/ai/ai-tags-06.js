import { check, sleep } from 'k6';
import http from 'k6/http';

// Define BASE_URL
const BASE_URL = 'http://localhost:8888/alphamart';

export let options = {
    thresholds: {
        'checks{check-case:status-is-2xx}': ['rate>=0.99'], // 95% of checks should pass
        'checks{check-case:x-boolean-header-is-true}': ['rate>=0.5'], // 95% of checks should pass
        'checks{check-case:response-body-contains-non-empty-message-field}': ['rate==1'], // 95% of checks should pass
    },
    vus: 20,
    duration: '5s',
};

export default function () {
    // Make a GET request
    let response = http.get(`${BASE_URL}/api/basic/slow-if-error`);

    // Check response status code
    check(response, {
        'Status is 2xx': (r) => r.status >= 200 && r.status < 300
    }, { 'check-case': 'status-is-2xx' });

    // Check "X-Boolean" header value
    check(response, {
        'X-Boolean header is "true"': (r) => r.headers['X-Boolean'] === 'true'
    }, { 'check-case': 'x-boolean-header-is-true' });

    // Check response body field "message"
    check(response, {
        'Response body contains non-empty "message" field': (r) => r.json().message !== ''
    }, { 'check-case': 'response-body-contains-non-empty-message-field' });

    // Sleep for 1 second
    sleep(1);
}