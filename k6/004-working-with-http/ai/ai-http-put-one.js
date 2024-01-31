import http from 'k6/http';

export let options = {
    vus: 3,
    duration: '10s',
};

export default function () {
    var url = 'http://localhost:8888/alphamart/api/basic/echo';
    var headers = {
        'my-header-one': 'value-one',
        'my-header-two': 'value-two',
        'Content-Type': 'application/json',
    };
    var payload = JSON.stringify({
        brand: 'Toyota',
        model: 'Fortuner',
        'manufacturing-year': 2024,
        colors: ['silver', 'black', 'white'],
        available: true,
    });

    var res = http.put(url, payload, { headers: headers });

    console.log('Response status: ' + res.status);
    console.log('Response headers: ' + JSON.stringify(res.headers));
    console.log('Response body: ' + res.body);
}
