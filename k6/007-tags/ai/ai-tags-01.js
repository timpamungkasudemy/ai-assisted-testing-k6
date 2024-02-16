import { sleep } from 'k6';
import http from 'k6/http';

// Define BASE_URL
const BASE_URL = 'http://localhost:8888/alphamart';

export let options = {
    thresholds: {
        'http_req_duration{expected_response:false}': ['p(95)<3000'],
        'http_req_duration{expected_response:true}': ['p(95)<200'],
        'http_req_duration{status:200}': ['p(95)<200'],
        'http_req_duration{status:202}': ['p(95)<200'],
        'http_req_duration{status:400}': ['p(95)<3000'],
        'http_req_duration{status:403}': ['p(95)<3000'],
        'http_req_duration{status:415}': ['p(95)<3000'],
        'http_req_duration{status:500}': ['p(95)<3000'],
        'http_reqs{status:200}': ['count>1'],
        'http_reqs{status:202}': ['count>1'],
        'http_reqs{status:400}': ['count>1'],
        'http_reqs{status:403}': ['count>1'],
        'http_reqs{status:415}': ['count>1'],
        'http_reqs{status:500}': ['count>1'],

    },
    vus: 20, // Set the number of virtual users to 20
    duration: '5s', // Set the run duration to 5 seconds
};

export default function () {
    // Make a GET request
    let response = http.get(`${BASE_URL}/api/basic/slow-if-error`);

    // Sleep for 1 second
    sleep(1);
}