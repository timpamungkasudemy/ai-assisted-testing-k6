import { check, sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    let res1 = http.get(`${BASE_URL}/api/basic/fast`);
    let res2 = http.get(`${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-1`);

    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    let payload = JSON.stringify({
        "full-name": "Bruce Wayne",
        "birth-date": "2000-07-19",
        "contacts": [
            {
                "contact-detail": "bruce.wayne@dc.com",
                "type": "EMAIL"
            }
        ]
    });

    let res3 = http.post(`${BASE_URL}/api/customer/fake`, payload, { headers: headers });
    let res4 = http.get(`${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-2`);
    let res5 = http.get(`${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-3`);

    check(res1, {
        'status was 2xx': (r) => r.status >= 200 && r.status < 300,
        'transaction time OK': (r) => r.timings.duration < 3000,
    });

    check(res2, {
        'status was 2xx': (r) => r.status >= 200 && r.status < 300,
        'transaction time OK': (r) => r.timings.duration < 3000,
    });

    check(res3, {
        'status was 2xx': (r) => r.status >= 200 && r.status < 300,
        'transaction time OK': (r) => r.timings.duration < 3000,
    });

    check(res4, {
        'status was 2xx': (r) => r.status >= 200 && r.status < 300,
        'transaction time OK': (r) => r.timings.duration < 3000,
    });

    check(res5, {
        'status was 2xx': (r) => r.status >= 200 && r.status < 300,
        'transaction time OK': (r) => r.timings.duration < 3000,
    });

    sleep(1);
}