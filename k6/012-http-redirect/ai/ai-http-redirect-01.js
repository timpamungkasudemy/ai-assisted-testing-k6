import { randomString } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
import { check, sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    let promotionCode = randomString(6).toUpperCase();
    let res = http.get(`${BASE_URL}/api/promotion/fake/${promotionCode}`);

    // add k6 check to ensure we got a 2xx response
    check(res,
        {
            'response status code is 2xx': (r) => r.status >= 200 && r.status < 300,
        },
        {
            'check-case': 'response-status-code-2xx'
        }
    );

    // add k6 check to ensure the response URL is /html/promotion/detail/{promotionCode}
    check(res,
        {
            'response url is /html/promotion/detail': (r) => {
                console.log(r.url)
                return r.url.includes('/html/promotion/detail/' + promotionCode);
            },
        },
        {
            'check-case': 'response-url'
        }
    );

    sleep(1);
}