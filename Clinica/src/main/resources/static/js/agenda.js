$(document).ready(function() {
    var calendarEl = document.getElementById("calendar");

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "timeGridWeek", // visualização inicial
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
        allDayText: "Dia Todo",
        timeZone: "local",
        locale: "pt-br", // Definir o idioma do calendário
        editable: true, // Permitir que os eventos sejam movidos
        selectable: true, // Permitir a seleção de horários para criar eventos

        select: function(info) {
            var inicio = info.start.toISOString();
            var fim = info.end.toISOString();
            $("#eventModal").modal("show");

            $.ajax({
                url: "/listarPacientes",
                method: "GET",
                success: function(pacientes) {
                    $("#paciente").empty();
                    $("#paciente").append("<option value=\"\">Selecione um paciente</option>");

                    $.each(pacientes, function(index, paciente) {
                        $("#paciente").append("<option value=\"" + paciente.id + "\">" + paciente.nome + "</option>");
                    });
                },
                error: function() {
                    Swal.fire("Erro ao listar os Pacientes", "Entre em contato com o Suporte!", "info");
                }
            });

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
                        var id = response.id;
                        calendar.addEvent({
                            id: id,
                            title: procedimento + " - " + pacienteNome, // Inclui o nome do paciente no título
                            start: info.start,   // Hora de início
                            end: info.end,       // Hora de fim
                            extendedProps: {     // Informações adicionais
                                pacienteId: pacienteId,
                                nomePaciente: pacienteNome
                            }
                        });
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

        eventClick: function(info) {
            var id = info.event.id;
            var procedimento = info.event.title.split(" - ")[0]; // Obtém apenas o título do procedimento

            Swal.fire({
                title: "Editar Procedimento",
                text: "Editar Procedimento:",
                input: "text",
                inputValue: procedimento,
                showCancelButton: true,
                showDenyButton: true,
                confirmButtonText: "Salvar",
                denyButtonText: "Deletar Agendamento",
                cancelButtonText: "Cancelar",
                reverseButtons: true,
                preConfirm: (inputValue) => {
                    if (inputValue === "") {
                        Swal.showValidationMessage("Informe o Procedimento!");
                        return false;
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    var procedimento = result.value;
                    $.ajax({
                        url: "/editarProcedimentoAgendamento/" + id,
                        method: "POST",
                        data: {
                            procedimento: procedimento
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

        eventDrop: function(info) {
            atualizarAgendamento(info.event);
        },

        eventResize: function(info) {
            atualizarAgendamento(info.event);
        },

        eventDidMount: function(info) {
            var hoje = new Date();
            // Define a hora como 00:00:00 para comparação
            hoje.setHours(0, 0, 0, 0);

            var dataEvento = new Date(info.event.start);
            // Define a hora como 00:00:00 para comparação
            dataEvento.setHours(0, 0, 0, 0);

            // Verifica a data do evento em relação a hoje
            if (dataEvento < hoje) {
                // Evento passado
                $(info.el).css("background-color", "gray");
                $(info.el).css("border-color", "gray");
            } else if (dataEvento.toDateString() === hoje.toDateString()) {
                // Evento para hoje
                $(info.el).css("background-color", "#198754");
                $(info.el).css("border-color", "green");
            }
        },

    });

    // Função para carregar os procedimentos ao carregar a página
    function carregarProcedimentos() {
        $.ajax({
            url: "/listarAgendamentos",
            method: "GET",
            success: function(data) {
                data.forEach(function(agendamento) {
                    calendar.addEvent({
                        id: agendamento.id,
                        title: agendamento.procedimento + " - " + agendamento.paciente.nome, // Inclui o nome do paciente no título
                        start: agendamento.inicio,
                        end: agendamento.fim,
                        extendedProps: {
                            paciente: agendamento.paciente
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

    function atualizarAgendamento(event) {

        var procedimento = event.title.split(" - ")[0];

        var updatedEvent = {
            id: event.id,
            procedimento: procedimento,
            inicio: event.start.toISOString(),
            fim: event.end ? event.end.toISOString() : null,
            paciente: event.extendedProps.paciente
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
});
