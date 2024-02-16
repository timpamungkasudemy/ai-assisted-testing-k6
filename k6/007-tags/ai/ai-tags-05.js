import { sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export let options = {
    thresholds: {
        'http_reqs{customDelay:none}': ['count > 0'],
        'http_req_duration{customDelay:none}': ['p(95)<500'],
        'http_reqs{customDelay:low}': ['count > 0'],
        'http_req_duration{customDelay:low}': ['p(95)<500'],
        'http_reqs{customDelay:high}': ['count > 0'],
        'http_req_duration{customDelay:high}': ['p(95)<2000'],
    },
    vus: 20,
    duration: '5s',
};

export default function () {
    // HTTP call with no "delay" parameter
    http.get(`${BASE_URL}/api/basic/custom-delay`, { tags: { customDelay: 'none' } });

    // HTTP call with a low "delay" parameter (random number between 100-500)
    let lowDelay = Math.floor(Math.random() * 401) + 100;
    http.get(`${BASE_URL}/api/basic/custom-delay?delay=${lowDelay}`, { tags: { customDelay: 'low' } });

    // HTTP call with a high "delay" parameter (random number between 600-2000)
    let highDelay = Math.floor(Math.random() * 1401) + 600;
    http.get(`${BASE_URL}/api/basic/custom-delay?delay=${highDelay}`, { tags: { customDelay: 'high' } });

    // Sleep for 1 second at the end of the script
    sleep(1);
}