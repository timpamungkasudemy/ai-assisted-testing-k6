import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
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

// Load JSON data from ./data-customer-fake.json into K6 SharedArray
const customerFake = new SharedArray('customerFakeData', function () {
    return JSON.parse(open('./data-customer-fake.json'));
});

export default function () {
    // Get random customer fake data into email. Generate full name from first name, space, and last name
    const randomIndex = Math.floor(Math.random() * customerFake.length);
    contactDetail = customerFake[randomIndex].email;
    fullName = `${customerFake[randomIndex].firstName} ${customerFake[randomIndex].lastName}`;

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