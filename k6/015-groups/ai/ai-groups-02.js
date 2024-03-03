import { randomIntBetween, randomString } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import { check, group, sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    const delayMs = randomIntBetween(10, 1000);
    const customIdentifier = randomString(6);

    group('basic calls', function () {
        const resBasicWhoAmI = http.get(`${BASE_URL}/api/basic/who-am-i`);
        const resBasicTime = http.get(`${BASE_URL}/api/basic/time`);
        const resBasicCustomDelay = http.get(`${BASE_URL}/api/basic/custom-delay?delay=${delayMs}&identifier=${customIdentifier}`);

        check(resBasicWhoAmI, {
            'is-status-2xx': (r) => r.status >= 200 && r.status < 300,
            'is-fast': (r) => r.timings.duration < 250
        })

        check(resBasicTime, {
            'is-status-2xx': (r) => r.status >= 200 && r.status < 300,
            'is-fast': (r) => r.timings.duration < 250
        })

        check(resBasicCustomDelay, {
            'is-status-2xx': (r) => r.status >= 200 && r.status < 300,
            'is-fast': (r) => r.timings.duration < 250
        })
    });

    group('customer calls', function () {
        const requestBody = {
            'full-name': 'Bruce Wayne',
            'birth-date': '2000-07-19',
            'contacts': [
                {
                    'contact-detail': 'bruce.wayne@dc.com',
                    'type': 'EMAIL'
                }
            ]
        }

        const postParams = {
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const resCustomerCreate = http.post(`${BASE_URL}/api/customer/fake`, JSON.stringify(requestBody), postParams);
        const resCustomerRead = http.get(`${BASE_URL}/api/customer/fake`);

        check(resCustomerCreate, {
            'is-status-2xx': (r) => r.status >= 200 && r.status < 300,
            'is-fast': (r) => r.timings.duration < 250
        })

        check(resCustomerRead, {
            'is-status-2xx': (r) => r.status >= 200 && r.status < 300,
            'is-fast': (r) => r.timings.duration < 250
        })
    });

    sleep(1);
}