$(document).ready(function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // visualização inicial
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        locale: 'pt-br', // Definir o idioma do calendário
        editable: true, // Permitir que os eventos sejam movidos
        selectable: true, // Permitir a seleção de horários para criar eventos

        // Função executada ao selecionar um intervalo de datas no calendário
            select: function(info) {
                var title = prompt('Informe o nome do procedimento:');
                var pacienteId = prompt('Informe o ID do paciente:');

                if (title && pacienteId) {
                    var inicio = info.startStr.split('T')[0] + 'T' + info.startStr.split('T')[1].split('-')[0];
                    var fim = info.endStr.split('T')[0] + 'T' + info.endStr.split('T')[1].split('-')[0];

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
                            calendar.addEvent({
                                title: title,
                                start: inicio,
                                end: fim
                            });
                        },
                        error: function(xhr, status, error) {
                            console.error('Erro ao salvar agendamento:', error);
                            alert('Erro ao salvar o agendamento!');
                        }
                    });
                }



            calendar.unselect();
        },

        // Evento disparado quando um agendamento é clicado
        eventClick: function(info) {
            alert('Evento: ' + info.event.title);
        },

        eventDrop: function(info) {
            var updatedEvent = {
                id: info.event.id,
                procedimento: info.event.title,
                inicio: info.event.start.toISOString(),
                fim: info.event.end.toISOString(),
                paciente: info.event.extendedProps.paciente // Acesse o paciente aqui
            };



            // arrumar a data quando atualiza
            $.ajax({
                url: '/agendamentos/' + info.event.id,
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
