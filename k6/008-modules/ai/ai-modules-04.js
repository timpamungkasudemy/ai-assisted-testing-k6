import { normalDistributionStages } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check, sleep } from 'k6';
import encoding from 'k6/encoding';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

const credentials = new Map();
credentials.set('administrator', 'AdministratorPassword')
credentials.set('operator.one', 'OperatorOnePassword')
credentials.set('operator.two', 'OperatorTwoPassword')

export const options = {
    thresholds: {
        'checks{check-case: response-status-code-2xx}': [
            {
                threshold: 'rate == 1',
                abortOnFail: true,
            }
        ],
    },
    stages: normalDistributionStages(50, 40, 6)
}

export default function () {
    // get random credential
    const username = [...credentials.keys()][Math.floor(Math.random() * credentials.size)];
    const password = credentials.get(username);
    const plainCredential = `${username}:${password}`;

    const base64Credential = encoding.b64encode(plainCredential);

    const params = {
        headers: {
            'Authorization': `Basic ${base64Credential}`,
        }
    };

    let res = http.post(`${BASE_URL}/api/auth/login`, null, params);

    // add a check to ensure the response status code is 2xx
    check(res,
        {
            'response status code is 2xx': (r) => r.status >= 200 && r.status < 300,
        },
        {
            'check-case': 'response-status-code-2xx'
        }
    );

    sleep(1);
}