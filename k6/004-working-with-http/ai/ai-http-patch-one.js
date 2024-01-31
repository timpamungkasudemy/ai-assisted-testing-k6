import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
    const headers = { 'Content-Type': 'application/json' };

    const brands = ['Toyota', 'Honda', 'BMW'];
    const colors = ['black', 'grey', 'white'];

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const getRandomModel = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const length = getRandomInt(6, 12);
        let model = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = getRandomInt(0, alphabet.length - 1);
            model += alphabet.charAt(randomIndex);
        }
        return model;
    };

    const getRandomPrice = () => {
        const min = 40000;
        const max = 60000;
        const step = 100;
        const range = (max - min) / step + 1;
        const randomIndex = getRandomInt(0, range - 1);
        return min + randomIndex * step;
    };

    const payload = {
        brand: brands[getRandomInt(0, brands.length - 1)],
        'manufacturing-year': getRandomInt(2020, 2025),
        color: colors[getRandomInt(0, colors.length - 1)],
        model: getRandomModel(),
        price: getRandomPrice(),
    };

    const response = http.patch(BASE_URL + '/api/basic/echo', JSON.stringify(payload), { headers });

    console.log(response.body);
}
