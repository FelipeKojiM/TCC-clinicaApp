// $(document).ready(function() {
//     $(".select2").select2({
//         placeholder: "Selecione opções",
//         allowClear: true,
//         width: "100%",
//         closeOnSelect: false
//     });
//
//     var tabelaHiperidroseProc = $("#tabelaHiperidroseProc").DataTable({
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
//             infoFiltered: "(filtrado de _MAX_ registros no total)"
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
//         drawCallback: function(settings) {
//             var api = this.api();
//             var pageInfo = api.page.info();
//             var numRecords = pageInfo.recordsDisplay;
//
//             if (numRecords <= 10) {
//                 $('#tabelaHiperidroseProc').css('height', 'auto');
//             } else {
//                 $('#tabelaHiperidroseProc').css('height', '400px');
//             }
//         }
//     });
//
//     $("#formSalvarProcedimentoHiperidrose").on("submit", function(e) {
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
//                     success: function(response) {
//                         Swal.fire({
//                             title: "Sucesso!",
//                             text: "Procedimento salvo com sucesso!",
//                             icon: "success"
//                         });
//                         var pacienteId = $("#pacienteId").val();
//                         if (pacienteId) {
//                             $.ajax({
//                                 url: "/get/" + pacienteId,
//                                 type: "GET",
//                                 success: function(data) {
//                                     tabelaHiperidroseProc.clear();
//
//                                     if (Array.isArray(data) && data.length > 0) {
//                                         $.each(data, function(index, item) {
//                                             tabelaHiperidroseProc.row.add({
//                                                 id: item.id,
//                                                 data: item.data,
//                                                 protocoloUtilizado: item.protocoloUtilizado,
//                                                 resultadoObservado: item.resultadoObservado,
//                                                 acoes: '<ul class="list-inline m-0"><li class="list-inline-item"><button class="btn btn-danger btn-sm rounded-0 botaoDeletarProcedimento" type="button" title="Delete" data-id="' + item.id + '"><i class="fa fa-trash"></i></button></li>' +
//                                                     '<li class="list-inline-item"><button class="btn btn-success btn-sm rounded-0 editarProcedimento" type="button" title="Editar" data-id="' + item.id + '"><i class="fa fa-edit"></i></button></li></ul>'
//                                             }).draw();
//                                         });
//                                     } else {
//                                         tabelaHiperidroseProc.clear().draw();
//                                     }
//                                 },
//                                 error: function(jqXHR, textStatus, errorThrown) {
//                                     tabelaHiperidroseProc.clear().draw();
//                                     console.error("Erro na requisição: ", textStatus, errorThrown);
//                                 }
//                             });
//                         }
//                         setTimeout(function() {
//                             $('#modalProcedimento').modal('hide');
//                         }, 2000);
//                     },
//                     error: function(xhr, status, error) {
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
//
//     $(document).on("click", ".editarProcedimento", function() {
//         $("#editarProcedimentoHiperidrose").modal("show");
//
//         var procedimentoHiperidroseId = $(this).data("id");
//         $("#idEditarProcedimentoHiperidrose").val(procedimentoHiperidroseId);
//
//         $.ajax({
//             url: "/getProcedimentoHiperhidroseById",
//             type: "POST",
//             contentType: "application/json",
//             data: JSON.stringify({ id: procedimentoHiperidroseId }),
//             success: function(data) {
//                 $("#upIdPacienteProcedimento").val(data.pacienteId);
//                 $("#upDataProcedimento").val(data.data);
//                 $("#upProtocoloUtilizado").val(data.protocoloUtilizado);
//                 $("#upResultadoObservado").val(data.resultadoObservado);
//             },
//             error: function(jqXHR, textStatus, errorThrown) {
//                 console.error("Erro ao buscar dados do procedimento:", textStatus, errorThrown);
//             }
//         });
//     });
//
//     $("#botaoEditarProcedimentoHiperidrose").on("click", function() {
//         var idProcedimentoHiperidrose = $("#idEditarProcedimentoHiperidrose").val();
//         var protocoloUtilizado = $("#upProtocoloUtilizado").val();
//         var resultadoObservado = $("#upResultadoObservado").val();
//
//         $.ajax({
//             url: "/hiperidrose/editar/" + idProcedimentoHiperidrose,
//             type: "POST",
//             data: {
//                 protocoloUtilizado: protocoloUtilizado,
//                 resultadoObservado: resultadoObservado
//             },
//             success: function(response) {
//                 Swal.fire({
//                     title: "Sucesso!",
//                     text: "Procedimento atualizado com sucesso!",
//                     icon: "success"
//                 });
//                 tabelaHiperidroseProc.ajax.reload(); // Recarrega os dados da tabela
//             },
//             error: function(xhr, status, error) {
//                 Swal.fire({
//                     title: "Erro!",
//                     text: "Ocorreu um erro ao atualizar o procedimento.",
//                     icon: "error"
//                 });
//             }
//         });
//     });
//
//     // Manipulação da exclusão de procedimento de Hiperidrose
//     $(document).on("click", ".botaoDeletarProcedimento", function() {
//         var procedimentoHiperidroseId = $(this).data("id");
//
//         Swal.fire({
//             title: "Tem certeza?",
//             text: "Você deseja excluir este procedimento?",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Sim, excluir!",
//             cancelButtonText: "Cancelar"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 $.ajax({
//                     url: "/hiperidrose/delete/" + procedimentoHiperidroseId,
//                     type: "POST",
//                     success: function(response) {
//                         Swal.fire({
//                             title: "Excluído!",
//                             text: "O procedimento foi excluído.",
//                             icon: "success"
//                         });
//                         tabelaHiperidroseProc.ajax.reload(); // Recarrega os dados da tabela
//                     },
//                     error: function(xhr, status, error) {
//                         Swal.fire({
//                             title: "Erro!",
//                             text: "Ocorreu um erro ao excluir o procedimento.",
//                             icon: "error"
//                         });
//                     }
//                 });
//             }
//         });
//     });
//
//     // Função para limpar os campos do formulário
//     function limparCampos() {
//         $("#quantidadeUnidades, #dataAplicacao, #duracaoEfeito, #recomendacoes").val("");
//         $("#areaAplicacao, #tipoHiperidrose").val("");
//     }
// });
