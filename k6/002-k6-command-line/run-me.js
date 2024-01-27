import http from 'k6/http';

const startTime = new Date();

export default function () {
    const iteration = __ITER;
    const vuId = __VU;

    http.get('https://www.google.com');

    let endTime = new Date();
    let duration = (endTime - startTime);
    let durationInSecond = duration / 1000;

    console.log(`Iteration: ${iteration}, VU: ${vuId}, Script has been running for ${durationInSecond} seconds`);
}