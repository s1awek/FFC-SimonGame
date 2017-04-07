$(document).ready(function () {
    'use strict';
    var playerMoves = [];
    var s1, s2, s3, s4;
    var buzzer = new Audio('sounds/buzzer.mp3');
    var checked = false;
    var start = false;
    var strict = false;
    var gameArr = [];
    var obj, color1, audio, sound;
    var counter = 0;
    var done = false;
    var playerCounter = 0;
    var strict = false;

    function createGame() {
        gameArr = [];
        for (var i = 0; i < 20; i = i + 1) {
            var x = Math.floor((Math.random() * 4) + 1);
            gameArr.push('s' + x);
        }
    }

    function setIntervalX(callback, delay, repetitions) {
        var x = 0;
        var intervalID = window.setInterval(function () {
            callback();
            if (++x === repetitions) {
                window.clearInterval(intervalID);
            }
        }, delay);
    }

    function computerTurn() {
        var i = 0;
        done = false;
        counter = counter + 1;
        setIntervalX(function () {
            if (checked && start) {
                playNow(gameArr[i]);
                i = i + 1;
            }
            if (i === counter) {
                done = true;
            }
        }, 1000, counter);
        playerCounter = 0;
    }

    function playNow(s, p) {
        if (s === 's1') {
            color1 = '#00ff6e';
            audio = 'sounds/simonSound1.mp3';
            obj = '#inner-1';
        } else if (s === 's2') {
            color1 = '#fc2530';
            audio = 'sounds/simonSound2.mp3';
            obj = '#inner-2';
        } else if (s === 's3') {
            color1 = '#ffd014';
            audio = 'sounds/simonSound3.mp3';
            obj = '#inner-3';
        } else if (s === 's4') {
            color1 = '#168aff';
            audio = 'sounds/simonSound4.mp3';
            obj = '#inner-4';
        }
        if (start && p === 'p' && playerCounter <= counter && done) {
            $(obj).css('background-color', color1);
            //Create sound object
            sound = new Audio(audio);
            //Play sound
            sound.play();
            //Trigger function to compare with gameArr
            compareMoves(s);
        } else if (p != 'p') {
            $(obj).css('background-color', color1);
            sound = new Audio(audio);
            sound.play();
            setTimeout(function () {
                $('#inner-1').css('background-color', '#00A74A');
                $('#inner-2').css('background-color', '#9f0f17');
                $('#inner-3').css('background-color', '#cca707');
                $('#inner-4').css('background-color', '#094a8f');
                return;
            }, 500);
        }
    }

    function compareMoves(z) {
        if (z === gameArr[playerCounter]) {
            playerCounter = playerCounter + 1;
            if (playerCounter === counter) {
                computerTurn();
            }
        } else if (z != gameArr[playerCounter] && strict === true) {
            counter = 0;
            done = false;
            start = false;
            buzzer.play();
            $('#start').removeClass('active');
        } else if (z != gameArr[playerCounter] && strict === false) {
            done = false;
            buzzer.play();
            buzzer.onended = function () {
                counter = counter - 1;
                computerTurn();
            }
        }
    }

    //Add highlight and sound when pressed
    $('#inner-1').on('mousedown', function () {
        playNow('s1', 'p');
    });
    //Back to default state when moseover or mouseup
    $('#inner-1').on('mouseout mouseup', function () {
        $(this).css('background-color', '#00A74A');
    });

    $('#inner-2').on('mousedown', function () {
        playNow('s2', 'p');
    });

    $('#inner-2').on('mouseout mouseup', function () {
        $(this).css('background-color', '#9f0f17');
    });

    $('#inner-3').on('mousedown', function () {
        playNow('s3', 'p');
    });

    $('#inner-3').on('mouseout mouseup', function () {
        $(this).css('background-color', '#cca707');
    });

    $('#inner-4').on('mousedown', function () {
        playNow('s4', 'p');
    });

    $('#inner-4').on('mouseout mouseup', function () {
        $(this).css('background-color', '#094a8f');
    });

    //Reads controls' states and set it to true or false
    $('#start').on('click', function () {
        if (checked) {
            $(this).toggleClass('active');
            if ($(this).hasClass('active')) {
                counter = 0;
                createGame();
                computerTurn();
                start = true;
            } else {
                start = false;
            }
        }
    });

    $('#strict').on('click', function () {
        if (checked) {
            $(this).toggleClass('active');
            if ($(this).hasClass('active')) {
                strict = true;
            } else {
                strict = false;
            }
        }
    });

    $('#checkbox').change(function () {
        if ($(this).is(':checked')) {
            checked = true;
        } else {
            $('#start').removeClass('active');
            start = false;
            checked = false;
        }
    });
});
