$(document).ready(function () {

    var Paciente = '';

    $("#paciente").on("change", function() {
        var idPaciente = $("#paciente").val();
        $.post("pacientes/getById/" + idPaciente, function(data) {
            Paciente                = data.nome;
            var nomePaciente = "<b>"+data.nome+"</b>"
            var cpfPaciente  = "<b>"+data.cpf+"</b>"
            $("#nomePaciente").html(nomePaciente);
            $("#cpfPaciente").html(cpfPaciente);

            $("#cpfPaciente").inputmask("999.999.999-99", { placeholder: " " });
        });
    });

    $("#valorPagamento").inputmask("R$ 9.999,99", { placeholder: " " });

    $("#gerarPdf").on("click", function() {
        var paciente       = $("#paciente").val();
        var valorPagamento = $("#valorPagamento").val();
        var formaPagamento = $("#formaPagamento").val();

        console.log("Paciente: ", paciente);
        console.log("Valor Pagamento: ", valorPagamento);
        console.log("Forma Pagamento: ", formaPagamento);

        // Verificar se todos os campos estão preenchidos
        if ((paciente !== '') && (valorPagamento !== '') && (formaPagamento !== '')) {
            const element = document.querySelector(".container");

            // Configurações personalizadas para o html2pdf
            const opt = {
                margin: [0, 5, 0, 0],
                html2canvas: {
                    scale: 10 // Resolução menor, o conteúdo fica menor
                }
            };

            // Gera o PDF com as configurações
            html2pdf().from(element).set(opt).save(""+Paciente+".pdf");
        } else {
            // Exibe erro caso algum campo esteja vazio
            Swal.fire({
                title: "Erro!",
                text: "Informe todas as Opções.",
                icon: "error"
            });
        }
    });

});
