$(document).ready(function () {
    function showSection(selector) {
        $('.section').removeClass('active');
        $(selector).addClass('active');
    }

    $('.nav-link').on('click', function (e) {
        e.preventDefault();
        var target = $(this).data('target');
        showSection(target);
    });

    showSection('#botox');
    console.log('aaaaaaaaa')

    $(document).ready(function () {
        function autoResizeTextarea(textarea) {
            // Redefine a altura para recalcular
            $(textarea).css('height', 'auto');
            // Ajusta a altura ao conteúdo
            $(textarea).css('height', textarea.scrollHeight + 'px');
        }

        // Inicializa o ajuste de altura
        $('textarea').each(function () {
            autoResizeTextarea(this);
        });

        // Ajusta a altura conforme o usuário digita
        $('textarea').on('input', function () {
            autoResizeTextarea(this);
        });
    });
});

new MultiSelectTag('couroCabeludo', {
    rounded: true,
    placeholder: 'Search',
    tagColor: {
        textColor: '#000000',
        borderColor: '#7a7a7a',
        bgColor: '#ffffff',
    }
})