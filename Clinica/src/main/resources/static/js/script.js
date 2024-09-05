$(document).ready(function() {
    const fotoCanvas = $('#fotoCanvas')[0];
    const fotoContext = fotoCanvas.getContext('2d');
    const desenhoCanvas = $('#desenhoCanvas')[0];
    const desenhoContext = desenhoCanvas.getContext('2d');
    let desenhando = false;
    let posX = 0;
    let posY = 0;
    let corAtual = '#000000'; // Cor padrão preta
    let usandoBorracha = false;
    const tamanhoBorracha = 20; // Tamanho da borracha
    const tamanhoLinha = 2; // Tamanho da linha

    // Atualiza a cor de desenho quando o usuário seleciona uma nova cor da paleta
    $('#paletaCores .cor').click(function() {
        usandoBorracha = false; // Desativa a borracha ao escolher uma cor
        corAtual = $(this).data('cor');
        $('#colorPicker').val(corAtual); // Atualiza o seletor de cor
        desenhoContext.strokeStyle = corAtual; // Atualiza a cor do contorno
        desenhoContext.lineWidth = tamanhoLinha;
    });

    // Ativa ou desativa a borracha
    $('#usarBorracha').click(function(e) {
        usandoBorracha = !usandoBorracha;
        if (usandoBorracha) {
            $(this).addClass('active');
            desenhoContext.strokeStyle = '#FFFFFF'; // Cor da borracha (branca)
            desenhoContext.lineWidth = tamanhoBorracha; // Ajusta o tamanho da borracha
        } else {
            $(this).removeClass('active');
            desenhoContext.strokeStyle = corAtual; // Restaura a cor de desenho
            desenhoContext.lineWidth = tamanhoLinha; // Ajusta o tamanho da linha de desenho
        }

        e.preventDefault();
    });

    // Carregar a imagem no canvas de foto
    function carregarImagem() {
        const img = new Image();
        img.src = '/static/images/rostoExemplo.jpg'; // Caminho da imagem
        img.onload = function() {
            // Limpar o canvas de imagem antes de desenhar a nova imagem
            fotoContext.clearRect(0, 0, fotoCanvas.width, fotoCanvas.height);
            // Desenhe a imagem no canvas
            fotoContext.drawImage(img, 0, 0, fotoCanvas.width, fotoCanvas.height);
        };
    }

    carregarImagem();

    // Iniciar o desenho no canvas de desenho
    $(desenhoCanvas).mousedown(function(e) {
        desenhando = true;
        const offset = $(this).offset();
        posX = e.pageX - offset.left;
        posY = e.pageY - offset.top;
        desenhoContext.beginPath();
        desenhoContext.moveTo(posX, posY);
    });

    // Desenhar ao mover o mouse no canvas de desenho
    $(desenhoCanvas).mousemove(function(e) {
        if (desenhando) {
            const offset = $(this).offset();
            posX = e.pageX - offset.left;
            posY = e.pageY - offset.top;
            if (usandoBorracha) {
                desenhoContext.clearRect(posX - (tamanhoBorracha / 2), posY - (tamanhoBorracha / 2), tamanhoBorracha, tamanhoBorracha);
            } else {
                desenhoContext.lineTo(posX, posY);
                desenhoContext.stroke();
            }
        }
    });

    // Parar o desenho
    $(desenhoCanvas).mouseup(function() {
        desenhando = false;
    });

    $(desenhoCanvas).mouseleave(function() {
        desenhando = false;
    });

    function capturarImagem() {
        // Combinar os dois canvas (foto e desenho) em uma única imagem
        const canvasContainer = document.createElement('canvas');
        const contextContainer = canvasContainer.getContext('2d');

        canvasContainer.width = fotoCanvas.width;
        canvasContainer.height = fotoCanvas.height;

        // Desenhar a imagem e o desenho no novo canvas
        contextContainer.drawImage(fotoCanvas, 0, 0);
        contextContainer.drawImage(desenhoCanvas, 0, 0);

        // Capturar a imagem como string Base64
        const imagemBase64 = canvasContainer.toDataURL('image/png');
        return imagemBase64;
    }

    $(document).on("click", "#iniciarProcedimentoBotox", function (){
        $('#formularioSalvarProcedimentoBotox').toggle();
        var botao = $(this);
        if (botao.text() === "Iniciar Procedimento") {
            botao.text("Fechar Procedimento");
        } else {
            botao.text("Iniciar Procedimento");
        }
    });

    // dataTable historico por paciente
    var tabelaHistoricoBotox = $("#tabelaHistoricoBotox").DataTable({
        pageLength: 10,
        paging: true,
        lengthChange: false,
        searching: true,
        ordering: true,
        info: true,
        language: {
            search: "Buscar:",
            lengthMenu: "Mostrar _MENU_ registros por página",
            info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
            infoEmpty: "Nenhum registro disponível",
            infoFiltered: "(filtrado de _MAX_ registros no total)",
        },
        dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 text-md-right"f>>' +
            '<"row"<"col-sm-12"tr>>' +
            '<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6 text-md-right"p>>',
        columns: [
            { data: 'areaAplicada' },
            { data: 'dataProcedimento' },
            { data: 'acoes', orderable: false }
        ],
        columnDefs: [
            { width: "20%", targets: 0, className: "text-left" },
            { width: "20%", targets: 1, className: "text-left" },
            { width: "20%", targets: 2, className: "text-left" },
        ],
    });

    // datatable aplicacoes por vinculo/paciente
    var tabelaHistoricoPacienteBotox = $("#tabelaHistoricoPacienteBotox").DataTable({
        pageLength: 10,
        paging: true,
        lengthChange: false,
        searching: true,
        ordering: true,
        info: true,
        language: {
            search: "Buscar:",
            lengthMenu: "Mostrar _MENU_ registros por página",
            info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
            infoEmpty: "Nenhum registro disponível",
            infoFiltered: "(filtrado de _MAX_ registros no total)",
        },
        dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 text-md-right"f>>' +
            '<"row"<"col-sm-12"tr>>' +
            '<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6 text-md-right"p>>',
        columns: [
            { data: 'corUtilizada' },
            { data: 'quantidadeBotox' },
            { data: 'observacoesBotox' },
        ],
        columnDefs: [
            { width: "20%", targets: 0, className: "text-left" },
            { width: "20%", targets: 1, className: "text-left" },
            { width: "20%", targets: 2, className: "text-left" },
        ],
    });

    // datatable aplicacoes por vinculo/paciente
    var tabelaDuranteProcBotox = $("#tabelaDuranteProcBotox").DataTable({
        pageLength: 10,
        paging: true,
        lengthChange: false,
        language: {
            infoEmpty: "",
        },
        dom: '<"row"<"col-sm-12"tr>>' + // Remove a parte do filtro e da paginação
            '<"row"<"col-sm-12"i>>',  // Mostra apenas as informações
        columns: [
            { data: 'corUtilizada' },
            { data: 'quantidadeBotox' },
            { data: 'observacoesBotox' },
            { data: 'acoes' },
        ],
        columnDefs: [
            { width: "25%", targets: 0, className: "text-left" },
            { width: "25%", targets: 1, className: "text-left" },
            { width: "25%", targets: 2, className: "text-left" },
            { width: "25%", targets: 3, className: "text-left" },
        ],
    });

    $("#pacienteBotox").on("change", function (){
        var pacienteId = $("#pacienteBotox").val();
        $("#pacienteIdProcedimentoBotox").val(pacienteId);

        if (pacienteId) {
            $.ajax({
                url: "/listHistoricoBotoxById/" + pacienteId,
                type: "GET",
                success: function (data) {
                    tabelaHistoricoBotox.clear(); // Clear the table before adding new data
                    if (Array.isArray(data) && data.length > 0) {
                        $.each(data, function (index, item) {
                            tabelaHistoricoBotox.row.add({
                                areaAplicada: item.areaAplicada,
                                dataProcedimento: item.dataProcedimento,
                                acoes: '<ul class="list-inline m-0"><li class="list-inline-item"><button class="btn btn-outline-success btn-sm rounded-0 botaoVisualizarProcedimento" type="button" title="Visualizar" data-vinculoprocedimentobotox="' + item.vinculoProcedimentoBotox + '"><i class="fa fa-address-card-o"></i></button></li>'
                            }).draw();
                        });
                    } else {
                        tabelaHistoricoBotox.clear().draw();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    tabelaHistoricoBotox.clear().draw();
                    console.error("Erro na requisição: ", textStatus, errorThrown);
                }
            });
        } else {
            tabelaHistoricoBotox.clear().draw();
        }
    });

    $(document).on("click", ".botaoVisualizarProcedimento", function (){
        var idVinculoProcedimento = $(this).data("vinculoprocedimentobotox");
        $("#visualizarProcedimentoBotox").modal("show");

        if (idVinculoProcedimento) {
            $.ajax({
                url: "/procedimentoBotox/listProcedimentosBotoxByVinculoId/" + idVinculoProcedimento,
                type: "GET",
                success: function (data) {
                    tabelaHistoricoPacienteBotox.clear();
                    if (Array.isArray(data) && data.length > 0) {
                        $.each(data, function (index, item) {
                            tabelaHistoricoPacienteBotox.row.add({
                                corUtilizada: item.corUtilizada,
                                quantidadeBotox: item.quantidadeBotox,
                                observacoesBotox: item.observacoesBotox,
                            }).draw();
                        });
                    } else {
                        tabelaHistoricoPacienteBotox.clear().draw();
                    }
                },
            });

            // Retorno da Imagem pelo id do vinculo
            $.ajax({
                url: '/procedimentoBotox/visualizar/' + idVinculoProcedimento,
                method: 'GET',
                xhrFields: {
                    responseType: 'blob'
                },
                success: function(response) {
                    if (response.size > 0) {
                        var url = URL.createObjectURL(response);
                        $('#imagemExibida').attr('src', url).show();
                    } else {
                        console.error('Nenhuma imagem retornada.');
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Erro ao carregar a imagem:', error);
                }
            });
        }
    });

    // Array para armazenar os procedimentos adicionados
    var listaProcedimentos = [];

    // Adiciona novo procedimento na tabela
    $("#adicionarProcedimentoBotox").on("click", function (e) {
        e.preventDefault(); // Evita o comportamento padrão do botão de submit

        var cor         = $("#corUtilizada").val();
        var quantidade  = $("#quantidadeBotox").val();
        var observacoes = $("#observacoesBotoxAplicacao").val();
        var idCounter = 1;

        // Verifica se os campos estão preenchidos
        if (cor && quantidade && observacoes) {
            // Adicionar dados à tabela
            tabelaDuranteProcBotox.row.add({
                id: idCounter++,
                corUtilizada: cor,
                quantidadeBotox: quantidade,
                observacoesBotox: observacoes,
                acoes: '<ul class="list-inline m-0"><li class="list-inline-item"><button class="btn btn-danger btn-sm rounded-0 botaoDeletarProcedimentoBotox" type="button" title="Delete"><i class="fa fa-trash"></i></button></li>'
            }).draw();

            // Adiciona o procedimento à lista
            listaProcedimentos.push({
                corUtilizada: cor,
                quantidadeBotox: quantidade,
                observacoesBotox: observacoes,
            });

            // Limpar campos do formulário
            $("#corUtilizada").val("");
            $("#quantidadeBotox").val("");
            $("#observacoesBotoxAplicacao").val("");
        } else {
            Swal.fire({
                title: "Erro!",
                text: "Informe todas as Opções!",
                icon: "error"
            })
        }
    });

    // Adicionar funcionalidade para excluir linhas da tabela
    $('#tabelaDuranteProcBotox tbody').on('click', '.botaoDeletarProcedimentoBotox', function () {
        var rowIndex = tabelaDuranteProcBotox.row($(this).parents('tr')).index();

        // Remove o procedimento da lista
        listaProcedimentos.splice(rowIndex, 1);

        // Remove a linha da tabela
        tabelaDuranteProcBotox.row($(this).parents('tr')).remove().draw();
    });

    // Salva novos procedimentos do paciente
    $("#salvarProcedimentosBotox").on("click", function (e) {
        e.preventDefault();

        var pacienteId = $("#pacienteIdProcedimentoBotox").val();

        if (!pacienteId) {
            Swal.fire({
                title: "Erro!",
                text: "Selecione um paciente!",
                icon: "error"
            });
            return; // Impede a execução do restante do código se o paciente não estiver selecionado
        }

        var areaAplicada = $("#areaAplicada").val();
        if (areaAplicada) {
            $.ajax({
                type: "POST",
                url: "/procedimentoBotox/salvarHistoricoBotox",
                data: {
                    areaAplicada: areaAplicada,
                    pacienteId: pacienteId
                },
            });
        }

        // Captura a imagem desenhada no canvas
        var desenhoCanvas = document.getElementById("desenhoCanvas");
        var imagemBase64 = desenhoCanvas.toDataURL(); // Converte o canvas para Base64

        $.ajax({
            type: "POST",
            url: "/procedimentoBotox/salvar",
            contentType: "application/json",
            data: JSON.stringify({
                pacienteId: pacienteId,
                procedimentos: listaProcedimentos,
                imagemBase64: imagemBase64 // Adiciona a imagem ao payload da requisição
            }),
            success: function(response) {
                Swal.fire({
                    title: "Sucesso!",
                    text: "Procedimento salvo com sucesso!",
                    icon: "success"
                }).then(() => {
                    location.reload();
                });
            },
            error: function(response) {
                console.log('Erro ao salvar procedimento:', response);
            }
        });
    });

});

function formatDate(date) {
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2); // Adiciona zero à esquerda
    let day = ('0' + date.getDate()).slice(-2); // Adiciona zero à esquerda

    return `${year}-${month}-${day}`;
}

