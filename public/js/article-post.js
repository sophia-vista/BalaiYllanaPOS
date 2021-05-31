$(document).ready(function () {
    var title = $('#article-title').text();
    var temp = {title : title};

    $.get('/checkPollAnswered', temp, function (result) {
        if(result) {
            $('#yesbtn').prop('disabled', true);
            $('#nobtn').prop('disabled', true);
        }
        else {
            $('#yesbtn').prop('disabled', false);
            $('#nobtn').prop('disabled', false);
        }
    });

    $('#yesbtn').click(function () {
        $.get('/article/poll/yes', temp, function (result) {
            title.replaceAll(' ', '%20');
            var string = '/article/' + title.replaceAll(' ', '%20') + ' #poll'
            $('#poll').load(string);
            $('#yesbtn').prop('disabled', true);
            $('#nobtn').prop('disabled', true);
        });
    });

    $('#nobtn').click(function () {
        $.get('/article/poll/no', temp, function (result) {
            title.replaceAll(' ', '%20');
            var string = '/article/' + title.replaceAll(' ', '%20') + ' #poll'
            $('#poll').load(string);
            $('#yesbtn').prop('disabled', true);
            $('#nobtn').prop('disabled', true);
        });
    });
})
