import exec from 'k6/execution';

export default function () {
    console.log(`Current iteration: ${exec.scenario.iterationInInstance}`);
}