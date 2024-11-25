$(document).ready(function() {
    var hoje = new Date();  // Pega a data de hoje
    var diaSemana = hoje.getDay();  // Retorna o dia da semana (0 - 6)
    var diaDoMes = hoje.getDate();  // Retorna o dia do mês
    var mes = hoje.getMonth();  // Retorna o mês (0 - 11)
    var ano = hoje.getFullYear();  // Retorna o ano completo (ex: 2024)

    // Arrays com os dias da semana e meses do ano por extenso
    var diasSemana = [
        "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
        "Quinta-feira", "Sexta-feira", "Sábado"
    ];
    var mesesDoAno = [
        "Janeiro", "Fevereiro", "Março", "Abril",
        "Maio", "Junho", "Julho", "Agosto",
        "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    // Formata a data completa incluindo o ano
    var dataCompleta = diasSemana[diaSemana] + ", " + diaDoMes + " de " + mesesDoAno[mes] + " de " + ano;

    $("#dataHoje").html(dataCompleta);
});
