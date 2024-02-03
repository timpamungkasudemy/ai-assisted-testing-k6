import { check, sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    const url = `${BASE_URL}/api/customer/fake`;
    const headers = { 'Accept': 'application/json' };

    const response = http.get(url, { headers });

    check(response, {
        'Response status code is 2xx': (r) => r.status >= 200 && r.status < 300,
        'Response duration is less than 0.5s': (r) => r.timings.duration < 500,
        'Birth date is between 18 and 65 years ago': (r) => {
            const body = JSON.parse(r.body);
            const birthDate = new Date(body['birth-date']);
            const currentDate = new Date();
            const age = currentDate.getFullYear() - birthDate.getFullYear();
            return age >= 18 && age <= 65;
        },
        'All addresses have type HOME or OFFICE': (r) => {
            const body = JSON.parse(r.body);
            return body.addresses.every(address => ['HOME', 'OFFICE'].includes(address.type));
        },
        // Add a k6 check to validate that all addresses on array "addresses" have valid latitude and longitude.
        'All addresses have valid latitude and longitude': (r) => {
            const body = JSON.parse(r.body);
            return body.addresses.every(address => address.coordinate.latitude >= -90 && address.coordinate.latitude <= 90
                && address.coordinate.longitude >= -180 && address.coordinate.longitude <= 180);
        },
    });

    sleep(1);
}
