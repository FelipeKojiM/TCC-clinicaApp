$(document).ready(function () {
    function showSection(selector) {
        $(".section").removeClass("active");
        $(selector).addClass("active");
    }

    $(".nav-link").on("click", function (e) {
        e.preventDefault();
        var target = $(this).data("target");
        showSection(target);
    });

    showSection("#procedimentos");

    function autoResizeTextarea(textarea) {
        $(textarea).css("height", "auto");
        $(textarea).css("height", textarea.scrollHeight + "px");
    }

    $("textarea").each(function () {
        autoResizeTextarea(this);
    });

    $("textarea").on("input", function () {
        autoResizeTextarea(this);
    });

    $(".select2").select2({
        placeholder: "Selecione opções",
        allowClear: true,
        width: "100%",
        closeOnSelect: false
    });
});
