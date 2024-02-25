import { check, sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    let responses = http.batch([
        ['GET', `${BASE_URL}/api/basic/who-am-i`],
        ['GET', `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-1`],
        ['GET', `${BASE_URL}/api/basic/fast`],
        ['GET', `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-2`],
        ['GET', `${BASE_URL}/api/basic/time`],
        ['GET', `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-3`],
    ]);

    // add K6 check to make sure all requests less than 3 seconds
    check(responses, {
        'all requests are less than 3 seconds': (responses) => {
            return responses.every((res) => res.timings.duration < 3000);
        },
    });

    sleep(1);
}