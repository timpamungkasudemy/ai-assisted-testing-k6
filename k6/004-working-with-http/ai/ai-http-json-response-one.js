import { sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    let response = http.get(`${BASE_URL}/api/basic/fast`, {
        headers: { 'Accept': 'application/json' },
    });

    // Convert the response body to a JSON object
    let responseBody = JSON.parse(response.body);

    // Log the value of the "message" field
    console.log(`Message: ${responseBody.message}`);

    sleep(1);
}