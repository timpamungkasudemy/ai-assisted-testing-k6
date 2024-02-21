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

const emails = [
    "john.doe@example.com",
    "jane.smith@example.com",
    "alex.wilson@example.com",
    "emily.johnson@example.com",
    "michael.brown@example.com",
    "sarah.jackson@example.com",
    "david.miller@example.com",
    "laura.davis@example.com",
    "kevin.wilson@example.com",
    "amanda.thomas@example.com",
    "chris.roberts@example.com",
    "jessica.martinez@example.com",
    "ryan.garcia@example.com",
    "melissa.rodriguez@example.com",
    "steven.martinez@example.com",
    "olivia.hernandez@example.com",
    "nathan.lopez@example.com",
    "rebecca.gonzalez@example.com",
    "daniel.young@example.com",
    "angela.hill@example.com"
];

const firstNames = [
    "John",
    "Jane",
    "Alex",
    "Emily",
    "Michael",
    "Sarah",
    "David",
    "Laura",
    "Kevin",
    "Amanda",
    "Chris",
    "Jessica",
    "Ryan",
    "Melissa",
    "Steven",
    "Olivia",
    "Nathan",
    "Rebecca",
    "Daniel",
    "Angela"
];

const lastNames = [
    "Doe",
    "Smith",
    "Wilson",
    "Johnson",
    "Brown",
    "Jackson",
    "Miller",
    "Davis",
    "Wilson",
    "Thomas"
    "Roberts",
    "Martinez",
    "Garcia",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Young",
    "Hill"
];

export default function () {
    // Use the arrays to get random email. Also, randomly generate full name from first name, space, and last name.


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