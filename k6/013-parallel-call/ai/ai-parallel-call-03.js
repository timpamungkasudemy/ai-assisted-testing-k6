import { check, sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    let responses = http.batch(
        [
            `${BASE_URL}/api/basic/fast`,
            `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-1`,
            `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-2`,
            `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-3`,
        ]
    );

    // add K6 check to make sure all requests returning 2xx with duration less than 3 seconds
    check(responses,
        {
            'all requests returning status code 2xx': (responses) => {
                return responses.every(
                    (res) => res.status >= 200 && res.status < 300
                );
            },
            'all requests are less than 3 seconds': (responses) => {
                return responses.every(
                    (res) => res.timings.duration < 3000
                );
            },
        }
    );

    sleep(1);
}