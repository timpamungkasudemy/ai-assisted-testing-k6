import http from 'k6/http';

export default function () {
    const response = http.get('https://www.instagram.com');
    console.log('Response status was ' + response.status);
}