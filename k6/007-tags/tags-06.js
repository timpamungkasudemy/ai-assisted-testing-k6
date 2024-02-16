import { check, sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    const response = http.get(`${BASE_URL}/api/basic/slow-if-error`);

    check(response,
        {
            'response status code is 2xx': (r) => r.status >= 200 && r.status < 300,
        },
        {
            'check-case': "response-status-code-2xx"
        }
    );

    check(response,
        {
            'response header X-Boolean is true': (r) => r.headers['X-Boolean'] === 'true',
        },
        {
            'check-case': "response-header-x-boolean-true",
        }
    );

    check(response,
        {
            'response body contains field "message" and is not an empty string':
                (r) => r.body !== '' && r.json.message !== '',
        },
        {
            'check-case': "response-body-message-not-empty"
        }
    );

    sleep(1);
}
