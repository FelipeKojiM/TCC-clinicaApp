$(document).ready(function () {
    // Inicializar o Date Range Picker
    var start = moment().startOf('month'); // Início do mês atual
    var end = moment().endOf('month');    // Fim do mês atual

    function atualizarDatasSelecionadas(start, end) {
        $('#dataGraficos span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
    }

    $('#dataGraficos').daterangepicker({
        startDate: start,
        endDate: end,
        locale: {
            format: 'DD/MM/YYYY',
            applyLabel: 'Aplicar',
            cancelLabel: 'Cancelar',
            daysOfWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            monthNames: [
                'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ],
            firstDay: 0
        },
        ranges: {
            'Hoje': [moment(), moment()],
            'Ontem': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Últimos 7 Dias': [moment().subtract(6, 'days'), moment()],
            'Últimos 30 Dias': [moment().subtract(29, 'days'), moment()],
            'Este Mês': [moment().startOf('month'), moment().endOf('month')],
            'Último Mês': [
                moment().subtract(1, 'month').startOf('month'),
                moment().subtract(1, 'month').endOf('month')
            ]
        }
    }, atualizarDatasSelecionadas);

    atualizarDatasSelecionadas(start, end);

    // Função para enviar as datas ao backend
    function buscarDados(start, end) {
        $.ajax({
            url: '/filtrarAgendamentos',
            type: 'GET',
            data: {
                startDate: start.format('YYYY-MM-DD'),
                endDate: end.format('YYYY-MM-DD')
            },
            success: function (data) {
                atualizarGraficoAgendamento(data.agendamentos);
                atualizarGraficoProcedimentos(data.botox, data.capilar, data.peeling, data.preenchimento);
            },
            error: function (xhr, status, error) {
                console.error('Erro ao buscar os dados:', error);
            }
        });
    }

    // Evento ao aplicar um novo intervalo de datas
    $('#dataGraficos').on('apply.daterangepicker', function (ev, picker) {
        buscarDados(picker.startDate, picker.endDate);
    });

    function atualizarGraficoAgendamento(data) {
        console.log('Atualizando gráfico com os dados:', data);

        Highcharts.chart('agendamento', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Agendamentos por Dia'
            },
            xAxis: {
                title: {
                    text: 'Dia do Mês'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Quantidade de Agendamentos'
                }
            },
            series: [{
                name: 'Agendamentos',
                data: Object.values(data)
            }]
        });
    }

    function atualizarGraficoProcedimentos(botox, capilar, peeling, preenchimento) {
        // Obtém as categorias (datas) dos dados
        var categoriasBotox = Object.keys(botox);
        var categoriasCapilar = Object.keys(capilar);
        var categoriasPeeling = Object.keys(peeling);
        var categoriasPreenchimento = Object.keys(preenchimento);

        // Obtém os valores dos procedimentos
        var valoresBotox = Object.values(botox);
        var valoresCapilar = Object.values(capilar);
        var valoresPeeling = Object.values(peeling);
        var valoresPreenchimento = Object.values(preenchimento);

        // Aqui você pode garantir que todas as categorias (datas) sejam as mesmas
        // Podemos assumir que, se as categorias de cada procedimento forem diferentes,
        // vamos pegar a união de todas as datas únicas para as categorias no eixo X.
        var categoriasUnicas = [...new Set([...categoriasBotox, ...categoriasCapilar, ...categoriasPeeling, ...categoriasPreenchimento])];

        // Atualiza o gráfico com as categorias unificadas
        Highcharts.chart('procedimentos', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Procedimentos por Dia/Mês',
                align: 'left'
            },
            subtitle: {
                text: 'Fonte: Sua base de dados',
                align: 'left'
            },
            xAxis: {
                categories: categoriasUnicas,  // Usando categorias unificadas
                title: {
                    text: 'Dia/Mês'
                },
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Procedimentos Realizados'
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [
                {
                    name: 'Botox',
                    data: categoriasUnicas.map(function(categoria) {
                        return botox[categoria] || 0;  // Retorna 0 se a data não existir no botox
                    })
                },
                {
                    name: 'Capilar',
                    data: categoriasUnicas.map(function(categoria) {
                        return capilar[categoria] || 0;  // Retorna 0 se a data não existir no capilar
                    })
                },
                {
                    name: 'Peeling',
                    data: categoriasUnicas.map(function(categoria) {
                        return peeling[categoria] || 0;  // Retorna 0 se a data não existir no peeling
                    })
                },
                {
                    name: 'Preenchimento',
                    data: categoriasUnicas.map(function(categoria) {
                        return preenchimento[categoria] || 0;  // Retorna 0 se a data não existir no preenchimento
                    })
                }
            ]
        });
    }


    // Carregar os dados do mês atual ao abrir a página
    buscarDados(start, end);
});
