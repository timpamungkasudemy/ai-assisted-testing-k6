import { sleep } from 'k6';
import http from 'k6/http';
import { Gauge } from 'k6/metrics';

const BASE_URL = 'http://localhost:8888/alphamart';

let gaugeContentSize = new Gauge('article_content_size');

export default function () {
    // Randomize the "sentence-count" between 10 and 200
    let sentenceCount = Math.floor(Math.random() * 191) + 10;

    let res = http.get(`${BASE_URL}/api/promotion/article?sentence-count=${sentenceCount}`, {
        headers: { 'Accept': 'application/json' },
    });

    // Set the gauge to the content size
    gaugeContentSize.add(res.body.length);

    sleep(1);  // Sleep for 1 second
}