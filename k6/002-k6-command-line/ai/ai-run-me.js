import { sleep } from 'k6';
import exec from 'k6/execution';
import http from 'k6/http';

const testStart = new Date();

export default function () {
    const res = http.get('https://www.google.com');

    const testDuration = (new Date() - testStart) / 1000; // in seconds
    testDuration = Math.round((testDuration + Number.EPSILON) * 100) / 100; // round to 2 decimal places

    console.log(`Iteration: ${exec.scenario.iterationInTest}`);
    console.log(`VU ID: ${exec.vu.idInTest}`);
    console.log(`Test duration: ${testDuration} seconds`);

    sleep(1);
}