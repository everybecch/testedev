document.addEventListener('DOMContentLoaded', function () {
    const currencyForm = document.getElementById('currency-form');
    const resultDiv = document.getElementById('result');
    const resultData = document.getElementById('result-data');
    const consultarButton = document.getElementById('consultar');
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    consultarButton.addEventListener('click', function () {
        const query = document.getElementById('query').value;

        // Fazer uma solicitação AJAX para a rota de consulta
        fetch('/consultar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify({ code_or_number: query })
        })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                // Formatar os dados em um texto legível
                const formattedText = `
                    Código: ${data.code}
                    Número: ${data.number}
                    Casas Decimais: ${data.decimal}
                    Moeda: ${data.currency}
                    
                    Locais de Moeda:
                    ${data.currency_locations.map(location => `${location.location}: ${location.icon}`).join('\n')}
                `;

                // Exibir os dados formatados na página
                resultData.textContent = formattedText;
                resultDiv.classList.remove('hidden');
            } else {
                // Mostrar mensagem de erro, se houver
                alert(data.error);
            }
        })
        .catch(error => console.error(error));
    });
});