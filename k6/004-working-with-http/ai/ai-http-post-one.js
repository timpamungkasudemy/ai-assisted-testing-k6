import http from 'k6/http';

export default function () {
    const url = 'http://localhost:8888/alphamart/api/basic/echo';
    const headers = {
        'my-header': 'hello-there',
        'Content-Type': 'application/json',
    };
    const payload = {
        city: 'Jakarta',
        country: 'Indonesia',
        landmarks: [
            { name: 'Monas', location: 'Central Jakarta' },
            { name: 'Ancol', location: 'North Jakarta' },
        ],
    };

    const response = http.post(url, JSON.stringify(payload), { headers });

    // show http response status code, headers, and body to the console
    console.log(`Response status code: ${response.status}`);
    console.log(`Response headers: ${JSON.stringify(response.headers)}`);
    console.log(`Response body: ${response.body}`);
}
