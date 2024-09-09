$(document).ready(function() {
    const $calendar = $(".calendar"),
        $date = $(".date"),
        $daysContainer = $(".days"),
        $prev = $(".prev"),
        $next = $(".next"),
        $todayBtn = $(".today-btn"),
        $gotoBtn = $(".goto-btn"),
        $dateInput = $(".date-input"),
        $eventDay = $(".event-day"),
        $eventDate = $(".event-date"),
        $eventsContainer = $(".events"),
        $addEventBtn = $(".add-event"),
        $addEventWrapper = $(".add-event-wrapper"),
        $addEventCloseBtn = $(".close"),
        $addEventTitle = $(".event-name"),
        $addEventFrom = $(".event-time-from"),
        $addEventTo = $(".event-time-to"),
        $addEventSubmit = $(".add-event-btn");

    let today = new Date();
    let activeDay;
    let month = today.getMonth();
    let year = today.getFullYear();

    const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];

    const eventsArr = [];
    getEvents();
    console.log(eventsArr);

    function initCalendar() {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const prevLastDay = new Date(year, month, 0);
        const prevDays = prevLastDay.getDate();
        const lastDate = lastDay.getDate();
        const day = firstDay.getDay();
        const nextDays = 7 - lastDay.getDay() - 1;

        $date.html(months[month] + " " + year);

        let days = "";

        for (let x = day; x > 0; x--) {
            days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
        }

        for (let i = 1; i <= lastDate; i++) {
            let event = false;
            eventsArr.forEach(eventObj => {
                if (
                    eventObj.day === i &&
                    eventObj.month === month + 1 &&
                    eventObj.year === year
                ) {
                    event = true;
                }
            });
            if (
                i === new Date().getDate() &&
                year === new Date().getFullYear() &&
                month === new Date().getMonth()
            ) {
                activeDay = i;
                getActiveDay(i);
                updateEvents(i);
                days += event ? `<div class="day today active event">${i}</div>` : `<div class="day today active">${i}</div>`;
            } else {
                days += event ? `<div class="day event">${i}</div>` : `<div class="day">${i}</div>`;
            }
        }

        for (let j = 1; j <= nextDays; j++) {
            days += `<div class="day next-date">${j}</div>`;
        }

        $daysContainer.html(days);
        addListener();
    }

    function prevMonth() {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        initCalendar();
    }

    function nextMonth() {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        initCalendar();
    }

    $prev.on("click", prevMonth);
    $next.on("click", nextMonth);

    initCalendar();

    function addListener() {
        $(".day").on("click", function() {
            const $this = $(this);
            const date = parseInt($this.html(), 10);
            getActiveDay(date);
            updateEvents(date);
            activeDay = date;
            $(".day").removeClass("active");
            if ($this.hasClass("prev-date")) {
                prevMonth();
                setTimeout(() => {
                    $(".day").each(function() {
                        if (!$(this).hasClass("prev-date") && $(this).html() === $this.html()) {
                            $(this).addClass("active");
                        }
                    });
                }, 100);
            } else if ($this.hasClass("next-date")) {
                nextMonth();
                setTimeout(() => {
                    $(".day").each(function() {
                        if (!$(this).hasClass("next-date") && $(this).html() === $this.html()) {
                            $(this).addClass("active");
                        }
                    });
                }, 100);
            } else {
                $this.addClass("active");
            }
        });
    }

    $todayBtn.on("click", function() {
        today = new Date();
        month = today.getMonth();
        year = today.getFullYear();
        initCalendar();
    });

    $dateInput.on("input", function(e) {
        let value = $(this).val().replace(/[^0-9/]/g, "");
        if (value.length === 2) {
            value += "/";
        }
        if (value.length > 7) {
            value = value.slice(0, 7);
        }
        if (e.originalEvent.inputType === "deleteContentBackward" && value.length === 3) {
            value = value.slice(0, 2);
        }
        $(this).val(value);
    });

    $gotoBtn.on("click", gotoDate);

    function gotoDate() {
        const dateArr = $dateInput.val().split("/");
        if (dateArr.length === 2) {
            if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
                month = dateArr[0] - 1;
                year = dateArr[1];
                initCalendar();
                return;
            }
        }
        alert("Data Inválida");
    }

    function getActiveDay(date) {
        const day = new Date(year, month, date);
        const dayNames = [
            "Domingo",
            "Segunda-feira",
            "Terça-feira",
            "Quarta-feira",
            "Quinta-feira",
            "Sexta-feira",
            "Sábado"
        ];
        const dayName = dayNames[day.getDay()];
        $eventDay.html(dayName);
        $eventDate.html(date + " " + months[month] + " " + year);
    }

    function updateEvents(date) {
        let events = "";
        eventsArr.forEach(event => {
            if (
                date === event.day &&
                month + 1 === event.month &&
                year === event.year
            ) {
                event.events.forEach(event => {
                    events += `
                    <div class="event">
                        <div class="title">
                            <i class="fa fa-circle"></i>
                            <h3 class="event-title">${event.title}</h3>
                        </div>
                        <div class="event-time">
                            <span class="event-time">${event.time}</span>
                        </div>
                    </div>`;
                });
            }
        });
        if (events === "") {
            events = `<div class="no-event">
                <h3>Nenhum Horário Encontrado</h3>
            </div>`;
        }
        $eventsContainer.html(events);
        saveEvents();
    }

    $addEventBtn.on("click", function() {
        $addEventWrapper.toggleClass("active");
    });

    $addEventCloseBtn.on("click", function() {
        $addEventWrapper.removeClass("active");
    });

    $(document).on("click", function(e) {
        if (!$(e.target).is($addEventBtn) && !$addEventWrapper.has(e.target).length) {
            $addEventWrapper.removeClass("active");
        }
    });

    $addEventTitle.on("input", function() {
        $(this).val($(this).val().slice(0, 60));
    });

    $addEventFrom.on("input", function() {
        let value = $(this).val().replace(/[^0-9:]/g, "");
        if (value.length === 2) {
            value += ":";
        }
        if (value.length > 5) {
            value = value.slice(0, 5);
        }
        $(this).val(value);
    });

    $addEventTo.on("input", function() {
        let value = $(this).val().replace(/[^0-9:]/g, "");
        if (value.length === 2) {
            value += ":";
        }
        if (value.length > 5) {
            value = value.slice(0, 5);
        }
        $(this).val(value);
    });

    $addEventSubmit.on("click", function() {
        const eventTitle = $addEventTitle.val();
        const eventTimeFrom = $addEventFrom.val();
        const eventTimeTo = $addEventTo.val();
        if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
            alert("Por favor, preencha todos os campos");
            return;
        }

        const timeFromArr = eventTimeFrom.split(":");
        const timeToArr = eventTimeTo.split(":");
        if (
            timeFromArr.length !== 2 ||
            timeToArr.length !== 2 ||
            timeFromArr[0] > 23 ||
            timeFromArr[1] > 59 ||
            timeToArr[0] > 23 ||
            timeToArr[1] > 59
        ) {
            alert("Formato de Hora Inválido");
            return;
        }

        const timeFrom = convertTime(eventTimeFrom);
        const timeTo = convertTime(eventTimeTo);

        let eventExist = false;
        eventsArr.forEach(eventObj => {
            if (
                activeDay === eventObj.day &&
                month + 1 === eventObj.month &&
                year === eventObj.year
            ) {
                eventObj.events.forEach(ev => {
                    if (ev.title === eventTitle) {
                        eventExist = true;
                    }
                });
            }
        });
        if (eventExist) {
            alert("Evento já existe.");
            return;
        }

        if (timeTo <= timeFrom) {
            alert("Hora de término deve ser maior que a hora de início");
            return;
        }

        const newEvent = {
            title: eventTitle,
            time: eventTimeFrom + " - " + eventTimeTo,
        };

        let eventObjFound = false;
        eventsArr.forEach(eventObj => {
            if (
                activeDay === eventObj.day &&
                month + 1 === eventObj.month &&
                year === eventObj.year
            ) {
                eventObj.events.push(newEvent);
                eventObjFound = true;
            }
        });

        if (!eventObjFound) {
            eventsArr.push({
                day: activeDay,
                month: month + 1,
                year: year,
                events: [newEvent],
            });
        }

        $addEventWrapper.removeClass("active");
        updateEvents(activeDay);
    });

    function saveEvents() {
        localStorage.setItem("events", JSON.stringify(eventsArr));
    }

    function getEvents() {
        const storedEvents = localStorage.getItem("events");
        if (storedEvents) {
            eventsArr.push(...JSON.parse(storedEvents));
        }
    }

    function convertTime(time) {
        const [hours, minutes] = time.split(":").map(num => parseInt(num, 10));
        return hours * 60 + minutes;
    }
});
