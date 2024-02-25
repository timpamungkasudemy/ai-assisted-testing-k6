import { sleep } from 'k6';
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

    const request_3 = {
        method: 'POST',
        url: `${BASE_URL}/api/customer/fake`,
        body: {
            'full-name': 'Bruce Wayne',
            'birth-date': '2000-07-19',
            'contacts': [
                {
                    'contact-detail': 'bruce.wayne@dc.com',
                    'type': 'EMAIL'
                }
            ]
        },
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
        url: `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-2`
    }

    // const response_1 = http.get(request_1.url)
    // const response_2 = http.get(request_2.url)
    const response_3 = http.post(request_3.url, request_3.body, request_3.params)
    // const response_4 = http.get(request_4.url)
    // const response_5 = http.get(request_5.url)

    sleep(1);
}