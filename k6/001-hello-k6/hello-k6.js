import http from 'k6/http';

export default function () {
    let url = 'https://www.google.com';
    let response = http.get(url);

    console.log(response.body);
}
