import http from 'k6/http';
import exec from 'k6/execution';
import { sleep } from 'k6';
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

// export let options = {
//     vus: 10,
//     duration: '5m',
//     iterations: 50,
// };

export let options = {
    stages: [
        { duration: '3s', target: 4 }, 
        { duration: '5s', target: 4 }, 
        { duration: '2s', target: 0 }, 
    ],
};

export default function () {
    http.get('https://www.google.com');
    
    let durationInSecond = (exec.instance.currentTestRunDuration / 1000).toFixed(2);

    console.log(`Iteration: ${exec.scenario.iterationInTest}, VU: ${exec.vu.idInTest}, 
    Script has been running for ${durationInSecond} seconds`);

    sleep(randomIntBetween(1, 3));
}