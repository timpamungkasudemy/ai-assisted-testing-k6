import { check, sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    const url = `${BASE_URL}/api/basic/fast-random`; // URL changed here
    const headers = { 'Accept': 'application/json' };

    const response = http.get(url, { headers });

    check(response, {
        'Status is 2xx': (r) => r.status >= 200 && r.status < 300,
        'Response duration is less than 0.5s': (r) => r.timings.duration < 500,
        'Response body is not empty': (r) => r.body.length > 0,
        'Response body has message field': (r) => JSON.parse(r.body).hasOwnProperty('message'),
        'Message field is not empty': (r) => JSON.parse(r.body).message.length > 0,
    });

    sleep(1);
}