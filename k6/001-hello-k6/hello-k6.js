import http from 'k6/http';

export default function () {
    const url = 'https://www.google.com';
    const response = http.get(url);

    console.log(response.body);
}
