import { check, sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    const customer = {
        'full-name': 'Bruce Wayne',
        'birth-date': '2000-07-19',
        'contacts': [
            {
                'contact-detail': 'bruce.wayne@dc.com',
                'type': 'EMAIL'
            }
        ]
    };

    const postParams = {
        headers: {
            'Content-Type': 'application/json'
        },
    }

    const requests = {
        'first-request': `${BASE_URL}/api/basic/fast`,
        'second-request': `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-1`,
        'third-request': {
            method: 'POST',
            url: `${BASE_URL}/api/customer/fake`,
            body: JSON.stringify(customer),
            params: postParams,
        },
        'fourth-request': `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-2`,
        'fifth-request': `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-3`,
    }

    const responses = http.batch(requests);

    // add K6 check to make sure all keys within 'responses' return 2xx with the duration of less than 3 seconds
    for (let key in responses) {
        check(responses[key],
            {
                [`${key} returning status code 2xx`]: (res) => {
                    return res.status >= 200 && res.status < 300
                },
                [`${key} is less than 3 seconds`]: (res) => {
                    return res.timings.duration < 3000
                },
            }
        );
    }

    sleep(1);
}