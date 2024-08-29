// $(document).ready(function() {
//     $(".select2").select2({
//         placeholder: "Selecione opções",
//         allowClear: true,
//         width: "100%",
//         closeOnSelect: false
//     });
//
//     //inicia a data table procedimentos de botox
//     var tabelaBotoxProc = $("#tabelaBotoxProc").DataTable({
//         pageLength: 10,
//         paging: true,
//         lengthChange: false,
//         searching: true,
//         ordering: true,
//         info: true,
//         language: {
//             search: "Buscar:",
//             lengthMenu: "Mostrar _MENU_ registros por página",
//             info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
//             infoEmpty: "Nenhum registro disponível",
//             infoFiltered: "(filtrado de _MAX_ registros no total)",
//         },
//         dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 text-md-right"f>>' +
//             '<"row"<"col-sm-12"tr>>' +
//             '<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6 text-md-right"p>>',
//         columns: [
//             { data: 'id' },
//             { data: 'data' },
//             { data: 'protocoloUtilizado' },
//             { data: 'resultadoObservado' },
//             { data: 'acoes', orderable: false }
//         ],
//         columnDefs: [
//             { width: "10%", targets: 0, className: "text-left" },
//             { width: "20%", targets: 1, className: "text-left" },
//             { width: "30%", targets: 2, className: "text-left" },
//             { width: "30%", targets: 3, className: "text-left" },
//             { width: "10%", targets: 4, className: "text-left" }
//         ],
//     });
// });
//
// $(document).ready(function() {
//     $("#formSalvarFichaBotox").on("submit", function (e) {
//         e.preventDefault();
//
//         var form = $(this);
//         var formData = form.serialize();
//
//         Swal.fire({
//             title: "Tem certeza?",
//             text: "Você deseja salvar essas informações?",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor:"#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Sim!",
//             cancelButtonText: "Cancelar"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 $.ajax({
//                     url: form.attr("action"),
//                     type: "POST",
//                     data: formData,
//                     success: function (response) {
//                         Swal.fire({
//                             title: "Sucesso!",
//                             text: "Ficha salva com sucesso!",
//                             icon: "success"
//                         });
//                         setTimeout(function () {
//                             window.location.href = "/procedimentos#botox";
//                         }, 2000);
//                     },
//                     error: function (xhr, status, error) {
//                         Swal.fire({
//                             title: "Erro!",
//                             text: "Ocorreu um erro ao salvar a ficha.",
//                             icon: "error"
//                         });
//                     }
//                 });
//             }
//         });
//     });
//
//     $("#paciente").change(function () {
//         var pacienteId = $(this).val();
//         $("#pacienteIdBotox").val(pacienteId);
//
//         if (pacienteId) {
//             $.ajax({
//                 url: "/getFichaBotoxById" + pacienteId,
//                 type: "GET",
//                 success: function (data) {
//                     if (data) {
//                         $("#quantidadeUnidades").val(data.quantidadeUnidades);
//                         $("#areaAplicacao").val(data.areaAplicacao);
//                         $("#tipoBotox").val(data.tipoBotox);
//                         $("#dataAplicacao").val(data.dataAplicacao);
//                         $("#duracaoEfeito").val(data.duracaoEfeito);
//                         $("#recomendacoes").val(data.recomendacoes);
//
//                         $("#fichaBotoxId").val(data.fichaId || "");
//                     } else {
//                         limparCampos();
//                     }
//                 }
//             });
//         } else {
//             limparCampos();
//         }
//     });
// });
//
//
// $(document).ready(function () {
//     var tabelaBotoxProc = $("#tabelaBotoxProc").DataTable({
//         pageLength: 10,
//         paging: true,
//         lengthChange: false,
//         searching: true,
//         ordering: true,
//         info: true,
//         language: {
//             search: "Buscar:",
//             lengthMenu: "Mostrar _MENU_ registros por página",
//             info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
//             infoEmpty: "Nenhum registro disponível",
//             infoFiltered: "(filtrado de _MAX_ registros no total)",
//         },
//         dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 text-md-right"f>>' +
//             '<"row"<"col-sm-12"tr>>' +
//             '<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6 text-md-right"p>>',
//         columns: [
//             { data: 'id' },
//             { data: 'data' },
//             { data: 'protocoloUtilizado' },
//             { data: 'resultadoObservado' },
//             { data: 'acoes', orderable: false }
//         ],
//         columnDefs: [
//             { width: "10%", targets: 0, className: "text-left" },
//             { width: "20%", targets: 1, className: "text-left" },
//             { width: "30%", targets: 2, className: "text-left" },
//             { width: "30%", targets: 3, className: "text-left" },
//             { width: "10%", targets: 4, className: "text-left" }
//         ],
//         drawCallback: function (settings) {
//             var api = this.api();
//             var pageInfo = api.page.info();
//             var numRecords = pageInfo.recordsDisplay;
//
//             if (numRecords <= 10) {
//                 $('#tabelaBotoxProc').css('height', 'auto');
//             } else {
//                 $('#tabelaBotoxProc').css('height', '400px');
//             }
//         }
//     });
//
//     $("#paciente").change(function () {
//         var pacienteId = $(this).val();
//         $("#pacienteIdBotox").val(pacienteId);
//
//         if (pacienteId) {
//             $.ajax({
//                 url: "/getProcedimentoBotoxById/" + pacienteId,
//                 type: "GET",
//                 success: function (data) {
//                     tabelaBotoxProc.clear(); // Clear the table before adding new data
//
//                     if (Array.isArray(data) && data.length > 0) {
//                         $.each(data, function (index, item) {
//                             tabelaBotoxProc.row.add({
//                                 id: item.id,
//                                 data: item.data,
//                                 protocoloUtilizado: item.protocoloUtilizado,
//                                 resultadoObservado: item.resultadoObservado,
//                                 acoes: '<ul class="list-inline m-0"><li class="list-inline-item"><button class="btn btn-danger btn-sm rounded-0 botaoDeletarProcedimento" type="button" title="Delete" data-id="' + item.id + '"><i class="fa fa-trash"></i></button></li>' +
//                                     '<li class="list-inline-item"><button class="btn btn-success btn-sm rounded-0 editarProcedimento" type="button" title="Editar" data-id="' + item.id + '"><i class="fa fa-edit"></i></button></li></ul>'
//                             }).draw();
//                         });
//                     } else {
//                         tabelaBotoxProc.clear().draw(); // Clear the table if no data
//                     }
//                 },
//                 error: function (jqXHR, textStatus, errorThrown) {
//                     tabelaBotoxProc.clear().draw(); // Clear the table on error
//                     console.error("Erro na requisição: ", textStatus, errorThrown);
//                 }
//             });
//         } else {
//             tabelaBotoxProc.clear().draw(); // Clear the table if no paciente selected
//         }
//     });
//
//     $("#formSalvarProcedimentoBotox").on("submit", function (e) {
//         e.preventDefault();
//
//         var form = $(this);
//         var formData = form.serialize();
//
//         Swal.fire({
//             title: "Tem certeza?",
//             text: "Você deseja salvar essas informações?",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Sim!",
//             cancelButtonText: "Cancelar"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 $.ajax({
//                     url: form.attr("action"),
//                     type: "POST",
//                     data: formData,
//                     success: function (response) {
//                         Swal.fire({
//                             title: "Sucesso!",
//                             text: "Procedimento salvo com sucesso!",
//                             icon: "success"
//                         });
//                         var pacienteId = $("#pacienteIdBotox").val();
//                         if (pacienteId) {
//                             $.ajax({
//                                 url: "/getProcedimentoBotoxBy/" + pacienteId,
//                                 type: "GET",
//                                 success: function (data) {
//                                     tabelaBotoxProc.clear(); // Clear existing data
//                                     if (Array.isArray(data) && data.length > 0) {
//                                         $.each(data, function (index, item) {
//                                             tabelaBotoxProc.row.add({
//                                                 id: item.id,
//                                                 data: item.data,
//                                                 protocoloUtilizado: item.protocoloUtilizado,
//                                                 resultadoObservado: item.resultadoObservado,
//                                                 acoes: '<ul class="list-inline m-0"><li class="list-inline-item"><button class="btn btn-danger btn-sm rounded-0 botaoDeletarProcedimento" type="button" title="Delete" data-id="' + item.id + '"><i class="fa fa-trash"></i></button></li>' +
//                                                     '<li class="list-inline-item"><button class="btn btn-success btn-sm rounded-0 editarProcedimento" type="button" title="Editar" data-id="' + item.id + '"><i class="fa fa-edit"></i></button></li></ul>'
//                                             }).draw();
//                                         });
//                                     } else {
//                                         tabelaBotoxProc.clear().draw();
//                                     }
//                                 },
//                                 error: function (jqXHR, textStatus, errorThrown) {
//                                     tabelaBotoxProc.clear().draw();
//                                     console.error("Erro na requisição: ", textStatus, errorThrown);
//                                 }
//                             });
//                         }
//                         setTimeout(function () {
//                             $('#modalProcedimento').modal('hide'); // Assuming you have a modal with this ID
//                         }, 2000);
//                     },
//                     error: function (xhr, status, error) {
//                         Swal.fire({
//                             title: "Erro!",
//                             text: "Verifique se o Paciente foi Selecionado!",
//                             icon: "error"
//                         });
//                     }
//                 });
//             }
//         });
//     });
// });
//
// $(document).ready(function () {
//
//     // Código para mostrar e preencher o modal
//     $(document).on("click", ".editarProcedimento", function () {
//         $("#editarProcedimentoBotox").modal("show");
//
//         var procedimentoBotoxId = $(this).data("id");
//         $("#idEditarProcedimentoBotox").val(procedimentoBotoxId);
//
//         $.ajax({
//             url: "/getProcedimentoBotoxById",
//             type: "POST",
//             contentType: "application/json",
//             data: JSON.stringify({ id: procedimentoBotoxId }),
//             success: function (data) {
//                 $("#upIdPacienteProcedimentoBotox").val(data.pacienteId);
//                 $("#upDataProcedimento").val(data.data);
//                 $("#upProtocoloUtilizado").val(data.protocoloUtilizado);
//                 $("#upResultadoObservado").val(data.resultadoObservado);
//             },
//             error: function (jqXHR, textStatus, errorThrown) {
//                 console.error("Erro ao buscar dados do procedimento:", textStatus, errorThrown);
//             }
//         });
//     });
//
//     $("#botaoEditarProcedimentoBotox").on("click", function () {
//         var idProcedimentoBotox = $("#idEditarProcedimentoBotox").val();
//         var protocoloUtilizado = $("#upProtocoloUtilizado").val();
//         var resultadoObservado = $("#upResultadoObservado").val();
//         var dataProcedimento = $("#upDataProcedimento").val();
//         var IdPacienteProcedimento = $("#upIdPacienteProcedimento").val();
//
//         if (protocoloUtilizado !== "" && resultadoObservado !== "") {
//             Swal.fire({
//                 title: "Tem certeza?",
//                 text: "Deseja realmente editar as informações do Tratamento?",
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonColor: "#3085d6",
//                 cancelButtonColor: "#d33",
//                 confirmButtonText: "Sim!",
//                 cancelButtonText: "Cancelar"
//             }).then((result) => {
//                 if (result.isConfirmed) {
//                     $.ajax({
//                         type: "POST",
//                         url: "/editarProcedimentoBotox/" + idProcedimentoBotox,
//                         data: {
//                             protocoloUtilizado: protocoloUtilizado,
//                             resultadoObservado: resultadoObservado,
//                             data: dataProcedimento,
//                             pacienteId: IdPacienteProcedimento
//                         },
//                         success: function (response) {
//                             Swal.fire({
//                                 title: "Sucesso!",
//                                 text: "As informações do tratamento foram atualizadas.",
//                                 icon: "success"
//                             }).then(() => {
//                                 var table = $("#tabelaBotoxProc").DataTable();
//                                 var row = table.row(function(idx, data, node) {
//                                     return data.id == idProcedimentoBotox;
//                                 });
//                                 row.data({
//                                     id: idProcedimentoBotox,
//                                     data: dataProcedimento,
//                                     protocoloUtilizado: protocoloUtilizado,
//                                     resultadoObservado: resultadoObservado,
//                                     acoes: '<ul class="list-inline m-0"><li class="list-inline-item"><button class="btn btn-danger btn-sm rounded-0 botaoDeletarProcedimento" type="button" title="Delete" data-id="' + idProcedimentoBotox + '"><i class="fa fa-trash"></i></button></li>' +
//                                         '<li class="list-inline-item"><button class="btn btn-success btn-sm rounded-0 editarProcedimento" type="button" title="Editar" data-id="' + idProcedimentoBotox + '"><i class="fa fa-edit"></i></button></li></ul>'
//                                 }).draw(false);
//
//                                 $("#editarProcedimentoBotox").modal("hide");
//                             });
//                         },
//                         error: function (xhr, status, error) {
//                             Swal.fire({
//                                 title: "Erro!",
//                                 text: "Ocorreu um erro ao tentar editar as informações do tratamento.",
//                                 icon: "error"
//                             });
//                         }
//                     });
//                 }
//             });
//         } else {
//             Swal.fire({
//                 title: "Campos obrigatórios",
//                 text: "Preencha todos os campos obrigatórios.",
//                 icon: "warning"
//             });
//         }
//     });
// });
//
// $(document).ready(function () {
//     $(document).on("click", ".botaoDeletarProcedimento", function () {
//         var idProcedimentoBotox = $(this).data('id');
//
//         Swal.fire({
//             title: "Tem certeza?",
//             text: "Deseja realmente deletar este procedimento?",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Deletar!",
//             cancelButtonText: "Cancelar",
//             customClass: {
//                 confirmButton: 'btn btn-primary custom-border',
//             }
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 $.ajax({
//                     url: "/deleteProcedimentoBotox",
//                     type: "POST",
//                     contentType: "application/json",
//                     data: JSON.stringify({ id: idProcedimentoBotox }),
//                     success: function (response) {
//                         Swal.fire({
//                             title: "Sucesso!",
//                             text: "O Procedimento foi deletado com Sucesso.",
//                             icon: "success"
//                         }).then(() => {
//                             var table = $("#tabelaBotoxProc").DataTable();
//                             var row = table.row(function(idx, data, node) {
//                                 return data.id == idProcedimentoBotox;
//                             });
//                             row.remove().draw(false); // Remover a linha e atualizar a tabela
//                         });
//                     },
//                     error: function (xhr) {
//                         Swal.fire({
//                             title: "Erro!",
//                             text: "Ocorreu um erro ao tentar deletar o procedimento.",
//                             icon: "error"
//                         });
//                     }
//                 });
//             }
//         });
//     });
// });
//
// $("#limparCampos").on("click", function(e) {
//     e.preventDefault();
//     limparCampos();
// });
//
// function limparCampos() {
//     $("#queixaPrincipal, #tempoProblema, #doencaExistente, #medicacao, #tricoscopia, #condicaoProblema, #condicaoCabelo, #novosFios, #tratamentoAnterior, #suplemento, #contraceptivo, #alimentacao, #atividadeFisica, #sono, #estresse").val("");
//     $('#couroCabeludo').val([]).trigger('change');
// }
