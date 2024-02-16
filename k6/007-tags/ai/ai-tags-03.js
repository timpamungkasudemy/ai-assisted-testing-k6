import { sleep } from 'k6';
import http from 'k6/http';

// Define BASE_URL
const BASE_URL = 'http://localhost:8888/alphamart';

export const options = {
    thresholds: {
        'http_reqs{url:http://localhost:8888/alphamart/api/basic/slow-if-error}': ['count>1'],
        'http_req_duration{url:http://localhost:8888/alphamart/api/basic/slow-if-error}': ['p(95)<3000'],
        'http_reqs{url:http://localhost:8888/alphamart/api/basic/fast-random}': ['count>1'],
        'http_req_duration{url:http://localhost:8888/alphamart/api/basic/fast-random}': ['p(95)<200'],
    },
    vus: 20,
    duration: '5s',
};

export default function () {
    // Make a GET request
    let response = http.get(`${BASE_URL}/api/basic/slow-if-error`);
    let response2 = http.get(`${BASE_URL}/api/basic/fast-random`);

    // Sleep for 1 second
    sleep(1);
}