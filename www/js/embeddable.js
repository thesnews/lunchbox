var templateQuote = $('#quote-template').html(),
    templatePoll = $('#poll-template').html(),
    templateMediaSide = $('#media-side-template').html(),
    // templateMediaFull = $('#media-full-template').html(),
    templateRandom = $('#random-template').html(),
    selectedAction = 'quote';

var keyInputTimer = false;

var onDocumentLoad = function(e) {
    $('#embeddable-form .hidden').removeClass('hidden');
    $("#embeddable-form [class$='-container']").hide();
    $("#embeddable-form .quote-container").show();

    $('#embeddable-form select').on('change', toggleShown);

    $("#embeddable-form [class$='-container'] .form-control").on('keyup', updateCanvas);

    $('#embeddable-output').on('click', function() {
        $(this).select();
    });

};

var toggleShown = function(e) {
    selectedAction = $(this).val();

    $("#embeddable-form [class$='-container']").hide();
    $("#embeddable-form ."+selectedAction+"-container").show();
};

var updateCanvas = function(e) {
    if (keyInputTimer) {
        clearTimeout(keyInputTimer);
    }

    keyInputTimer = setTimeout(function() {
        switch (selectedAction) {
            case 'quote':
                updateQuote();
                break;
            case 'poll':
                updatePoll();
                break;
            case 'media-side':
                updateMediaSide();
                break;
            case 'media-full':
                updateMediaFull();
                break;
            case 'random':
                updateRandom();
                break;
        }
    }, 500);
};

var updateQuote = function() {
    var attribution = $('#quote-atribution').val(),
        quote = $('#quote-quote').val();

    renderCanvas(templateQuote, {
        'attribution': attribution,
        'quote': quote
    });
};

var updatePoll = function() {

    var id = $('#poll-id').val();

    renderCanvas(templatePoll, {
        'id': id
    });

};

var updateMediaSide = function() {
    var url = $('#media-side-url').val(),
        cutline = $('#media-side-cutline').val(),
        clickthrough = $('#media-side-clickthrough').val();

    renderCanvas(templateMediaSide, {
        'url': url,
        'cutline': cutline,
        'clickthrough': clickthrough
    });
};

var updateRandom = function() {
    var content = $('#random-content').val();

    renderCanvas(templateRandom, {
        'content': content
    });
};


var renderCanvas = function(template, args) {
    var ctx = template;

    for (var k in args) {
        var v = args[k];

        var r = new RegExp('%'+k+'%', 'g');
        ctx = ctx.replace(r, v);
    }

    ctx = ctx.replace(/\[script "(.*)?"\]/, '<script type="text/javascript" src="$1"></script>');

    $('#embeddable-output').val(ctx);
};

$(onDocumentLoad);
