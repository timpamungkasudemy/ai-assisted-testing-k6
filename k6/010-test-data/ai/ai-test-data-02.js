import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
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

// Load CSV data from ./data-customer-fake.csv into K6 SharedArray using papaparse
const csvData = open('./data-customer-fake.csv').trim();
const customerFake = new SharedArray('customerFakeData', function () {
    return papaparse.parse(csvData, { header: true }).data;
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