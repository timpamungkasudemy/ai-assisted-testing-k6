import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 10, // number of virtual users
    duration: '30s', // script duration
};

export default function () {
    const res = http.get('https://www.google.com');
    check(res, {
        'status was 200': (r) => r.status == 200,
    });

    console.log(`Iteration: ${__ITER}, VU: ${__VU}, Elapsed Time: ${Date.now() / 1000} seconds`);
    sleep(1);
}