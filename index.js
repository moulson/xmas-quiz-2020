$(function () {
    checkCookies();
    snowStorm.start();
    var score = 0;
    if(getCookie('score') > 0){
        score = getCookie('score');
    }
    updateScore(score);
    var canvas = {
        element: document.getElementById('canvas'),
        width: 350,
        height: 400,
        initialize: function () {

            this.element.style.width = this.width + 'px';
            this.element.style.height = this.height + 'px';
            //document.body.appendChild(this.element);
        }
    };

    var Ball = {
        create: function (color, dx, dy) {
            var newBall = Object.create(this);
            newBall.dx = dx;
            newBall.dy = dy;
            newBall.width = 40;
            newBall.height = 40;
            newBall.element = document.createElement('div');
            newBall.element.style.backgroundColor = color;
            newBall.element.style.width = newBall.width + 'px';
            newBall.element.style.height = newBall.height + 'px';
            newBall.element.className += ' ball';
            newBall.width = parseInt(newBall.element.style.width);
            newBall.height = parseInt(newBall.element.style.height);
            canvas.element.appendChild(newBall.element);
            return newBall;
        },
        moveTo: function (x, y) {
            this.element.style.left = x + 'px';
            this.element.style.top = y + 'px';
        },
        changeDirectionIfNecessary: function (x, y) {
            if (x < 0 || x > canvas.width - this.width) {
                this.dx = -this.dx;
            }
            if (y < 0 || y > canvas.height - this.height) {
                this.dy = -this.dy;
            }
        },
        draw: function (x, y) {
            this.moveTo(x, y);
            var ball = this;
            setTimeout(function () {
                ball.changeDirectionIfNecessary(x, y);
                ball.draw(x + ball.dx, y + ball.dy);
            }, 1000 / 60);
        }
    };

    canvas.initialize();
    var ball1 = Ball.create("blue", 1, 1);
    var ball2 = Ball.create("blue", 1, 2);
    var ball3 = Ball.create("blue", 1, 3);
    var ball4 = Ball.create("blue", 1, 4);
    var ball5 = Ball.create("blue", 1, 5);
    var ball6 = Ball.create("blue", 5, 2);
    var ball7 = Ball.create("blue", 2, 2);
    var ball8 = Ball.create("blue", 4, 1);
    var ball9 = Ball.create("blue", 1, 5);
    var ball10 = Ball.create("blue", 2, 2);
    var ball11 = Ball.create("blue", 3, 2);
    var ball12 = Ball.create("blue", 4, 2);
    var ball13 = Ball.create("blue", 5, 2);
    var ball14 = Ball.create("blue", 2, 2);
    var ball15 = Ball.create("blue", 2,3)
    ball1.draw(70, 0);
    ball2.draw(20, 200);
    ball3.draw(211, 75);
    ball4.draw(200, 60);
    ball5.draw(100, 130);
    ball6.draw(100, 30);
    ball7.draw(200, 130);
    ball8.draw(70, 20);
    ball9.draw(30, 175);
    ball10.draw(123, 275);
    ball11.draw(221, 123);
    ball12.draw(120, 110);
    ball13.draw(60, 60);
    ball14.draw(20, 130);
    ball15.draw(45, 115);



    $('#question-1').submit(function (e) {
        e.preventDefault();
        var data = new FormData(document.getElementById('question-1'));
        var answer = data.get('q1');
        if (answer == "14") {
            //correct!
            score++;
            $('#q1-result').text('Correct!').addClass('pass');
            setCookie('q1', 'p');
        } else {
            $('#q1-result').text('Incorrect!').addClass('fail');
            setCookie('q1', 'f');
        }
        //disable form
        if (answer != null) {
            $('input[name=q1]').each(function () {
                $(this).attr('disabled', 'disabled');
            });
            $('#q1-s').attr('disabled', 'disabled');
            setCookie('score', score);
        }
        updateScore(score);
    });

    $('#question-2').submit(function (e) {
        e.preventDefault();
        var data = new FormData(document.getElementById('question-2'));
        var answer = data.get('q2');
        if (answer == "2") {
            //correct!
            score++;
            $('#q2-result').text('Correct!').addClass('pass');
            setCookie('q2', 'p');
        } else {
            $('#q2-result').text('Incorrect!').addClass('fail');
            setCookie('q2', 'f');
        }
        //disable form
        if (answer != "") {
            $('input[name=q2]').each(function () {
                $(this).attr('disabled', 'disabled');
            });
            $('#q2-s').attr('disabled', 'disabled');
            setCookie('score', score);
        }
        updateScore(score);
    });
});

function updateScore(score) {
    $('#score').text(`Score: ${getCookie('score')}/2`);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookies(){
    if(getCookie('q1') != ""){
        $('input[name=q1]').each(function () {
            $(this).attr('disabled', 'disabled');
        });
        $('#q1-s').attr('disabled', 'disabled');
    }
    if(getCookie('q2') != ""){
        $('input[name=q2]').each(function () {
            $(this).attr('disabled', 'disabled');
        });
        $('#q2-s').attr('disabled', 'disabled');
    }
}