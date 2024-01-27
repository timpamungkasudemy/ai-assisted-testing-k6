import http from 'k6/http';
import { sleep } from 'k6';
import exec from 'k6/execution';

let testStart = new Date();

export default function () {
    let res = http.get('https://www.google.com');

    let testDuration = (new Date() - testStart) / 1000; // in seconds
    testDuration = Math.round((testDuration + Number.EPSILON) * 100) / 100; // round to 2 decimal places

    console.log(`Iteration: ${exec.scenario.iterationInTest}`);
    console.log(`VU ID: ${exec.vu.idInTest}`);
    console.log(`Test duration: ${testDuration} seconds`);

    sleep(1);
}