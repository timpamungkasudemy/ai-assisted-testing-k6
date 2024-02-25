import { randomString } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
import { check, sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    const promotionCode = randomString(6).toUpperCase();

    let res = http.get(`${BASE_URL}/api/promotion/fake/` + promotionCode);

    // add k6 check to ensure we got a 3xx response
    check(res,
        {
            'response status code is 3xx': (r) => r.status >= 300 && r.status < 400,
        },
        {
            'check-case': 'response-status-code-3xx'
        }
    );

    // add k6 check to ensure that HTTP response header "Location" is present and pointing to /html/promotion/detail/{promotionCode}
    check(res,
        {
            'response header "Location" is /html/promotion/detail': (r) => {
                console.log(r.headers);
                return r.headers['Location'].includes('/html/promotion/detail/' + promotionCode);
            },
        },
        {
            'check-case': 'response-header-location'
        }
    );

    sleep(1);
}