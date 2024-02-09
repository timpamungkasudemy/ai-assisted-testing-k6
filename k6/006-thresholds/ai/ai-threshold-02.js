import { sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    const url = `${BASE_URL}/api/basic/fast-random`;
    const headers = { 'Accept': 'application/json' };

    const response = http.get(url, { headers });

    sleep(1);
}