$("#tabelaPacientes").DataTable({
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
        { width: "5%", targets: 0, className: "text-left"},
        { width: "20%", targets: 1, className: "text-left"},
        { width: "20%", targets: 2, className: "text-left"},
        { width: "20%", targets: 3, className: "text-left"},
        { width: "20%", targets: 4, className: "text-left"},
        { width: "15%", targets: 5, className: "text-left"},
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

$(".editarPaciente").on("click", function () {
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
    $("#botaoAbrirWhatsApp").addClass("hidden", true);
    $("#botaoEditarPaciente").removeClass("hidden", true);
});

$("#buttonModalPacientes").on("click", function () {
    $("#cadastrarPacientes").modal("show");
    $("#tituloModalPaciente").html("Cadastrar Paciente");
    $("#botaoEditarPaciente").addClass("hidden", true);
    $("#botaoAbrirWhatsApp").addClass("hidden", true);
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

$("#botaoCadastrarPaciente").on("click", function () {
    var nome            = $("#nome").val();
    var telefone        = $("#telefone").val();
    var data_nascimento = $("#data_nascimento").val();
    var cpf             = $("#cpf").val();
    var cep             = $("#cep").val();
    var bairro          = $("#bairro").val();
    var logradouro      = $("#logradouro").val();
    var numero          = $("#numero").val();
    var email           = $("#email").val();

    telefone        = telefone.replace(/[^0-9]/g, '');
    data_nascimento = data_nascimento.replace(/[^0-9]/g, '');
    cep             = cep.replace(/[^0-9]/g, '');
    cpf             = cpf.replace(/[^0-9]/g, '');

    if (nome !== "" && telefone !== "" && data_nascimento !== "" && cpf !== "" && cep !== "" && email !== "") {
        $.post("/pacientes/save", { nome: nome, telefone: telefone, data_nascimento: data_nascimento, cpf: cpf, cep: cep, bairro: bairro, logradouro: logradouro, numero: numero, email: email }, function (data) {
            Swal.fire({
                title: "Sucesso!",
                text: "Paciente salvo com sucesso.",
                icon: "success"
            }).then(() => {
                window.location.href = '/pacientes';
            });
        });
    } else {
        Swal.fire({
            title: "Erro!",
            text: "Informe todas as opções.",
            icon: "error"
        });
    }
});

$("#botaoEditarPaciente").on("click", function () {
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

    telefone        = telefone.replace(/[^0-9]/g, '');
    data_nascimento = data_nascimento.replace(/[^0-9]/g, '');
    cep             = cep.replace(/[^0-9]/g, '');
    cpf             = cpf.replace(/[^0-9]/g, '');

    if (nome !== "" && telefone !== "" && data_nascimento !== "" && cpf !== "" && cep !== "" && email !== "") {
        Swal.fire({
            title: "Tem certeza?",
            text: "Deseja realmente editar as informações do paciente?",
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
                    url: "/pacientes/" + pacienteId,
                    data: {
                        nome: nome,
                        telefone: telefone,
                        data_nascimento: data_nascimento,
                        cpf: cpf,
                        cep: cep,
                        bairro: bairro,
                        logradouro: logradouro,
                        numero: numero,
                        email: email
                    },
                    success: function (data) {
                        Swal.fire({
                            title: "Sucesso!",
                            text: "As informações do paciente foram atualizadas.",
                            icon: "success"
                        }).then(() => {
                            window.location.href = '/pacientes';
                        });
                    },
                    error: function (xhr, status, error) {
                        Swal.fire({
                            title: "Erro!",
                            text: "Ocorreu um erro ao tentar editar as informações do paciente.",
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

$('.botaoDeletarPaciente').on('click', function () {
    var pacienteId = $(this).data('id');

    Swal.fire({
        title: "Tem certeza?",
        text: "Deseja realmente deletar este paciente?",
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
                url: "/pacientes/delete",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ id: pacienteId }),
                success: function (data) {
                    Swal.fire({
                        title: "Sucesso!",
                        text: "Paciente deletado com sucesso.",
                        icon: "success"
                    }).then(() => {
                        window.location.href = '/pacientes';
                    });
                },
                error: function (xhr) {
                    Swal.fire({
                        title: "Erro!",
                        text: "Ocorreu um erro ao tentar deletar o paciente.",
                        icon: "error"
                    });
                }
            });
        }
    });
});

$(document).ready(function(){

    $(".telefone").inputmask("(99) 99999-9999", { placeholder: " " });
    $(".cpf").inputmask("999.999.999-99", { placeholder: " " });
    $("#cep").inputmask("99.999-99", { placeholder: " " });
    $("#data_nascimento").inputmask("99/99/9999", { placeholder: " " });

    $(".botaoAbrirWhatsApp").on("click", function() {
        var telefone = $(this).data('id');
        var url = "https://api.whatsapp.com/send?phone=" + telefone;

        window.open(url, '_blank');
    });
});
