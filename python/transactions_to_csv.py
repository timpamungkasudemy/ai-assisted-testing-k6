import requests
import csv

BASE_URL = "http://localhost:8080/alphamart"

def is_successful_status(status_code):
    return 200 <= status_code <= 299

def get_consumer_info(member_number):
    url = f'{BASE_URL}/api/v1/consumer?memberNumber={member_number}'
    response = requests.get(url, headers={'accept': 'application/json'})
    if is_successful_status(response.status_code):
        return response.json()
    else:
        raise Exception(f'Error fetching consumer info: {response.status_code}')

def get_transactions(customer_uuid, from_date, to_date):
    url = f'{BASE_URL}/api/v1/transactions/{customer_uuid}?fromDate={from_date}&toDate={to_date}'
    response = requests.get(url, headers={'accept': 'application/json'})
    if is_successful_status(response.status_code):
        return response.json()
    else:
        raise Exception(f'Error fetching transactions: {response.status_code}')

def save_to_csv(data, filename):
    keys = data[0].keys()
    with open(filename, 'w', newline='')  as output_file:
        dict_writer = csv.DictWriter(output_file, keys)
        dict_writer.writeheader()
        dict_writer.writerows(data)

# Request user input
member_number = input("Enter member number: ")
from_date = input("Enter from date (YYYY-MM-DD): ")
to_date = input("Enter to date (YYYY-MM-DD): ")

try:
    consumer_info = get_consumer_info(member_number)
    customer_uuid = consumer_info['customerUuid']
    transactions = get_transactions(customer_uuid, from_date, to_date)
    save_to_csv(transactions, f'transactions-{customer_uuid}.csv')
    print("Data saved successfully.")
except Exception as e:
    print(str(e))
