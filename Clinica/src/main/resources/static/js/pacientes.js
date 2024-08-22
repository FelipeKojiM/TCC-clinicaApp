$('#tabelaPacientes').DataTable({
    pageLength: 10,
    paging: true,
    responsive: true,
    dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 text-md-right"f>>' +
        '<"row"<"col-sm-12"tr>>' +
        '<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6 text-md-right"p>>',
    language: {
        search: "Pesquisar:",
        lengthMenu: "Mostrar _MENU_ registros por página",
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
    },
    columnDefs: [
        { width: "10%", targets: 0, className: "text-left"},
        { width: "20%", targets: 1, className: "text-left"},
        { width: "20%", targets: 2, className: "text-left"},
        { width: "20%", targets: 3, className: "text-left"},
        { width: "20%", targets: 4, className: "text-left"},
        { width: "10%", targets: 5, className: "text-left"},
    ],
    drawCallback: function (settings) {
        var api = this.api();
        var pageInfo = api.page.info();
        var numRecords = pageInfo.recordsDisplay;

        if (numRecords <= 10) {
            $('#tabelaPacientes').css('height', 'auto');
        } else {
            $('#tabelaPacientes').css('height', '400px'); 
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
            $("#cadastrarPacientes").find("#nome").val(data.nome);
            $("#cadastrarPacientes").find("#telefone").val(data.telefone);
            $("#cadastrarPacientes").find("#data_nascimento").val(data.data_nascimento);
            $("#cadastrarPacientes").find("#cpf").val(data.cpf);
            $("#cadastrarPacientes").find("#email").val(data.email);
            $("#cadastrarPacientes").find("#cep").val(data.cep);
            $("#cadastrarPacientes").find("#bairro").val(data.bairro);
            $("#cadastrarPacientes").find("#logradouro").val(data.logradouro);
            $("#cadastrarPacientes").find("#numero").val(data.numero);
        }
    });

    $("#botaoFecharModal").html("Cancelar");
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
    $("#botaoFecharModal").html("Cancelar");
    $("#nome").val("");
    $("#telefone").val("");
    $("#data_nascimento").val("");
    $("#cpf").val("");
    $("#cep").val("");
    $("#bairro").val("");
    $("#logradouro").val("");
    $("#numero").val("");
    $("#email").val("");
});

$("#botaoCadastrarPaciente").on("click", function(){

    var nome            = $("#nome").val();
    var telefone        = $("#telefone").val();
    var data_nascimento = $("#data_nascimento").val();
    var cpf             = $("#cpf").val();
    var cep             = $("#cep").val();
    var bairro          = $("#bairro").val();
    var logradouro      = $("#logradouro").val();
    var numero          = $("#numero").val();
    var email           = $("#email").val();

    if(nome !== "" && telefone !== "" && data_nascimento !== "" && cpf !== "" && cep !== "" && email !== ""){
        $.post("/pacientes/save", {nome:nome,telefone:telefone,data_nascimento:data_nascimento,cpf:cpf,cep:cep,bairro:bairro,logradouro:logradouro,numero:numero,email:email},function(data){

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
    var nome            = $("#nome").val();
    var telefone        = $("#telefone").val();
    var data_nascimento = $("#data_nascimento").val();
    var cpf             = $("#cpf").val();
    var cep             = $("#cep").val();
    var bairro          = $("#bairro").val();
    var logradouro      = $("#logradouro").val();
    var numero          = $("#numero").val();
    var email           = $("#email").val();

    if(nome !== "" && telefone !== "" && data_nascimento !== "" && cpf !== "" && cep !== "" && email !== ""){
        $.ajax({
            type: "POST",
            url: "/pacientes/" + pacienteId,
            data: {nome:nome,telefone:telefone,data_nascimento:data_nascimento,cpf:cpf,cep:cep,bairro:bairro,logradouro:logradouro,numero:numero,email:email},
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

$('.botaoMostrarPaciente').on('click', function() {

    var pacienteId = $(this).data('id');

    $.ajax({
        url: "/api/pacientes/" + pacienteId,
        type: "GET",
        success: function(data) {
            $("#nome").val(data.nome);
            $("#telefone").val(data.telefone);
            $("#data_nascimento").val(data.data_nascimento);
            $("#cpf").val(data.cpf);
            $("#cep").val(data.cep);
            $("#bairro").val(data.bairro);
            $("#logradouro").val(data.logradouro);
            $("#numero").val(data.numero);
            $("#email").val(data.email);
            $("#cadastrarPacientes").modal("show");
        }
    });

    $("#botaoEditarPaciente").addClass("hidden");
    $("#botaoCadastrarPaciente").addClass("hidden");
    $("#botaoFecharModal").html("Fechar");
});
