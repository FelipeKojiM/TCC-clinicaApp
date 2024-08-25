
document.addEventListener("DOMContentLoaded", function() {
    const tabelaBody = document.querySelector('#tabelaHiperidroseProc tbody');

    function atualizarTabela(dados) {
        tabelaBody.innerHTML = ''; // Limpa a tabela existente

        dados.forEach(procedimento => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${procedimento.id}</td>
                <td>${procedimento.data}</td>
                <td>${procedimento.protocoloUtilizado}</td>
                <td>${procedimento.resultadoObservado}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editar(${procedimento.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deletar(${procedimento.id})">Deletar</button>
                </td>
            `;
            tabelaBody.appendChild(tr);
        });
    }

    // Função para buscar os dados da API
    function carregarProcedimentos(pacienteId) {
        fetch(`/hiperidrose/procedimentos/${pacienteId}`)
            .then(response => response.json())
            .then(data => {
                atualizarTabela(data);
            })
            .catch(error => {
                console.error('Erro ao carregar procedimentos:', error);
            });
    }

    // Supondo que você tenha um pacienteId em algum lugar no seu código
    const pacienteId = 1; // Substitua pelo ID real do paciente
    carregarProcedimentos(pacienteId);
});

$(document).ready(function() {
    // Inicializa o Select2
    $(".select2").select2({
        placeholder: "Selecione opções",
        allowClear: true,
        width: "100%",
        closeOnSelect: false
    });

    // Manipulação do formulário de ficha de Hiperidrose
    $("#formSalvarFichaHiperidrose").on("submit", function(e) {
        e.preventDefault();

        var form = $(this);
        var formData = form.serialize();

        Swal.fire({
            title: "Tem certeza?",
            text: "Você deseja salvar essas informações?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: form.attr("action"),
                    type: "POST",
                    data: formData,
                    success: function(response) {
                        Swal.fire({
                            title: "Sucesso!",
                            text: "Ficha salva com sucesso!",
                            icon: "success"
                        });
                        setTimeout(function() {
                            window.location.href = "/procedimentos#hiperidrose";
                        }, 2000);
                    },
                    error: function(xhr, status, error) {
                        Swal.fire({
                            title: "Erro!",
                            text: "Ocorreu um erro ao salvar a ficha.",
                            icon: "error"
                        });
                    }
                });
            }
        });
    });

    // Manipulação da seleção do paciente
    $("#paciente").change(function() {
        var pacienteId = $(this).val();
        $("#pacienteId").val(pacienteId);

        if (pacienteId) {
            $.ajax({
                url: "/hiperidrose/paciente/" + pacienteId,
                type: "GET",
                success: function(data) {
                    if (data) {
                        // Atualiza os campos com os dados recebidos
                        $("#quantidadeUnidades").val(data.quantidadeUnidades);
                        $("#areaAplicacao").val(data.areaAplicacao);
                        $("#tipoHiperidrose").val(data.tipoHiperidrose);
                        $("#dataAplicacao").val(data.dataAplicacao);
                        $("#duracaoEfeito").val(data.duracaoEfeito);
                        $("#recomendacoes").val(data.recomendacoes);

                        // Adiciona o ID da ficha no formulário para identificar a atualização
                        $("#fichaId").val(data.fichaId || ""); // Defina um campo escondido para o ID da ficha
                    } else {
                        limparCampos();
                    }
                }
            });
        } else {
            limparCampos();
        }
    });

    // Inicializa a tabela DataTables para Hiperidrose
    var tabelaHiperidroseProc = $("#tabelaHiperidroseProc").DataTable({
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
            infoFiltered: "(filtrado de _MAX_ registros no total)"
        },
        dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 text-md-right"f>>' +
            '<"row"<"col-sm-12"tr>>' +
            '<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6 text-md-right"p>>',
        columns: [
            { data: 'id' },
            { data: 'data' },
            { data: 'protocoloUtilizado' },
            { data: 'resultadoObservado' },
            { data: 'acoes', orderable: false }
        ],
        columnDefs: [
            { width: "10%", targets: 0, className: "text-left" },
            { width: "20%", targets: 1, className: "text-left" },
            { width: "30%", targets: 2, className: "text-left" },
            { width: "30%", targets: 3, className: "text-left" },
            { width: "10%", targets: 4, className: "text-left" }
        ],
        drawCallback: function(settings) {
            var api = this.api();
            var pageInfo = api.page.info();
            var numRecords = pageInfo.recordsDisplay;

            if (numRecords <= 10) {
                $('#tabelaHiperidroseProc').css('height', 'auto');
            } else {
                $('#tabelaHiperidroseProc').css('height', '400px');
            }
        }
    });

    // Manipulação do formulário de procedimento de Hiperidrose
    $("#formSalvarProcedimentoHiperidrose").on("submit", function(e) {
        e.preventDefault();

        var form = $(this);
        var formData = form.serialize();

        Swal.fire({
            title: "Tem certeza?",
            text: "Você deseja salvar essas informações?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: form.attr("action"),
                    type: "POST",
                    data: formData,
                    success: function(response) {
                        Swal.fire({
                            title: "Sucesso!",
                            text: "Procedimento salvo com sucesso!",
                            icon: "success"
                        });
                        // Atualiza a tabela após salvar
                        var pacienteId = $("#pacienteId").val();
                        if (pacienteId) {
                            $.ajax({
                                url: "/hiperidrose/procedimentos/" + pacienteId,
                                type: "GET",
                                success: function(data) {
                                    tabelaHiperidroseProc.clear(); // Limpa a tabela antes de adicionar novos dados

                                    if (Array.isArray(data) && data.length > 0) {
                                        $.each(data, function(index, item) {
                                            tabelaHiperidroseProc.row.add({
                                                id: item.id,
                                                data: item.data,
                                                protocoloUtilizado: item.protocoloUtilizado,
                                                resultadoObservado: item.resultadoObservado,
                                                acoes: '<ul class="list-inline m-0"><li class="list-inline-item"><button class="btn btn-danger btn-sm rounded-0 botaoDeletarProcedimento" type="button" title="Delete" data-id="' + item.id + '"><i class="fa fa-trash"></i></button></li>' +
                                                    '<li class="list-inline-item"><button class="btn btn-success btn-sm rounded-0 editarProcedimento" type="button" title="Editar" data-id="' + item.id + '"><i class="fa fa-edit"></i></button></li></ul>'
                                            }).draw();
                                        });
                                    } else {
                                        tabelaHiperidroseProc.clear().draw(); // Limpa a tabela se não houver dados
                                    }
                                },
                                error: function(jqXHR, textStatus, errorThrown) {
                                    tabelaHiperidroseProc.clear().draw(); // Limpa a tabela em caso de erro
                                    console.error("Erro na requisição: ", textStatus, errorThrown);
                                }
                            });
                        }
                        setTimeout(function() {
                            $('#modalProcedimento').modal('hide'); // Supondo que você tenha um modal com esse ID
                        }, 2000);
                    },
                    error: function(xhr, status, error) {
                        Swal.fire({
                            title: "Erro!",
                            text: "Verifique se o Paciente foi Selecionado!",
                            icon: "error"
                        });
                    }
                });
            }
        });
    });

    // Manipulação do modal de edição de procedimento de Hiperidrose
    $(document).on("click", ".editarProcedimento", function() {
        $("#editarProcedimentoHiperidrose").modal("show");

        var procedimentoHiperidroseId = $(this).data("id");
        $("#idEditarProcedimentoHiperidrose").val(procedimentoHiperidroseId);

        $.ajax({
            url: "/hiperidrose/getById",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ id: procedimentoHiperidroseId }),
            success: function(data) {
                $("#upIdPacienteProcedimento").val(data.pacienteId);
                $("#upDataProcedimento").val(data.data);
                $("#upProtocoloUtilizado").val(data.protocoloUtilizado);
                $("#upResultadoObservado").val(data.resultadoObservado);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erro ao buscar dados do procedimento:", textStatus, errorThrown);
            }
        });
    });

    // Manipulação da edição de procedimento de Hiperidrose
    $("#botaoEditarProcedimentoHiperidrose").on("click", function() {
        var idProcedimentoHiperidrose = $("#idEditarProcedimentoHiperidrose").val();
        var protocoloUtilizado = $("#upProtocoloUtilizado").val();
        var resultadoObservado = $("#upResultadoObservado").val();

        $.ajax({
            url: "/hiperidrose/editar/" + idProcedimentoHiperidrose,
            type: "POST",
            data: {
                protocoloUtilizado: protocoloUtilizado,
                resultadoObservado: resultadoObservado
            },
            success: function(response) {
                Swal.fire({
                    title: "Sucesso!",
                    text: "Procedimento atualizado com sucesso!",
                    icon: "success"
                });
                tabelaHiperidroseProc.ajax.reload(); // Recarrega os dados da tabela
            },
            error: function(xhr, status, error) {
                Swal.fire({
                    title: "Erro!",
                    text: "Ocorreu um erro ao atualizar o procedimento.",
                    icon: "error"
                });
            }
        });
    });

    // Manipulação da exclusão de procedimento de Hiperidrose
    $(document).on("click", ".botaoDeletarProcedimento", function() {
        var procedimentoHiperidroseId = $(this).data("id");

        Swal.fire({
            title: "Tem certeza?",
            text: "Você deseja excluir este procedimento?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/hiperidrose/delete/" + procedimentoHiperidroseId,
                    type: "POST",
                    success: function(response) {
                        Swal.fire({
                            title: "Excluído!",
                            text: "O procedimento foi excluído.",
                            icon: "success"
                        });
                        tabelaHiperidroseProc.ajax.reload(); // Recarrega os dados da tabela
                    },
                    error: function(xhr, status, error) {
                        Swal.fire({
                            title: "Erro!",
                            text: "Ocorreu um erro ao excluir o procedimento.",
                            icon: "error"
                        });
                    }
                });
            }
        });
    });

    // Função para limpar os campos do formulário
    function limparCampos() {
        $("#quantidadeUnidades, #dataAplicacao, #duracaoEfeito, #recomendacoes").val("");
        $("#areaAplicacao, #tipoHiperidrose").val("");
    }
});
