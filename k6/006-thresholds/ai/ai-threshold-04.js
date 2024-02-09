import { check, sleep } from 'k6';
import http from 'k6/http';

// Define BASE_URL
const BASE_URL = 'http://localhost:8888/alphamart';

// Define request parameters
const params = {
    headers: {
        'Accept': 'application/json',
    },
};

// Define request parameter "name"
const name = 'john';

export default function () {
    // Make GET request
    let response = http.get(`${BASE_URL}/api/customer/fake/search?name=${name}`, params);

    // Check if all customers have the field "full-name"
    check(response, {
        'All customers have "full-name" field': (res) => {
            let customers = res.json();
            return customers.every((customer) => customer.hasOwnProperty('full-name'));
        },
    });

    // Check if "full-name" field contains the case-insensitive search string
    check(response, {
        'The "full-name" field contains the search string': (res) => {
            let customers = res.json();
            return customers.some((customer) => customer['full-name'].toLowerCase().includes(name.toLowerCase()));
        },
    });

    // Sleep for 1 second
    sleep(1);
}