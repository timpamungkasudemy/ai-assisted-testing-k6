import { sleep } from 'k6';
import http from 'k6/http';
import { Trend } from 'k6/metrics';

const BASE_URL = 'http://localhost:8888/alphamart';

let batchResponseTimeTrend = new Trend('batch_response_time', true);

export default function () {
    let customer = {
        'full-name': 'Bruce Wayne',
        'birth-date': '2000-07-19',
        'contacts': [
            {
                'contact-detail': 'bruce.wayne@dc.com',
                'type': 'EMAIL'
            }
        ]
    };

    let postParams = {
        headers: {
            'Content-Type': 'application/json'
        },
    }

    let responses = http.batch(
        [
            ['GET', `${BASE_URL}/api/basic/fast`],
            ['GET', `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-1`],
            ['POST', `${BASE_URL}/api/customer/fake`, JSON.stringify(customer), postParams],
            ['GET', `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-2`],
            ['GET', `${BASE_URL}/api/basic/custom-delay?delay=2000&identifier=custom-delay-3`],
        ]
    );

    // retrieve the longest response time
    let longestResponseTime = Math.max(...responses.map((res) => res.timings.duration));
    batchResponseTimeTrend.add(longestResponseTime);

    sleep(1);
}