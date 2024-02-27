import { check, sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    const request_1 = {
        method: 'GET',
        url: `${BASE_URL}/api/basic/fast`
    }

    const request_2 = {
        method: 'GET',
        url: `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-1`
    }

    let customer = {
        'full-name': 'Bruce Wayne',
        'birth-date': '2000-07-19',
        'contacts': [
            {
                'contact-detail': 'bruce.wayne@dc.com',
                'type': 'EMAIL'
            }
        ]
    };

    const request_3 = {
        method: 'POST',
        url: `${BASE_URL}/api/customer/fake`,
        body: JSON.stringify(customer),
        params: {
            headers: {
                'Content-Type': 'application/json'
            },
        },
    }

    const request_4 = {
        method: 'GET',
        url: `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-2`
    }

    const request_5 = {
        method: 'GET',
        url: `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-3`
    }

    let responses = http.batch(
        [
            request_1,
            request_2,
            request_3,
            request_4,
            request_5,
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