$(document).ready(function (){

    $("#pacientePreenchimento").change(function (){
        var pacienteId = $(this).val();

        if(pacienteId){
            $.ajax({
                url: "/listProcedimentosPreenchimentoById/" + pacienteId,
                type: "GET",
                success: function (data) {
                    $("#tabelaPreenchimento tbody").empty();
                    data.forEach(function (preenchimento) {
                        var preenchimentoRow = '<tr>' +
                            '<td>' + preenchimento.id + '</td>' +
                            '<td>' + preenchimento.data + '</td>' +
                            '<td>' + preenchimento.areaAplicada + '</td>' +
                            '<td>' + preenchimento.quantidadeAplicada + '</td>' +
                            '<td>' + preenchimento.marcaProduto + '</td>' +
                            '<td>' + preenchimento.observacoes + '</td>' +
                            '</tr>';
                        $("#tabelaPreenchimento").append(preenchimentoRow);
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("Erro na requisição: ", textStatus, errorThrown);
                }
            });
        }
    });

    $("#salvarPreenchimento").on("click", function (e) {
        e.preventDefault();

        var pacienteId         = $("#pacientePreenchimento").val();
        var areaAplicada       = $("#areaAplicadaPreenchimento").val();
        var quantidadeAplicada = $("#quantidadeAplicadaPreenchimento").val();
        var marcaProduto       = $("#marcaProdutoPreenchimento").val();
        var observacoes        = $("#observacoesPreenchimento").val();

        $.ajax({
            type: "POST",
            url: "/procedimentoPreenchimento/salvar",
            data: {
                pacienteId: pacienteId,
                areaAplicada: areaAplicada,
                quantidadeAplicada: quantidadeAplicada,
                marcaProduto: marcaProduto,
                observacoes: observacoes
            },
            success: function(response) {
                if (response.status === "success") {
                    Swal.fire({
                        title: "Sucesso!",
                        text: response.message,
                        icon: "success"
                    }).then(() => {
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        title: "Erro!",
                        text: response.message,
                        icon: "error"
                    });
                    $("#pacientePreenchimento").val('');
                    $("#areaAplicadaPreenchimento").val('');
                    $("#quantidadeAplicadaPreenchimento").val('');
                    $("#marcaProdutoPreenchimento").val('');
                    $("#observacoesPreenchimento").val('');
                }
            },
            error: function(xhr, status, error) {
                Swal.fire({
                    title: "Erro!",
                    text: "Ocorreu um erro inesperado!",
                    icon: "error"
                });
            }
        });
    });
});