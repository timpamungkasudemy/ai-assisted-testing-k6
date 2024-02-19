import { sleep } from 'k6';
import http from 'k6/http';

// Define BASE_URL
const BASE_URL = 'http://localhost:8888/alphamart';

// Define the date 20 years ago
let date = new Date();
date.setFullYear(date.getFullYear() - 20);
let birthDate = date.toISOString().split('T')[0];

// Define variables for contacts and full name
let contactDetail = "";
let fullName = "";

export default function () {
    var payload = JSON.stringify({
        "birth-date": birthDate,
        "contacts": [
            {
                "contact-detail": contactDetail,
                "type": "EMAIL"
            }
        ],
        "full-name": fullName
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };

    http.post(`${BASE_URL}/api/customer/fake`, payload, params);

    // Sleep for 1 second
    sleep(1);
}