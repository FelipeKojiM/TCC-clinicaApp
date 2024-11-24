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

    $("#salvarPeeling").on("click", function (e) {
        e.preventDefault();

        var pacientePeeling = $("#pacientePeeling").val();
        var quantidadeAplicadaPeeling = $("#quantidadeAplicadaPeeling").val();
        var marcaProdutoPeeling = $("#marcaProdutoPeeling").val();
        var observacoesPeeling = $("#observacoesPeeling").val();

        $.ajax({
            type: "POST",
            url: "/procedimentoPeeling/salvar",
            data: {
                pacienteId: pacientePeeling,
                quantidadeAplicada: quantidadeAplicadaPeeling,
                marcaProduto: marcaProdutoPeeling,
                observacoes: observacoesPeeling
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
                    $("#pacientePeeling").val('');
                    $("#quantidadeAplicadaPeeling").val('');
                    $("#marcaProdutoPeeling").val('');
                    $("#observacoesPeeling").val('');
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