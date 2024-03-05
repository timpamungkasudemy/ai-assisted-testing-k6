import { check, sleep } from 'k6';
import encoding from 'k6/encoding';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

const credentials = new Map();
credentials.set('guest', 'GuestPassword')

export function setup() {
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
    let data = {
        accessToken: res.json('access-token'),
    }

    return data;
}

export default function (data) {
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${data.accessToken}`,
    };

    const params = {
        headers: headers,
    };

    let res = http.get(`${BASE_URL}/api/product/search?name=chocolate`, params);

    // add a K6 check to ensure the HTTP response status code is 2xx and the JSON field `data` is not an empty array.
    check(res, {
        'is status 200': (r) => r.status === 200,
        'is not empty': (r) => r.json('data').length > 0,
    });

    sleep(1)
}