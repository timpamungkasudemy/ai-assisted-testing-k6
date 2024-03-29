import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
import { sleep } from 'k6';
import exec from 'k6/execution';
import http from 'k6/http';

export default function () {
    http.get('https://www.google.com');

    const durationInSecond = (exec.instance.currentTestRunDuration / 1000).toFixed(2);

    console.log(`Iteration: ${exec.scenario.iterationInTest}, VU: ${exec.vu.idInTest}, 
    Script has been running for ${durationInSecond} seconds`);

    sleep(randomIntBetween(1, 3));
}