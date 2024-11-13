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
});