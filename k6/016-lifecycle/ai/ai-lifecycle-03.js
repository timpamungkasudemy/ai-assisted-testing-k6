console.log('[init] init called');

export function setup() {
    let data = {
        counter: 0
    };

    console.log('[setup] data in setup(): ' + JSON.stringify(data));

    return data;
}

export default function (data) {
    console.log(`[vu-code] data in default(): ` + JSON.stringify(data))
    data.counter++;
}

export function teardown(data) {
    console.log('[teardown] data in teardown(): ' + JSON.stringify(data))
}