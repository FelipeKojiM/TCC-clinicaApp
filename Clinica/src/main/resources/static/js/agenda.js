$(document).ready(function() {

    //header
    let prevScrollPos = $(window).scrollTop();

    $(window).scroll(function () {
        let currentScrollPos = $(window).scrollTop();

        if (prevScrollPos > currentScrollPos) {
            $("#header").removeClass("header-hidden");
        } else {
            $("#header").addClass("header-hidden");
        }

        prevScrollPos = currentScrollPos;
    });


    $(".select2").select2({
        placeholder: "Selecione uma opção",
        allowClear: true,
        width: "100%",
        closeOnSelect: true
    });

    var calendarEl = document.getElementById("calendar");

    // inicia o full calendar e eventos
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "timeGridWeek",
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek,timeGridDay"
        },
        buttonText: {
            prev: "<",
            next: ">",
            today: "Hoje",
            week: "Semana",
            day: "Dia",
            list: "Lista"
        },
        allDayText: "Geral",
        timeZone: "local",
        locale: "pt-br",
        editable: true,
        selectable: true,

        // ao clicar abre modal de cadastro do agendamento
        select: function(info) {
            var inicio = info.start.toISOString();
            var fim = info.end.toISOString();
            $("#eventModal").modal("show");

            $("#salvarAgendamento").off("click").on("click", function () {
                var procedimento = $("#procedimento").val();
                var pacienteId   = $("#paciente").val();
                var pacienteNome = $("#paciente option:selected").text();

                if (!procedimento || !pacienteId) {
                    Swal.fire("Atenção", "Informe todos os campos", "warning");
                    return;
                }

                var agendamentoData = {
                    procedimento: procedimento,
                    inicio: inicio,
                    fim: fim,
                    paciente: {
                        id: pacienteId,
                        nome: pacienteNome
                    }
                };
                $.ajax({
                    url: "/salvarAgendamento",
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(agendamentoData),
                    success: function(response) {
                        calendar.removeAllEvents();
                        carregarProcedimentos();
                        Swal.fire("Procedimento salvo com sucesso!", "", "success");
                    },
                    error: function(xhr, status, error) {
                        Swal.fire("Erro ao salvar o Procedimento", "", "danger");
                    },
                });
                $("#eventModal").modal("hide");
                $("#procedimento").val("");
            });
        },

        // abre sweet alert para edicao
        eventClick: function(info) {
            var id = info.event.id;
            var telefone = info.event.extendedProps.telefone;
            var procedimento = info.event.title.split(" - ")[0]; // Obtém apenas o título do procedimento
            var confirmacao = info.event.extendedProps.confirmacao;
            var comparecimento = info.event.extendedProps.comparecimento;

            Swal.fire({
                title: "Editar Procedimento",
                input: "text",
                inputValue: procedimento,
                html:  `
                        <label style="display: flex; align-items: center; margin: 10px 0;">
                            <input type="checkbox" id="confirmar" ${confirmacao ? 'checked' : ''} style="margin-right: 5px;"> Confirmação
                        </label>
                        <label style="display: flex; align-items: center; margin: 10px 0;">
                            <input type="checkbox" id="naoCompareceu" ${comparecimento ? 'checked' : ''} style="margin-right: 5px;"> Não Compareceu
                        </label>
                        <div style="display: flex; align-items: center;"> <!-- Alterado para "center" para centralizar verticalmente -->
                            <button class="btn btn-success btn-sm border border-dark rounded botaoAbrirWhatsApp" 
                                    type="button" 
                                    title="Enviar Mensagem" 
                                    data-id="${telefone}">
                                <i class="fa fa-whatsapp" aria-hidden="true"></i>
                            </button>
                        </div>
                    `,
                showCancelButton: true,
                showDenyButton: true,
                confirmButtonText: "Salvar",
                denyButtonText: "Deletar Agendamento",
                cancelButtonText: "Cancelar",
                reverseButtons: true,
                preConfirm: (inputValue) => {
                    if(inputValue === "") {
                        Swal.showValidationMessage("Informe o Procedimento!");
                        return false;
                    }
                }
            }).then((result) => {
                var confirmacao = $("#confirmar").is(":checked");
                var comparecimento = $("#naoCompareceu").is(":checked");
                if (result.isConfirmed) {
                    var procedimento = result.value;
                    $.ajax({
                        url: "/editarProcedimentoAgendamento/" + id,
                        method: "POST",
                        data: {
                            procedimento: procedimento,
                            confirmacao: confirmacao,
                            comparecimento: comparecimento
                        },
                        success: function(response) {
                            Swal.fire("Procedimento atualizado com sucesso!", "", "success");
                            calendar.removeAllEvents();
                            carregarProcedimentos();
                        },
                        error: function(xhr, status, error) {
                            Swal.fire("Erro ao atualizar agendamento!", "Entre em contato com o Suporte!", "info");
                        }
                    });
                } else if (result.isDenied) {
                    $.ajax({
                        url: "/deletarAgendamento",
                        method: "POST",
                        data: {
                            id: id
                        },
                        success: function(response) {
                            Swal.fire("Procedimento deletado com sucesso!", "", "success");
                            calendar.removeAllEvents();
                            carregarProcedimentos();
                        },
                        error: function(xhr, status, error) {
                            Swal.fire("Erro ao deletar agendamento!", "Entre em contato com o Suporte!", "info");
                        }
                    });
                }
            });
        },

        // atualiza ao arrastar
        eventDrop: function(info) {
            atualizarAgendamento(info.event);
        },

        // atualiza ao aumentar ou diminuir o horario
        eventResize: function(info) {
            atualizarAgendamento(info.event);
        },

        // cores dos agendamentos
        eventDidMount: function(info) {
            var hoje = new Date();
            hoje.setHours(0, 0, 0, 0);

            var dataEvento = new Date(info.event.start);
            dataEvento.setHours(0, 0, 0, 0);

            var confirmacao = info.event.extendedProps.confirmacao;
            var comparecimento = info.event.extendedProps.comparecimento;

            var backgroundColor = "";
            var borderColor = "";

            if (comparecimento || (comparecimento && confirmacao)) {
                backgroundColor = "#ea2828";
                borderColor = "#ff1600";
            } else if (confirmacao) {
                backgroundColor = "#54e89d";
                borderColor = "#05ffc4";
            } else if (dataEvento < hoje) {
                backgroundColor = "#a1a1a1";
                borderColor = "#919191";
            } else {
                backgroundColor = "#42a6ea";
                borderColor = "#009aff";
            }

            $(info.el).css("background-color", backgroundColor);
            $(info.el).css("border-color", borderColor);
        },

    });

    // carrega os agendamentos
    function carregarProcedimentos() {
        $.ajax({
            url: "/listarAgendamentos",
            method: "GET",
            success: function(data) {
                console.log(data)
                data.forEach(function(agendamento) {
                    calendar.addEvent({
                        id: agendamento.id,
                        title: agendamento.procedimento + " - " + agendamento.paciente.nome,
                        start: agendamento.inicio,
                        end: agendamento.fim,
                        extendedProps: {
                            paciente: agendamento.paciente,
                            telefone: agendamento.paciente.telefone,
                            confirmacao: agendamento.confirmacao,
                            comparecimento: agendamento.comparecimento
                        }
                    });
                });
            },
            error: function(xhr, status, error) {
                Swal.fire("Erro ao listar Agendamentos", "Entre em contato com o Suporte!", "info");
            }
        });
    }

    calendar.render();
    carregarProcedimentos();

    // atualiza o agendamento
    function atualizarAgendamento(event) {

        var procedimento = event.title.split(" - ")[0];

        var updatedEvent = {
            id: event.id,
            procedimento: procedimento,
            inicio: event.start.toISOString(),
            fim: event.end ? event.end.toISOString() : null,
            paciente: event.extendedProps.paciente,
            confirmacao: event.extendedProps.confirmacao,
            comparecimento: event.extendedProps.comparecimento
        };
        $.ajax({
            url: "/agendamentos/" + updatedEvent.id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(updatedEvent),
            success: function (response) {
                Swal.fire("Agendamento atualizado com sucesso!", "", "success");
            },
            error: function (xhr, status, error) {
                Swal.fire("Erro ao atualizar o Agendamento!", "", "error");
            }
        });
    }

    $(".btnDeletarEncaixe").on("click", function(e) {
        e.preventDefault();
        const id = $(this).data("id");
        Swal.fire({
            title: "Tem certeza?",
            text: "Deseja deletar o Encaixe?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sim"
        }).then((result) => {
            if (result.isConfirmed) {
                $('#idEncaixe').val(id);
                $('#formDeletarEncaixe').submit();
            }
        });
    });

    $("body").on("click", ".botaoAbrirWhatsApp", function() {
        var telefone = $(this).data('id');
        var url = "https://api.whatsapp.com/send?phone=" + telefone;

        window.open(url, '_blank');
    });

});
