import { randomIntBetween, randomString } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import { check, sleep } from 'k6';
import encoding from 'k6/encoding';
import exec from 'k6/execution';
import http from 'k6/http';

// Define BASE_URL
const BASE_URL = 'http://localhost:8888/alphamart';

const credentials = new Map();
credentials.set('administrator', 'AdministratorPassword')
credentials.set('operator.one', 'OperatorOnePassword')
credentials.set('operator.two', 'OperatorTwoPassword')

export default function () {
    // get random credential
    const username = Array.from(credentials.keys())[Math.floor(Math.random() * credentials.size)];
    const password = credentials.get(username);
    const plainCredential = `${username}:${password}`;

    const base64Credential = encoding.b64encode(plainCredential);

    const paramsLogin = {
        headers: {
            'Authorization': `Basic ${base64Credential}`,
        }
    };

    // Make a POST request
    let resLogin = http.post(`${BASE_URL}/api/auth/login`, null, paramsLogin);

    if (resLogin.status !== 200) {
        console.log(`Failed to login with user ${username} and password ${password}`);
        exec.test.abort('Failed to login')
    }

    // Extract access-token from response body
    const accessToken = resLogin.json('access-token');

    // generate random product price and random stock keeping unit
    let price = randomIntBetween(1, 99) + (randomIntBetween(0, 99) / 100);
    let stockKeepingUnit = randomString(5) + randomIntBetween(100, 999);
    let active = Math.random() < 0.5;
    let name = 'product name' + '-' + stockKeepingUnit;
    let manufacturer = 'K6 Manufacturer';
    let description = 'Description for ' + name;

    // Define the product data
    let productData = {
        "name": name,
        "manufacturer": manufacturer,
        "price": price,
        "description": description,
        "stock-keeping-unit": stockKeepingUnit,
        "active": active
    };

    // Define the headers for the request
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    };

    // Make the POST request
    let resCreateProduct = http.post(`${BASE_URL}/api/product`, JSON.stringify(productData), { headers: headers });

    // Check if the product creation was successful
    if (resCreateProduct.status >= 200 && resCreateProduct.status < 300) {
        // Extract the product UUID from the response
        const newProductUUID = resCreateProduct.json('product-uuid');

        // Define the headers for the GET request
        let headersGet = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };

        // Make the GET request
        let resGetProduct = http.get(`${BASE_URL}/api/product/${newProductUUID}`, { headers: headersGet });

        // Check the response
        check(resGetProduct, {
            'status is 2xx': (r) => r.status >= 200 && r.status < 300,
            'stock-keeping-unit is correct': (r) => r.json('stock-keeping-unit') === stockKeepingUnit
        });
    }

    // Sleep for 1 second
    sleep(1);
}