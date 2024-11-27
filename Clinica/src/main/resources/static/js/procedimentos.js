$(document).ready(function () {
    function showSection(selector) {
        $(".section").removeClass("active");
        $(selector).addClass("active");
    }

    $(".nav-link").on("click", function (e) {
        e.preventDefault();
        var target = $(this).data("target");
        showSection(target);
    });

    showSection("#procedimentos");

    function autoResizeTextarea(textarea) {
        $(textarea).css("height", "auto");
        $(textarea).css("height", textarea.scrollHeight + "px");
    }

    $("textarea").each(function () {
        autoResizeTextarea(this);
    });

    $("textarea").on("input", function () {
        autoResizeTextarea(this);
    });

    $(".select2").select2({
        placeholder: "Selecione opções",
        allowClear: true,
        width: "100%",
        closeOnSelect: false
    });

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
                console.log(data.contagemPacientes)
                atualizarGraficoAgendamento(data.agendamentos);
                atualizarGraficoProcedimentos(data.botox, data.capilar, data.peeling, data.preenchimento);
                if(data.contagemPacientesBotox){
                    var nome = 'Botox';
                    var id = 'botoxGrafico';
                    atualizarGraficoContagemPacientes(data.contagemPacientesBotox, id, nome);
                }
                if(data.contagemPacientesCapilar){
                    var nome = 'Capilar';
                    var id = 'capilarGrafico';
                    atualizarGraficoContagemPacientes(data.contagemPacientesCapilar, id, nome);
                }
                if(data.contagemPacientesPeeling){
                    var nome = 'Peeling';
                    var id = 'peelingGrafico';
                    atualizarGraficoContagemPacientes(data.contagemPacientesPeeling, id, nome);
                }
                if(data.contagemPacientesPreenchimento){
                    var nome = 'Preenchimento';
                    var id = 'preenchimentoGrafico';
                    atualizarGraficoContagemPacientes(data.contagemPacientesPreenchimento, id, nome);
                }
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

        Highcharts.chart('agendamento', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Agendamentos por Dia',
                align: 'left'
            },
            xAxis: {
                categories: Object.keys(data),
                title: {
                    text: 'Dia/Mês'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Quantidade de Agendamentos'
                }
            },
            credits: {
                enabled: false
            },
            colors: ['#66b6df'],
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

        // Ordena as categorias para garantir que as datas apareçam em ordem cronológica
        categoriasUnicas.sort(function(a, b) {
            // Converte as datas para objetos Date para uma comparação correta
            return new Date(a.split("/").reverse().join("-")) - new Date(b.split("/").reverse().join("-"));
        });

        // Atualiza o gráfico com as categorias unificadas
        Highcharts.chart('procedimentosRealizados', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Procedimentos realizado no Dia/Mês',
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
            credits: {
                enabled: false
            },
            colors: ['#a3b0e3', '#c08ae3', '#89d5c8', '#a7dd9c'],
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

    function atualizarGraficoContagemPacientes(data, id, nome){
        Highcharts.chart(''+id+'', {
            chart: {
                type: 'pie',
                custom: {},
                width: 300,
                height: 300,
                events: {
                    render() {
                        const chart = this,
                            series = chart.series[0];
                        let customLabel = chart.options.chart.custom.label;

                        if (!customLabel) {
                            customLabel = chart.options.chart.custom.label =
                                chart.renderer.label(
                                    'Total<br/>' +
                                    '<strong>' + (series.points[0].y + series.points[1].y) + '</strong>' // Total de pacientes
                                )
                                    .css({
                                        color: '#000',
                                        textAnchor: 'middle'
                                    })
                                    .add();
                        }
                        const x = series.center[0] + chart.plotLeft,
                            y = series.center[1] + chart.plotTop -
                                (customLabel.attr('height') / 2);

                        customLabel.attr({
                            x,
                            y
                        });
                        customLabel.css({
                            fontSize: `${series.center[2] / 12}px`
                        });
                    }
                }
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            title: {
                text: nome,
                style: {
                    align: 'center',
                },
                y: 40
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            legend: {
                enabled: true
            },
            plotOptions: {
                pie: {
                    size: '80%',
                    innerSize: '60%',
                },
                series: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderRadius: 1,
                    dataLabels: [{
                        enabled: true,
                        distance: 10,
                        format: '{point.name}'
                    }, {
                        enabled: true,
                        distance: -15,
                        format: '{point.percentage:.0f}%',
                        style: {
                            fontSize: '0.9em'
                        }
                    }],
                    showInLegend: true
                }
            },
            credits: {
                enabled: false
            },
            colors: ['#797979', '#9188cd'],
            series: [{
                name: 'Pacientes',
                colorByPoint: true,
                innerSize: '75%',
                data: [{
                    name: 'Não Retornaram',
                    y: data.apenasUmProcedimento
                }, {
                    name: 'Retornaram',
                    y: data.maisDeUmProcedimento
                }]
            }]
        });
    }

    // Carregar os dados do mês atual ao abrir a página
    buscarDados(start, end);

});
