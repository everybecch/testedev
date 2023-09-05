# Consulta de Códigos ISO 4217

Esta é uma aplicação simples que permite aos usuários consultar informações sobre códigos e números ISO 4217 de moedas. Ela exibe informações sobre a moeda, como código, número, casas decimais e os locais onde a moeda é utilizada.

## Tecnologias Utilizadas

- Laravel (PHP): Utilizado para criar a estrutura da aplicação web.
- Python (Script) Utilizado para realizar o web scraping e buscar informações sobre as moedas.
- JavaScript: Utilizado para fazer requisições AJAX e interagir com a API.
- HTML e CSS: Utilizados para criar a interface da aplicação.
- MYSQL: Utilizado para salvar os codigos iso e depois exibir em uma consulta

## Como Executar Localmente

Para executar esta aplicação em seu ambiente local, siga estas etapas:

1. Certifique-se de ter o Python3, PHP, Laravel e o Composer instalados em seu sistema.
2. Clone este repositório para o seu computador:
3. Navegue até o diretório do projeto:
4. Instale as dependências do Laravel executando o comando:
6. Gere uma chave de aplicação usando o comando: php artisan key:generate
7. talvez seja nescessario instalar o mysql e roda uma query 
CREATE DATABASE IF NOT EXISTS iso_currency_data;

-- Use o banco de dados 'iso_currency_data'
USE iso_currency_data;

-- Crie uma tabela para armazenar os dados
CREATE TABLE IF NOT EXISTS currency_data (
    code VARCHAR(10) PRIMARY KEY,
    number INT,
    `decimal` INT,
    currency VARCHAR(255),
    locations JSON
);

8. Execute a python3 -m venv venv e depois execute o ambiente virtual: source venv/bin/activate

9. Execute o comando pyrhon3  app/python_scripts/crawler.py <codigo iso> Exemplo: USD, OU BRL. dentro do ambiente virtual para inserir os dados no db

10. Execute o servidor de desenvolvimento do Laravel: php artisan serve

9. Acesse a aplicação no seu navegador através do endereço `http://localhost:8000`.

## Como Usar

1. Na página inicial, você encontrará um campo de texto onde pode inserir um código ou número ISO 4217.
2. Digite o código Exemplo: USD, 840, ou número desejado e clique no botão "Consultar".
3. Os detalhes da moeda, incluindo código, número, casas decimais, moeda e locais de utilização, serão exibidos na tela.

## Contribuição

Este é um projeto de código aberto, e você é bem-vindo para contribuir. Sinta-se à vontade para abrir problemas (issues) ou enviar pull requests com melhorias.






