import { sleep } from 'k6';

const startTime = new Date();

export default function () {
    const iteration = __ITER;
    const vuid = __VU;

    let endTime = new Date();
    let duration = (endTime - startTime);
    let durationInSecond = duration / 1000;

    console.log(`Iteration: ${iteration}, Virtual User: ${vuid}, Script has been running for ${durationInSecond} seconds`);

    sleep(1);
}