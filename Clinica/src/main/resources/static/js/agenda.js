// agenda.js
$(document).ready(function() {
    var calendarEl = $('#calendar')[0]; // Obtém o elemento DOM com jQuery

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Visualização inicial
        headerToolbar: { // Personalização da barra de ferramentas
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            // Exemplo de eventos
            {
                title: 'Evento Exemplo',
                start: '2024-09-10',
                end: '2024-09-12'
            },
            {
                title: 'Outro Evento',
                start: '2024-09-15'
            }
        ],
        editable: true, // Permitir arrastar e redimensionar eventos
        selectable: true // Permitir selecionar datas
    });

    calendar.render(); // Renderiza o calendário
});
