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

    $(document).ready(function () {
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
    });
});
