$(document).ready(function (){

    $("#pacientePeeling").change(function (){
        var pacienteId = $(this).val();

        if(pacienteId){
            $.ajax({
                url: "/listProcedimentosPeelingById/" + pacienteId,
                type: "GET",
                success: function (data) {
                    $("#tabelaPeeling tbody").empty();
                    data.forEach(function (peeling) {
                        var preenchimentoRow = '<tr>' +
                            '<td>' + peeling.id + '</td>' +
                            '<td>' + peeling.data + '</td>' +
                            '<td>' + peeling.quantidadeAplicada + '</td>' +
                            '<td>' + peeling.marcaProduto + '</td>' +
                            '<td>' + peeling.observacoes + '</td>' +
                            '</tr>';
                        $("#tabelaPeeling").append(preenchimentoRow);
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("Erro na requisição: ", textStatus, errorThrown);
                }
            });
        }
    });
});