document.addEventListener('DOMContentLoaded', function () {
    const resultDiv = document.getElementById('result');
    const resultData = document.getElementById('result-data');
    const consultarButton = document.getElementById('consultar');

    consultarButton.addEventListener('click', function () {
        const query = document.getElementById('query').value;

        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        fetch('/consultar', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ code_or_number: query })
        })
        .then(response => {
            console.log('Dados recebidos do servidor:', response); 

            if (response.headers.get('content-type').includes('application/json')) {
                return response.json();
            } else {
                return response.text().then(html => {
                    const currencyInfo = extractCurrencyInfoFromHTML(html);
                    return { currencyInfo };
                });
            }
        })
        .then(data => {
            console.log('Dados recebidos do servidor (após análise JSON):', data); 

            if (!data.error) {
                let formattedText = `
Código: ${data.code}
Número: ${data.number}
Decimais: ${data.decimal}
Moeda: ${data.currency}
`;

                if (data.locations) {
                    const locationsArray = JSON.parse(data.locations);
                    if (Array.isArray(locationsArray) && locationsArray.length > 0) {
                        formattedText += `Locais de Moeda:\n<ul>`;
                        locationsArray.forEach(location => {
                            formattedText += `<li>${location.location}: ${location.icon ? `<img src="${location.icon}" alt="${location.location}">` : 'N/A'}</li>`;
                        });
                        formattedText += `</ul>`;
                    } else {
                        formattedText += `Locais de Moeda: Nenhum encontrado`;
                    }
                }

                resultData.innerHTML = `Dados vindos do DB:<br>${formattedText}`;
                resultDiv.classList.remove('hidden');
            } else {
                fetch(`https://pt.wikipedia.org/wiki/ISO_4217${query}`)
                    .then(response => {
                        console.log('Resposta da Wikipedia:', response); 

                        if (response.ok) {
                            return response.text();
                        } else {
                            throw new Error('Erro na solicitação da Wikipedia');
                        }
                    })
                    .then(html => {
                        const currencyInfo = extractCurrencyInfoFromHTML(html);
                        console.log('Dados extraídos da Wikipedia:', currencyInfo); 
                        let formattedText = `
                           Código: ${currencyInfo.code}
                           Número: ${currencyInfo.number}
                           Decimais: ${currencyInfo.decimal}
                           Moeda: ${currencyInfo.currency}
                        `;

                        if (currencyInfo.currency_locations && Array.isArray(currencyInfo.currency_locations) && currencyInfo.currency_locations.length > 0) {
                            formattedText += `Locais de Moeda:\n<ul>`;
                            currencyInfo.currency_locations.forEach(location => {
                                formattedText += `<li>${location.location}: ${location.icon ? `<img src="${location.icon}" alt="${location.location}">` : 'N/A'}</li>`;
                            });
                            formattedText += `</ul>`;
                        } else {
                            formattedText += `Locais de Moeda: Nenhum encontrado`;
                        }

                        resultData.innerHTML = `Dados vindos do site Wikipedia:<br>${formattedText}`;
                        resultDiv.classList.remove('hidden');
                    })
                    .catch(error => {
                        alert(`Erro ao consultar a Wikipedia: ${error.message}`);
                    });
            }
        })
        .catch(error => {
            alert(`Erro ao consultar o banco de dados: ${error.message}`);
        });
    });

    function extractCurrencyInfoFromHTML(html) {
        const currencyInfo = {
            code: '',       
            number: null,    
            decimal: null,   
            currency: '',    
            currency_locations: [] 
        };
    
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
    
        const infoTable = doc.querySelector('.wikitable');
        if (infoTable) {
            const rows = infoTable.querySelectorAll('tr');
            if (rows.length >= 2) {
                currencyInfo.code = rows[1].querySelector('td:nth-child(1)').textContent.trim();
                currencyInfo.number = parseInt(rows[1].querySelector('td:nth-child(2)').textContent.trim(), 10);
                currencyInfo.decimal = parseInt(rows[1].querySelector('td:nth-child(3)').textContent.trim(), 10);
                currencyInfo.currency = rows[1].querySelector('td:nth-child(4)').textContent.trim();
    
                const locationLinks = rows[1].querySelectorAll('td:nth-child(5) a');
                locationLinks.forEach(link => {
                    const locationName = link.textContent.trim();
                    const locationIcon = link.querySelector('img') ? link.querySelector('img').getAttribute('src').trim() : '';
                    currencyInfo.currency_locations.push({ location: locationName, icon: locationIcon });
                });
            }
        }
    
        console.log("Dados extraídos da Wikipedia:", currencyInfo); 
        console.log(html); 
        return currencyInfo;
    }    
});
