import { check, sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
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

    let postParams = {
        headers: {
            'Content-Type': 'application/json'
        },
    }

    let responses = http.batch(
        [
            ['GET', `${BASE_URL}/api/basic/fast`],
            ['GET', `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-1`],
            ['POST', `${BASE_URL}/api/customer/fake`, JSON.stringify(customer), postParams],
            ['GET', `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-2`],
            ['GET', `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-3`],
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