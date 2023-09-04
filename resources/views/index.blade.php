<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <title>Consulta de Códigos ISO 4217</title>
    <!-- Inserção do token CSRF -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    <h1>Consulta de Códigos ISO 4217</h1>
    <form id="currency-form">
        @csrf <!-- Use isso se estiver usando Laravel para proteger contra CSRF -->
        <label for="code_or_number">Código ou Número ISO 4217:</label>
        <input type="text" id="query" name="code_or_number" required>
        <button type="button" id="consultar">Consultar</button>
    </form>

    <div id="result">
    <pre id="result-data"></pre>
</div>

    <script src="{{ asset('js/script.js') }}"></script>
</body>
</html>
