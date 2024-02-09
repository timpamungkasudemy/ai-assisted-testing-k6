import { sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export let options = {
    thresholds: {
        // HTTP errors must be less than 1%
        'http_req_failed': ['rate<0.01'],

        // 95% of HTTP requests duration must be below 200 ms
        'http_req_duration': ['p(95)<200'],

        // The test must have been run with at least 100 iterations but no more than 500 iterations
        'iterations': ['count>=100', 'count<=500']
    },
};

export default function () {
    const url = `${BASE_URL}/api/basic/fast`;
    const headers = { 'Accept': 'application/json' };

    const response = http.get(url, { headers });

    sleep(1);
}