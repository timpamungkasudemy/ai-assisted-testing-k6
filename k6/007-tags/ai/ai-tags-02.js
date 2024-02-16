import { sleep } from 'k6';
import http from 'k6/http';

// Define BASE_URL
const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    // Make a GET request
    let response = http.get(`${BASE_URL}/api/basic/slow-if-error`);

    // Sleep for 1 second
    sleep(1);
}