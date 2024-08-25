$(document).ready(function() {
    $(".select2").select2({
        placeholder: "Selecione opções",
        allowClear: true,
        width: "100%",
        closeOnSelect: false
    });
});

$(document).ready(function() {
    $("#formSalvarFichaCapilar").on("submit", function (e) {
        e.preventDefault();

        var form = $(this);
        var formData = form.serialize();

        Swal.fire({
            title: "Tem certeza?",
            text: "Você deseja salvar essas informações?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor:"#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: form.attr("action"),
                    type: "POST",
                    data: formData,
                    success: function (response) {
                        Swal.fire({
                            title: "Sucesso!",
                            text: "Ficha salva com sucesso!",
                            icon: "success"
                        });
                        setTimeout(function () {
                            window.location.href = "/procedimentos#capilar";
                        }, 2000);
                    },
                    error: function (xhr, status, error) {
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

    $("#paciente").change(function () {
        var pacienteId = $(this).val();
        $("#pacienteId").val(pacienteId);

        if (pacienteId) {
            $.ajax({
                url: "/procedimento/paciente/" + pacienteId,
                type: "GET",
                success: function (data) {
                    if (data) {
                        $("#queixaPrincipal").val(data.queixaPrincipal);
                        $("#tempoProblema").val(data.tempoProblema);
                        $("#doencaExistente").val(data.doencaExistente);
                        $("#medicacao").val(data.medicacao);
                        $("#tricoscopia").val(data.tricoscopia);
                        $("#condicaoProblema").val(data.condicaoProblema);
                        $("#condicaoCabelo").val(data.condicaoCabelo);

                        var selectedValues = data.couroCabeludo;
                        var selectedArray = selectedValues.split(",");
                        $("#couroCabeludo").val(selectedArray).trigger("change");

                        $("#novosFios").val(data.novosFios);
                        $("#tratamentoAnterior").val(data.tratamentoAnterior);
                        $("#suplemento").val(data.suplemento);
                        $("#contraceptivo").val(data.contraceptivo);
                        $("#alimentacao").val(data.alimentacao);
                        $("#atividadeFisica").val(data.atividadeFisica);
                        $("#sono").val(data.sono);
                        $("#estresse").val(data.estresse);

                        // Adicionar o ID da ficha no formulário para identificar a atualização
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
});


$(document).ready(function () {
    var tabelaCapilarProc = $("#tabelaCapilarProc").DataTable({
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
        drawCallback: function (settings) {
            var api = this.api();
            var pageInfo = api.page.info();
            var numRecords = pageInfo.recordsDisplay;

            if (numRecords <= 10) {
                $('#tabelaCapilarProc').css('height', 'auto');
            } else {
                $('#tabelaCapilarProc').css('height', '400px');
            }
        }
    });

    $("#paciente").change(function () {
        var pacienteId = $(this).val();
        $("#pacienteIdFicha").val(pacienteId);

        if (pacienteId) {
            $.ajax({
                url: "/procedimentos/" + pacienteId,
                type: "GET",
                success: function (data) {
                    tabelaCapilarProc.clear(); // Clear the table before adding new data

                    if (Array.isArray(data) && data.length > 0) {
                        $.each(data, function (index, item) {
                            tabelaCapilarProc.row.add({
                                id: item.id,
                                data: item.data,
                                protocoloUtilizado: item.protocoloUtilizado,
                                resultadoObservado: item.resultadoObservado,
                                acoes: '<ul class="list-inline m-0"><li class="list-inline-item"><button class="btn btn-danger btn-sm rounded-0 botaoDeletarProcedimento" type="button" title="Delete" data-id="' + item.id + '"><i class="fa fa-trash"></i></button></li>' +
                                    '<li class="list-inline-item"><button class="btn btn-success btn-sm rounded-0 editarProcedimento" type="button" title="Editar" data-id="' + item.id + '"><i class="fa fa-edit"></i></button></li></ul>'
                            }).draw();
                        });
                    } else {
                        tabelaCapilarProc.clear().draw(); // Clear the table if no data
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    tabelaCapilarProc.clear().draw(); // Clear the table on error
                    console.error("Erro na requisição: ", textStatus, errorThrown);
                }
            });
        } else {
            tabelaCapilarProc.clear().draw(); // Clear the table if no paciente selected
        }
    });

    $("#formSalvarProcedimentoCapilar").on("submit", function (e) {
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
                    success: function (response) {
                        Swal.fire({
                            title: "Sucesso!",
                            text: "Procedimento salvo com sucesso!",
                            icon: "success"
                        });
                        var pacienteId = $("#pacienteId").val();
                        if (pacienteId) {
                            $.ajax({
                                url: "/procedimentosCapilar/" + pacienteId,
                                type: "GET",
                                success: function (data) {
                                    tabelaCapilarProc.clear(); // Clear existing data
                                    if (Array.isArray(data) && data.length > 0) {
                                        $.each(data, function (index, item) {
                                            tabelaCapilarProc.row.add({
                                                id: item.id,
                                                data: item.data,
                                                protocoloUtilizado: item.protocoloUtilizado,
                                                resultadoObservado: item.resultadoObservado,
                                                acoes: '<ul class="list-inline m-0"><li class="list-inline-item"><button class="btn btn-danger btn-sm rounded-0 botaoDeletarProcedimento" type="button" title="Delete" data-id="' + item.id + '"><i class="fa fa-trash"></i></button></li>' +
                                                    '<li class="list-inline-item"><button class="btn btn-success btn-sm rounded-0 editarProcedimento" type="button" title="Editar" data-id="' + item.id + '"><i class="fa fa-edit"></i></button></li></ul>'
                                            }).draw();
                                        });
                                    } else {
                                        tabelaCapilarProc.clear().draw();
                                    }
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    tabelaCapilarProc.clear().draw();
                                    console.error("Erro na requisição: ", textStatus, errorThrown);
                                }
                            });
                        }
                        setTimeout(function () {
                            $('#modalProcedimento').modal('hide'); // Assuming you have a modal with this ID
                        }, 2000);
                    },
                    error: function (xhr, status, error) {
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
});

$(document).ready(function () {
    // Código para mostrar e preencher o modal
    $(document).on("click", ".editarProcedimento", function () {
        $("#editarProcedimentoCapilar").modal("show");

        var procedimentoCapilarId = $(this).data("id");
        $("#idEditarProcedimentoCapilar").val(procedimentoCapilarId);

        $.ajax({
            url: "/procedimentoCapilar/getById",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ id: procedimentoCapilarId }),
            success: function (data) {
                $("#upIdPacienteProcedimento").val(data.pacienteId);
                $("#upDataProcedimento").val(data.data);
                $("#upProtocoloUtilizado").val(data.protocoloUtilizado);
                $("#upResultadoObservado").val(data.resultadoObservado);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Erro ao buscar dados do procedimento:", textStatus, errorThrown);
            }
        });
    });

$(document).ready(function () {

    // Código para mostrar e preencher o modal
    $(document).on("click", ".editarProcedimento", function () {
        $("#editarProcedimentoCapilar").modal("show");

        var procedimentoCapilarId = $(this).data("id");
        $("#idEditarProcedimentoCapilar").val(procedimentoCapilarId);

        $.ajax({
            url: "/procedimentoCapilar/getById",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ id: procedimentoCapilarId }),
            success: function (data) {
                $("#upIdPacienteProcedimento").val(data.pacienteId);
                $("#upDataProcedimento").val(data.data);
                $("#upProtocoloUtilizado").val(data.protocoloUtilizado);
                $("#upResultadoObservado").val(data.resultadoObservado);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Erro ao buscar dados do procedimento:", textStatus, errorThrown);
            }
        });
    });

    $("#botaoEditarProcedimentoCapilar").on("click", function () {
        var idProcedimentoCapilar = $("#idEditarProcedimentoCapilar").val();
        var protocoloUtilizado = $("#upProtocoloUtilizado").val();
        var resultadoObservado = $("#upResultadoObservado").val();
        var dataProcedimento = $("#upDataProcedimento").val();
        var IdPacienteProcedimento = $("#upIdPacienteProcedimento").val();

        if (protocoloUtilizado !== "" && resultadoObservado !== "") {
            Swal.fire({
                title: "Tem certeza?",
                text: "Deseja realmente editar as informações do Tratamento?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim!",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        type: "POST",
                        url: "/procedimentoCapilar/" + idProcedimentoCapilar,
                        data: {
                            protocoloUtilizado: protocoloUtilizado,
                            resultadoObservado: resultadoObservado,
                            data: dataProcedimento,
                            pacienteId: IdPacienteProcedimento
                        },
                        success: function (response) {
                            Swal.fire({
                                title: "Sucesso!",
                                text: "As informações do tratamento foram atualizadas.",
                                icon: "success"
                            }).then(() => {
                                var table = $("#tabelaCapilarProc").DataTable();
                                var row = table.row(function(idx, data, node) {
                                    return data.id == idProcedimentoCapilar;
                                });
                                row.data({
                                    id: idProcedimentoCapilar,
                                    data: dataProcedimento,
                                    protocoloUtilizado: protocoloUtilizado,
                                    resultadoObservado: resultadoObservado,
                                    acoes: '<ul class="list-inline m-0"><li class="list-inline-item"><button class="btn btn-danger btn-sm rounded-0 botaoDeletarProcedimento" type="button" title="Delete" data-id="' + idProcedimentoCapilar + '"><i class="fa fa-trash"></i></button></li>' +
                                        '<li class="list-inline-item"><button class="btn btn-success btn-sm rounded-0 editarProcedimento" type="button" title="Editar" data-id="' + idProcedimentoCapilar + '"><i class="fa fa-edit"></i></button></li></ul>'
                                }).draw(false);

                                $("#editarProcedimentoCapilar").modal("hide");
                            });
                        },
                        error: function (xhr, status, error) {
                            Swal.fire({
                                title: "Erro!",
                                text: "Ocorreu um erro ao tentar editar as informações do tratamento.",
                                icon: "error"
                            });
                        }
                    });
                }
            });
        } else {
            Swal.fire({
                title: "Campos obrigatórios",
                text: "Preencha todos os campos obrigatórios.",
                icon: "warning"
                });
            }
        });
    });
});

$(document).ready(function () {
    $(document).on("click", ".botaoDeletarProcedimento", function () {
        var idProcedimentoCapilar = $(this).data('id');

        Swal.fire({
            title: "Tem certeza?",
            text: "Deseja realmente deletar este procedimento?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Deletar!",
            cancelButtonText: "Cancelar",
            customClass: {
                confirmButton: 'btn btn-primary custom-border',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/procedimento/delete",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({ id: idProcedimentoCapilar }),
                    success: function (response) {
                        Swal.fire({
                            title: "Sucesso!",
                            text: "O Procedimento foi deletado com Sucesso.",
                            icon: "success"
                        }).then(() => {
                            var table = $("#tabelaCapilarProc").DataTable();
                            var row = table.row(function(idx, data, node) {
                                return data.id == idProcedimentoCapilar;
                            });
                            row.remove().draw(false); // Remover a linha e atualizar a tabela
                        });
                    },
                    error: function (xhr) {
                        Swal.fire({
                            title: "Erro!",
                            text: "Ocorreu um erro ao tentar deletar o procedimento.",
                            icon: "error"
                        });
                    }
                });
            }
        });
    });
});

$("#limparCampos").on("click", function(e) {
    e.preventDefault();
    limparCampos();
});

function limparCampos() {
    $("#queixaPrincipal, #tempoProblema, #doencaExistente, #medicacao, #tricoscopia, #condicaoProblema, #condicaoCabelo, #novosFios, #tratamentoAnterior, #suplemento, #contraceptivo, #alimentacao, #atividadeFisica, #sono, #estresse").val("");
    $('#couroCabeludo').val([]).trigger('change');
}
