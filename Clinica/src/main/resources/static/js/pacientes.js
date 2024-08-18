$('#tabelaPacientes').DataTable({
    pageLength: 10, // Número de registros por página
    paging: true,
    responsive: true,
    dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 text-right"f>>' +
        '<"row"<"col-sm-12"tr>>' +
        '<"row"<"col-sm-12 col-md-6"i>>',
    language: {
        search: "Pesquisar:",
        lengthMenu: "Mostrar _MENU_ registros por página",
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
    },
    drawCallback: function (settings) {
        // Ajusta a altura da tabela com base no número de registros
        var api = this.api();
        var pageInfo = api.page.info();
        var numRecords = pageInfo.recordsDisplay;

        // Ajusta a altura da tabela conforme o número de registros
        if (numRecords <= 10) {
            $('#tabelaPacientes').css('height', 'auto'); // Ajuste para altura automática
        } else {
            $('#tabelaPacientes').css('height', '400px'); // Ajuste para altura fixa
        }
    }
});

$(".editarPaciente").on("click", function (){

    var pacienteId = $(this).data('id');
    $("#idPacienteEditar").val(pacienteId);

    $.ajax({
        url: "/pacientes/getById",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ id: pacienteId }),
        success: function(data) {
            console.log(data.nome);
            console.log(data.telefone);
            console.log(data.data_nascimento);
            console.log(data.plano);
            $("#cadastrarPacientes").find("#nome").val(data.nome);
            $("#cadastrarPacientes").find("#telefone").val(data.telefone);
            $("#cadastrarPacientes").find("#data_nascimento").val(data.data_nascimento);
            $("#cadastrarPacientes").find("#plano").val(data.plano);
        }
    });

    $("#cadastrarPacientes").modal("show");
    $("#tituloModalPaciente").html("Editar Paciente");
    $("#botaoCadastrarPaciente").addClass("hidden", true);
    $("#botaoEditarPaciente").removeClass("hidden", true);
});

$("#buttonCadastrarPacientes").on("click", function (){
    $("#cadastrarPacientes").modal("show");
    $("#tituloModalPaciente").html("Cadastrar Paciente");
    $("#botaoEditarPaciente").addClass("hidden", true);
    $("#botaoCadastrarPaciente").removeClass("hidden", true);
    $("#nome").val("");
    $("#telefone").val("");
    $("#data_nascimento").val("");
    $("#plano").val("");
});

$("#botaoCadastrarPaciente").on("click", function(){

    var nome            = $("#nome").val();
    var telefone        = $("#telefone").val();
    var data_nascimento = $("#data_nascimento").val();
    var plano           = $("#plano").val();

    if(nome !== "" && telefone !== "" && data_nascimento !== "" && plano !== ""){
        $.post("/pacientes/save", {nome:nome,telefone:telefone,data_nascimento:data_nascimento,plano:plano},function(data){

            $("#cadastrarPacientes").modal("hide");
            $(".alertModalLabel").text("Sucesso!");
            $(".alertModalMsg").text("Paciente salvo com Sucesso");
            $("#alertModalBtn").addClass("btn-success");
            $("#alertModal").modal("show");

            setTimeout(function(){
                window.location.href = '/pacientes';
            }, 2000);
        });
    }else{
        $(".alertModalLabel").text("Erro!");
        $(".alertModalMsg").text("Informe todas as Opções");
        $("#alertModalConfirmDelete").addClass("hidden");
        $("#alertModalBtn").addClass("btn-secondary");
        $("#alertModal").modal("show");
    }

});

$("#botaoEditarPaciente").on("click", function(){

    var pacienteId      = $("#idPacienteEditar").val();
    console.log(pacienteId);
    var nome            = $("#nome").val();
    var telefone        = $("#telefone").val();
    var data_nascimento = $("#data_nascimento").val();
    var plano           = $("#plano").val();

    if(nome !== "" && telefone !== "" && data_nascimento !== "" && plano !== ""){
        $.ajax({
            type: "POST",
            url: "/pacientes/" + pacienteId,
            data: {nome:nome,telefone:telefone,data_nascimento:data_nascimento,plano:plano},
            success: function(data){
                $("#cadastrarPacientes").modal("hide");
                $(".alertModalLabel").text("Sucesso!");
                $(".alertModalMsg").text("Paciente atualizado com Sucesso");
                $("#alertModalBtn").addClass("btn-success");
                $("#alertModal").modal("show");

                setTimeout(function(){
                    window.location.href = '/pacientes';
                }, 2000);
            }
        });
    }else{
        $(".alertModalLabel").text("Erro!");
        $(".alertModalMsg").text("Informe todas as Opções");
        $("#alertModalConfirmDelete").addClass("hidden");
        $("#alertModalBtn").addClass("btn-secondary");
        $("#alertModal").modal("show");
    }
});

$('.botaoDeletarPaciente').on('click', function() {

    var pacienteId = $(this).data('id');

    $("#idPacienteDeletar").val(pacienteId);
    $(".alertModalLabel").text("Sucesso!");
    $(".alertModalMsg").text("Deseja deletar esse Paciente?");
    $("#alertModalBtn").addClass("btn-secondary");
    $("#alertModalConfirmDelete").removeClass("hidden");
    $("#alertModal").modal("show");

});

$("#alertModalConfirmDelete").on("click", function (){

    var pacienteId = $("#idPacienteDeletar").val();
    console.log(pacienteId);

    $.ajax({
        url: "/pacientes/delete",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ id: pacienteId }),
        success: function(data) {
            $(".alertModalLabel").text("Sucesso!");
            $(".alertModalMsg").text("Paciente deletado com sucesso");
            $("#alertModalBtn").removeClass("btn-danger").addClass("btn-success");
            $("#alertModalConfirmDelete").addClass("hidden");
            $("#alertModal").modal("show");

            setTimeout(function() {
                window.location.href = '/pacientes';
            }, 1000);
        },

        error: function(xhr) {
            $("#cadastrarPacientes").modal("hide");
            $(".alertModalLabel").text("Erro!");
            $(".alertModalMsg").text("Cliente com Procedimento Pendente!");
            $("#alertModalConfirmDelete").addClass("hidden");
            $("#alertModalBtn").addClass("btn-secondary");
            $("#alertModal").modal("show");
        }
    });
});
