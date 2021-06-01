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
        });
    });

    $('#nobtn').click(function () {
        $.get('/article/poll/no', temp, function (result) {
            title.replaceAll(' ', '%20');
            var string = '/article/' + title.replaceAll(' ', '%20') + ' #poll'
            $('#poll').load(string);
        });
    });

    $('#commentbtn').click(function () {
        $.post('/article/' + title +'/addcomment', {comment : $('#commentbox').val()}, function (result) {
            $('body').load(result);
        });
    });

    $('.deletebtn').click(function () {
        var comment = $(this).siblings().children('.comment-text').text();
        $.post('/article/' + title +'/deletecomment', {comment : comment}, function (result) {
            $('body').load(result);
        });
    });
})
