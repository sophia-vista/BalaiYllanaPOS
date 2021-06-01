$(document).ready(function () {
    var title = $('#article-title').text().substring($('#article-title').text().indexOf(' ')+1)
    var score = 0;
    var answered = 0;

    $('.explanation').hide();

    function getIndex(field) {
        var id = field.attr("id");
        return id.split("-")[1];
    }

    function showTotal() {
        var text = '';
        switch(score) {
            case 0:         text = "That's quite unfortunate! But worry not, there is always room for improvement!"; break;
            case 1: case 2: text = "You're getting there, keep it up!"; break;
            case 3: case 4: text = 'Well played! You are almost there!'; break;
            case 5:         text = 'Good job! You are a genius!'; break;
        }
        $('#final-score').text('Your Final Score is ' + score + '/5!');
        $('#score-text').text(text);
    }

    $('.truebtn').click(function () {
        var index = getIndex($(this));
        var temp = {answer : true, index : index}
        $.get('/quiz/' + title +'/checkAnswer', temp, function (result) {
            answered++;
            $('#btns-' + index).hide();
            $('#ex-' + index).show();
            if(result) {
                score++;
                $('#cor-' + index).text('You answered TRUE. You are CORRECT!');
            }
            else {
                $('#cor-' + index).text('You answered TRUE. You are WRONG!');
            }
            if (answered == 5) 
                showTotal();
        });
    });

    $('.falsebtn').click(function () {
        var index = getIndex($(this));
        var temp = {answer : false, index : index}
        $.get('/quiz/' + title +'/checkAnswer', temp, function (result) {
            answered++;
            $('#btns-' + index).hide();
            $('#ex-' + index).show();
            if(result) {
                score++;
                $('#cor-' + index).text('You answered FALSE. You are CORRECT!');
            }
            else {
                $('#cor-' + index).text('You answered FALSE. You are WRONG!');
            }
            if (answered == 5) 
                showTotal();
        });
    });
})