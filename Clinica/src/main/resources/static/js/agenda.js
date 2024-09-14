$(document).ready(function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek', // visualização inicial
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay'
        },
        timeZone: 'local',
        locale: 'pt-br', // Definir o idioma do calendário
        editable: true, // Permitir que os eventos sejam movidos
        selectable: true, // Permitir a seleção de horários para criar eventos

        // Função executada ao selecionar um intervalo de datas no calendário
        select: function(info) {
            var title = prompt('Informe o nome do procedimento:');
            var pacienteId = prompt('Informe o ID do paciente:');

            if (title && pacienteId) {
                var inicio = info.start.toISOString();
                var fim = info.end.toISOString();

                var agendamentoData = {
                    procedimento: title,
                    inicio: inicio,
                    fim: fim,
                    paciente: {
                        id: pacienteId
                    }
                };

                $.ajax({
                    url: '/salvarAgendamento',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(agendamentoData),
                    success: function(response) {
                        alert('Agendamento salvo com sucesso!');
                        carregarProcedimentos();
                    },
                    error: function(xhr, status, error) {
                        console.error('Erro ao salvar agendamento:', error);
                        alert('Erro ao salvar o agendamento!');
                    }
                });
            }
            calendar.unselect();
        },

        eventClick: function(info) {
            var nomePaciente = info.event.extendedProps.paciente ? info.event.extendedProps.paciente.nome : 'Desconhecido';
            var id = info.event.id;

            Swal.fire({
                title: nomePaciente,
                text: "Digite uma observação:",
                input: "text",
                inputPlaceholder: "Escreva algo",
                showCancelButton: true,
                showDenyButton: true,
                confirmButtonText: "Salvar",
                denyButtonText: "Deletar Agendamento",
                cancelButtonText: "Cancelar",
                reverseButtons: true,
                preConfirm: (inputValue) => {
                    if (inputValue === "") {
                        Swal.showValidationMessage("Você precisa escrever algo!");
                        return false;
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    var procedimento = result.value;
                    $.ajax({
                        url: '/editarProcedimentoAgendamento/' + id, // Use o ID corretamente
                        method: 'POST',
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
                        url: '/deletarAgendamento',
                        method: 'POST',
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
            var updatedEvent = {
                id: info.event.id,
                procedimento: info.event.title,
                inicio: info.event.start.toISOString(),
                fim: info.event.end.toISOString(),
                paciente: info.event.extendedProps.paciente
            };

            $.ajax({
                url: '/agendamentos/' + updatedEvent.id, // Use o ID corretamente
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(updatedEvent),
                success: function(response) {
                    alert('Agendamento atualizado com sucesso!');
                },
                error: function(xhr, status, error) {
                    console.error('Erro ao atualizar agendamento:', error);
                    alert('Erro ao atualizar o agendamento!');
                }
            });
        }
    });

    // Função para carregar os procedimentos ao carregar a página
    function carregarProcedimentos() {
        $.ajax({
            url: '/listarAgendamentos',
            method: 'GET',
            success: function(data) {
                data.forEach(function(agendamento) {
                    calendar.addEvent({
                        id: agendamento.id,
                        title: agendamento.procedimento,
                        start: agendamento.inicio,
                        end: agendamento.fim,
                        extendedProps: {
                            paciente: agendamento.paciente // Adicione o paciente aqui
                        }
                    });
                });
            },
            error: function(xhr, status, error) {
                console.error('Erro ao carregar agendamentos:', error);
            }
        });
    }

    calendar.render();
    carregarProcedimentos();
});
