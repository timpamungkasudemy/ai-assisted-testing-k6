import { sleep } from 'k6';
import http from 'k6/http';
import { Rate } from 'k6/metrics';

// Define the custom metric
let errorRate = new Rate('custom_error');

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
            ['GET', `${BASE_URL}/api/basic/fast-random`],
            ['POST', `${BASE_URL}/api/customer/fake`, JSON.stringify(customer), postParams],
            ['GET', `${BASE_URL}/api/basic/fast-random`],
            ['GET', `${BASE_URL}/api/basic/fast-random`],
        ]
    );

    // Iterate over the responses
    for (let res of responses) {
        // Check if the status code is 4xx or 5xx
        if (res.status >= 400 && res.status < 600) {
            errorRate.add(true);
        }
        else {
            errorRate.add(false);
        }
    }

    sleep(1);
}