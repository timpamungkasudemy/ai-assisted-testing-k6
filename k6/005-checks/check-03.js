import { check, sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
  const response = http.get(BASE_URL + '/api/customer/fake');

  const eighteenYearsAgo = new Date().setFullYear(new Date().getFullYear() - 18);
  const sixtyFiveYearsAgo = new Date().setFullYear(new Date().getFullYear() - 65);
  const birthDate = new Date(response.json('birth-date'));

  check(response, {
    'status is 2xx': (r) => r.status >= 200 && r.status < 300,
    'response duration < 500ms': (r) => r.timings.duration < 500,
    'birth-date is between 18 to 65 years ago': () => birthDate >= sixtyFiveYearsAgo && birthDate <= eighteenYearsAgo,
    'addresses.type is either HOME or OFFICE': (r) => {
      const addresses = r.json('addresses');
      return addresses.every(address => address.type === 'HOME' || address.type === 'OFFICE');
    },
    'addresses.coordinate is valid': (r) => {
      const coordinates = r.json('addresses.#.coordinate');
      return coordinates.every(coordinate => coordinate.latitude >= -90 && coordinate.latitude <= 90
        && coordinate.longitude >= -180 && coordinate.longitude <= 180);
    },
  });

  sleep(1);
}
