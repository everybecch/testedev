import requests
from bs4 import BeautifulSoup
import json
import sys
import mysql.connector

def get_currency_data_from_wikipedia(code_or_number):
    url = 'https://pt.wikipedia.org/wiki/ISO_4217'
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        table = soup.find('table', {'class': 'wikitable'})
        currency_data = []

        for row in table.find_all('tr')[1:]:
            columns = row.find_all('td')
            if len(columns) >= 5:
                code = columns[0].text.strip()
                number = columns[1].text.strip()
                currency = columns[3].text.strip()
                decimal = columns[2].text.strip()
                currency_locations_data = columns[4].find_all('a')

                currency_locations = []

                for location_data in currency_locations_data:
                    location_name = location_data.text.strip()
                    location_icon = location_data.find_previous('img')['src'].strip() if location_data.find_previous('img') else ""

                    currency_locations.append({"location": location_name, "icon": location_icon})

                if code == code_or_number or number == code_or_number:
                    currency_info = {
                        "code": code,
                        "number": int(number) if number.isdigit() else None,
                        "decimal": int(decimal) if decimal.isdigit() else None,
                        "currency": currency,
                        "currency_locations": currency_locations
                    }

                    currency_data.append(currency_info)

        return currency_data if currency_data else None
    else:
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Código ou número ISO 4217 não fornecido."}, ensure_ascii=False))
    else:
        code_or_number = sys.argv[1]
        currency_data = get_currency_data_from_wikipedia(code_or_number)

        if currency_data is not None:
            try:
                db_connection = mysql.connector.connect(
                    host='localhost',  
                    user='root',  
                    password='Nova@162713',  
                    database='iso_currency_data'  
                )

                cursor = db_connection.cursor()
                cursor.execute("""
                    CREATE TABLE IF NOT EXISTS currency_data (
                        code VARCHAR(10) PRIMARY KEY,
                        number INT,
                        `decimal` INT,
                        currency VARCHAR(255),
                        locations JSON
                    )
                """)
                for currency_info in currency_data:
                    cursor.execute("""
                        INSERT INTO currency_teste (code, number, `decimal`, currency, locations)
                        VALUES (%s, %s, %s, %s, %s)
                    """, (
                        currency_info['code'],
                        currency_info['number'],
                        currency_info['decimal'],
                        currency_info['currency'],
                        json.dumps(currency_info['currency_locations'])
                    ))

                db_connection.commit()
                db_connection.close()

                print(json.dumps({"success": "Dados armazenados com sucesso no MySQL."}, ensure_ascii=False))

            except Exception as e:
                print(json.dumps({"error": str(e)}, ensure_ascii=False))

        else:
            print(json.dumps({"error": "Moeda não encontrada."}, ensure_ascii=False))
