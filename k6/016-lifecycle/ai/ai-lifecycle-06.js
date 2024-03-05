import { randomString } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";
import { check, sleep } from 'k6';
import encoding from 'k6/encoding';
import exec from 'k6/execution';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

const credentials = new Map();
credentials.set('guest', 'GuestPassword')

export function setup() {
    const username = [...credentials.keys()][Math.floor(Math.random() * credentials.size)];
    const password = credentials.get(username);
    const plainCredential = `${username}:${password}`;

    const base64Credential = encoding.b64encode(plainCredential);

    const loginParams = {
        headers: {
            'Authorization': `Basic ${base64Credential}`,
        }
    };

    const resLogin = http.post(`${BASE_URL}/api/auth/login`, null, loginParams);
    const accessToken = resLogin.json('access-token');

    const sku = randomString(8, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
    const productBody = {
        'name': 'Green Tea',
        'price': 3,
        'stock-keeping-unit': sku.toUpperCase(),
        'manufacturer': 'Wings Food',
        'description': 'Dummy product for test',
        'active': true
    }

    const createProductParams = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    }

    const resCreateProduct = http.post(`${BASE_URL}/api/product`, JSON.stringify(productBody), createProductParams);

    if (resCreateProduct.status > 299) {
        exec.test.abort(`Failed to create product: ${resCreateProduct.status} ${resCreateProduct.body}`);
    }

    const data = {
        accessToken: accessToken,
        productUuid: resCreateProduct.json('product-uuid'),
    }

    return data;
}

export default function (data) {
    const params = {
        headers: {
            'Authorization': `Bearer ${data.accessToken}`,
        }
    }

    const resFindProduct = http.get(`${BASE_URL}/api/product/${data.productUuid}`, params);

    // add k6 check to ensure resFindProduct status is 2xx, and the product name is 'Green Tea'
    check(resFindProduct, {
        'status is 2xx': (r) => r.status >= 200 && r.status < 300,
        'product name is Green Tea': (r) => r.json('name') === 'Green Tea',
    });

    sleep(1);
}

export function teardown(data) {
    const params = {
        headers: {
            'Authorization': `Bearer ${data.accessToken}`,
        }
    }

    http.del(`${BASE_URL}/api/product/${data.productUuid}`, null, params);

    const resFindProduct = http.get(`${BASE_URL}/api/product/${data.productUuid}`, params);

    // add k6 check to ensure resFindProduct status is 4xx
    check(resFindProduct, {
        'status is 4xx': (r) => r.status >= 400 && r.status < 500,
    });
}