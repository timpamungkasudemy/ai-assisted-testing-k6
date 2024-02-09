import { sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';


export let options = {
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(75) < 200'],
        'http_req_duration{expected_response:true}': ['p(75) < 200'],
        'http_req_duration{expected_response:false}': ['p(75) >= 1000'],
    },
};

export default function () {
    const response = http.get(BASE_URL + '/api/basic/slow-if-error');

    sleep(1);
}
