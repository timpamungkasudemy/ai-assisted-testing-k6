import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
import { sleep } from 'k6';
import exec from 'k6/execution';
import http from 'k6/http';

// export const options = {
//     vus: 10,
//     duration: '5m',
//     iterations: 50,
// };

export const options = {
    stages: [
        { duration: '5m', target: 1 }, // 1 user at the start
        { duration: '5m', target: 20 }, // 5 minutes after the start, there should be 20 users
        { duration: '8m', target: 40 }, // Every 8 minutes, 20 new users will be added
        { duration: '8m', target: 60 },
        { duration: '8m', target: 80 },
        { duration: '8m', target: 100 }, // Until we have 100 total users
        { duration: '6m', target: 0 }, // Then, after 100 users are achieved, the script should be down and back to 0 users within 6 minutes
    ]
};

export default function () {
    http.get('https://www.google.com');

    const durationInSecond = (exec.instance.currentTestRunDuration / 1000).toFixed(2);

    console.log(`Iteration: ${exec.scenario.iterationInTest}, VU: ${exec.vu.idInTest}, 
    Script has been running for ${durationInSecond} seconds`);

    sleep(randomIntBetween(1, 3));
}