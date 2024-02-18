import { check, sleep } from 'k6';
import http from 'k6/http';
import { Faker } from 'k6/x/faker';

const BASE_URL = 'http://localhost:8888/alphamart';
const faker = new Faker();

export default function () {
    // Define constant "minDate", which is 50 years before today.
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 50);

    // Define constant "maxDate", which is 1 year before today.
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 1);

    // birthDate is golang time.Time object. So we can format it using golang time layout.
    let birthDate = faker.dateRange(minDate, maxDate).format('2006-01-02');
    let contactDetail = faker.email();
    let fullName = faker.firstName() + " " + faker.lastName();

    const payload = JSON.stringify({
        "birth-date": birthDate,
        "contacts": [
            {
                "contact-detail": contactDetail,
                "type": "EMAIL"
            }
        ],
        "full-name": fullName
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };

    const response = http.post(`${BASE_URL}/api/customer/fake`, payload, params);

    // add K6 check to validate response status code is 2xx
    check(response,
        {
            'status is 2xx': (r) => r.status >= 200 && r.status < 300,
        },
        {
            'check-case': 'status-is-2xx'
        }
    );

    // add K6 check to validate response body has field customer-uuid and it is not empty
    check(response,
        {
            'customer-uuid is not empty': (r) => r.json()['customer-uuid'] !== '',
        },
        {
            'check-case': 'customer-uuid-is-not-empty'
        }
    );

    sleep(1);
}