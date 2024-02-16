import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { check, sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
  const nameToSearch = 'John';
  const url = new URL(`${BASE_URL}/api/customer/fake/search`);
  url.searchParams.append('name', nameToSearch);

  const response = http.get(url.toString());
  const customers = response.json();

  check(customers, {
    'All customers have a full name': (c) => {
      return c.every(customer => customer['full-name']);
    },
    'All full names contain the search string (case-insensitive)': (c) => {
      return c.every(customer => customer['full-name'].toLowerCase().includes(nameToSearch.toLowerCase()));
    }
  });

  sleep(1);
}
