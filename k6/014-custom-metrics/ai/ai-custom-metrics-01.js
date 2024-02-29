import { sleep } from 'k6';
import http from 'k6/http';
import { Counter } from 'k6/metrics';

// Define custom Counter metric
let counterBatchCalls = new Counter('batch_calls');

const BASE_URL = 'http://localhost:8888/alphamart';

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

    // Increment batch calls counter
    counterBatchCalls.add(1);

    sleep(1);
}