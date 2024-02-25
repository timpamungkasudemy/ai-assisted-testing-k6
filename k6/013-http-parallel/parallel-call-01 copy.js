import { check, sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    const request_1 = {
        method: 'GET',
        url: `${BASE_URL}/api/basic/fast`
    }

    const request_2 = {
        method: 'POST',
        url: `${BASE_URL}/api/basic/customer/fake`,
        body: {
            hello: 'world!',
        },
        params: {
            headers: {
                'Content-Type': 'application/json'
            },
        },
    }

    const request_3 = {
        method: 'GET',
        url: `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-2`
    }

    let responses = http.batch(
        [
            request_1,
            request_2,
            request_3,
            request_4,
        ]
    );

    // add K6 check to make sure all requests less than 3 seconds
    check(responses,
        {
            'all requests are less than 3 seconds': (responses) => {
                return responses.every((res) => res.timings.duration < 3000);
            },
        }
    );

    sleep(1);
}