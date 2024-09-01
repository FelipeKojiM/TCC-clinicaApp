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

    // // Enviar a imagem desenhada e os dados da tabela para o backend
    // $('#salvarImagem').click(function() {
    //     const formData = new FormData();
    //     const dataURL = desenhoCanvas.toDataURL('image/png'); // Converte o canvas de desenho para uma URL de dados
    //
    //     // Converter a URL de dados em Blob
    //     const blobBin = atob(dataURL.split(',')[1]);
    //     const array = [];
    //     for (let i = 0; i < blobBin.length; i++) {
    //         array.push(blobBin.charCodeAt(i));
    //     }
    //     const file = new Blob([new Uint8Array(array)], { type: 'image/png' });
    //
    //     formData.append('imagem', file, 'imagem.png');
    //
    //     // Capturar os dados da tabela
    //     const procedimentos = [];
    //     tabelaBotoxDuranteProc.rows().every(function() {
    //         const data = this.data();
    //         procedimentos.push({
    //             id: data.id,
    //             data: data.data,
    //             corUtilizada: data.cor,
    //             quantidadeBotox: data.quantidadeBotox,
    //             observacoesBotox: data.observacaoBotox
    //         });
    //     });
    //
    //     formData.append('procedimentos', JSON.stringify(procedimentos));
    //
    //     $.ajax({
    //         type: 'POST',
    //         url: '/api/salvar-imagem', // Ajuste a URL para a rota correta no seu controlador Spring Boot
    //         data: formData,
    //         processData: false,
    //         contentType: false,
    //         success: function(response) {
    //             alert('Imagem e procedimentos salvos com sucesso!');
    //         },
    //         error: function(error) {
    //             alert('Erro ao salvar a imagem e os procedimentos.');
    //             console.error(error);
    //         }
    //     });
    // });

    $(document).on("click", "#iniciarProcedimentoBotox", function (){
        $('#formularioSalvarProcedimentoBotox').toggle();
        var botao = $(this);
        if (botao.text() === "Iniciar Procedimento") {
            botao.text("Fechar Procedimento");
        } else {
            botao.text("Iniciar Procedimento");
        }
    });

    // Inicializa o DataTable
    var tabelaBotoxDuranteProc = $("#tabelaBotoxDuranteProc").DataTable({
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
            { data: 'id' },
            { data: 'data' },
            { data: 'corUtilizada' },
            { data: 'quantidadeBotox' },
            { data: 'observacaoBotox' },
            { data: 'acoes', orderable: false }
        ],
        columnDefs: [
            { width: "20%", targets: 0, className: "text-left" },
            { width: "20%", targets: 1, className: "text-left" },
            { width: "20%", targets: 2, className: "text-left" },
            { width: "20%", targets: 3, className: "text-left" },
            { width: "20%", targets: 4, className: "text-left" },
            { width: "5%",  targets: 5, className: "text-left" }
        ],
    });

    $("#pacienteBotox").on("change", function (){
        var pacienteId = $("#pacienteBotox").val();
        $("#pacienteIdProcedimentoBotox").val(pacienteId);

        if (pacienteId) {
            $.ajax({
                url: "/procedimentoBotox/listProcedimentosBotoxById/" + pacienteId,
                type: "GET",
                success: function (data) {
                    tabelaBotoxDuranteProc.clear(); // Clear the table before adding new data
                    if (Array.isArray(data) && data.length > 0) {
                        $.each(data, function (index, item) {
                            tabelaBotoxDuranteProc.row.add({
                                id: item.id,
                                data: item.data,
                                corUtilizada: item.corUtilizada,
                                quantidadeBotox: item.quantidadeBotox,
                                observacaoBotox: item.observacoesBotox, // Adjust field name as needed
                                acoes: '<ul class="list-inline m-0"><li class="list-inline-item"><button class="btn btn-danger btn-sm rounded-0 botaoDeletarProcedimento" type="button" title="Delete" data-id="' + item.id + '"><i class="fa fa-trash"></i></button></li>'
                            }).draw();
                        });
                    } else {
                        tabelaBotoxDuranteProc.clear().draw();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    tabelaBotoxDuranteProc.clear().draw();
                    console.error("Erro na requisição: ", textStatus, errorThrown);
                }
            });
        } else {
            tabelaBotoxDuranteProc.clear().draw();
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
        var data = formatDate(new Date());

        // Verifica se os campos estão preenchidos
        if (cor && quantidade && observacoes) {
            // Adicionar dados à tabela
            tabelaBotoxDuranteProc.row.add({
                id: null,
                data: data,
                corUtilizada: cor,
                quantidadeBotox: quantidade,
                observacaoBotox: observacoes,
                acoes: '<ul class="list-inline m-0"><li class="list-inline-item"><button class="btn btn-danger btn-sm rounded-0 botaoDeletarProcedimento" type="button" title="Delete"><i class="fa fa-trash"></i></button></li>'
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
    $('#tabelaBotoxDuranteProc tbody').on('click', '.botaoDeletarProcedimento', function () {
        var rowIndex = tabelaBotoxDuranteProc.row($(this).parents('tr')).index();

        // Remove o procedimento da lista
        listaProcedimentos.splice(rowIndex, 1);

        // Remove a linha da tabela
        tabelaBotoxDuranteProc.row($(this).parents('tr')).remove().draw();
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
            })
        }

        var areaAplicada = $("#areaAplicada").val();
        if(areaAplicada){
            $.ajax({
                type: "POST",
                url: "/procedimentoBotox/salvarHistoricoBotox",
                data: {
                    areaAplicada: areaAplicada
                },
            });
        }

        $.ajax({
            type: "POST",
            url: "/procedimentoBotox/salvar",
            contentType: "application/json",
            data: JSON.stringify({
                pacienteId: pacienteId,
                procedimentos: listaProcedimentos
            }),
            success: function(response) {
                Swal.fire({
                    title: "Sucesso!",
                    text: "Procedimento salvo com sucesso!",
                    icon: "success"
                }).then(() => {
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

