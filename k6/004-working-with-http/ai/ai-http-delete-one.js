import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    let url = `${BASE_URL}/api/basic/echo?transaction_id=${uuidv4()}`;
    let res = http.del(url);

    console.log('Response status: ' + res.status);
    console.log('Response headers: ' + JSON.stringify(res.headers));
    console.log('Response body: ' + res.body);

    sleep(1);
}