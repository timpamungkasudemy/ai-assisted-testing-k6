import { sleep } from 'k6';
import exec from 'k6/execution';
import http from 'k6/http';

const BASE_URL = 'http://localhost:9999/alphamart';

export function setup() {
    let response = http.get(`${BASE_URL}/actuator/health`);
    if (response.status !== 200) {
        exec.test.abort('Failed to verify server health.');
    }
}

export default function () {
    http.get(`${BASE_URL}/api/basic/fast`);

    sleep(1);
}