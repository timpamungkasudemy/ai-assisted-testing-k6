import { sleep } from 'k6';
import http from 'k6/http';

const BASE_URL = 'http://localhost:8888/alphamart';

export default function () {
  const response = http.get(BASE_URL + '/api/customer/fake');

  const fullName = response.json('full-name')
  const allStreetAddresses = response.json('addresses.#.street');
  const firstAddressLatitude = response.json('addresses.0.coordinate.latitude');
  const firstAddressLongitude = response.json('addresses.0.coordinate.longitude');
  const allContacts = response.json('contacts');
  const emailOnly = response.json('contacts.#(type=="EMAIL").contact-detail');

  console.log("fullName: " + fullName);
  console.log("allStreetAddresses: " + allStreetAddresses);
  console.log("firstAddressLatitude: " + firstAddressLatitude);
  console.log("firstAddressLongitude: " + firstAddressLongitude);
  console.log("allContacts: " + JSON.stringify(allContacts));
  console.log("emailOnly: " + emailOnly);

  sleep(1);
}
