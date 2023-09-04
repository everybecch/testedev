# Consulta de Códigos ISO 4217

Esta é uma aplicação simples que permite aos usuários consultar informações sobre códigos e números ISO 4217 de moedas. Ela exibe informações sobre a moeda, como código, número, casas decimais e os locais onde a moeda é utilizada.

## Tecnologias Utilizadas

- Laravel (PHP): Utilizado para criar a estrutura da aplicação web.
- Python: Utilizado para realizar o web scraping e buscar informações sobre as moedas.
- JavaScript: Utilizado para fazer requisições AJAX e interagir com a API.
- HTML e CSS: Utilizados para criar a interface da aplicação.

## Como Executar Localmente

Para executar esta aplicação em seu ambiente local, siga estas etapas:

1. Certifique-se de ter o PHP e o Composer instalados em seu sistema.
2. Clone este repositório para o seu computador:
3. Navegue até o diretório do projeto:
4. Instale as dependências do Laravel executando o comando:
5. Copie o arquivo `.env.example` para `.env`:
6. Gere uma chave de aplicação usando o comando: php artisan key:generate

7. Execute o servidor de desenvolvimento do Laravel: php artisan serve

8. Acesse a aplicação no seu navegador através do endereço `http://localhost:8000`.

## Como Usar

1. Na página inicial, você encontrará um campo de texto onde pode inserir um código ou número ISO 4217.
2. Digite o código ou número desejado e clique no botão "Consultar".
3. Os detalhes da moeda, incluindo código, número, casas decimais, moeda e locais de utilização, serão exibidos na tela.

## Contribuição

Este é um projeto de código aberto, e você é bem-vindo para contribuir. Sinta-se à vontade para abrir problemas (issues) ou enviar pull requests com melhorias.






