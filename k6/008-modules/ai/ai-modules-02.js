import { check, sleep } from 'k6';
import http from 'k6/http';
import { calculateMonthlyInstallment } from './loan.js';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    const annualInterestRate = (Math.random() * (1.00 - 0.01) + 0.01).toFixed(2);
    const loanAmount = Math.floor(Math.random() * (10000 - 500) + 500);
    const tenureInMonths = Math.floor(Math.random() * (60 - 6) / 6 + 1) * 6;

    const payload = JSON.stringify({
        "annual-interest-rate": annualInterestRate,
        "loan-amount": loanAmount,
        "tenure-in-months": tenureInMonths
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };

    const response = http.post(`${BASE_URL}/api/loan/calculator`, payload, params);
    const expectedMonthlyInstallment = calculateMonthlyInstallment(loanAmount, tenureInMonths, annualInterestRate);

    check(response,
        {
            'response status is 200': (r) => r.status === 200,
        },
        {
            'check-case': 'response-status-is-200'
        }
    );

    check(response,
        {
            'monthly installment is correct': (r) => {
                return Math.abs(r.json()['monthly-installment-amount'] - expectedMonthlyInstallment) < 1;
            },
        },
        {
            'check-case': 'monthly-installment-is-correct'
        }
    );

    sleep(1);
}