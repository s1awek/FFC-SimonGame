/*jslint browser: true*/
/*global $, Audio, jQuery, alert*/
$(document).ready(function () {
    'use strict';
    var playerMoves = [],
        s1,
        s2,
        s3,
        s4,
        buzzer = new Audio('sounds/buzzer.mp3'),
        tada = new Audio('sounds/tada.mp3'),
        checked = false,
        start = false,
        strict = false,
        gameArr = [],
        obj,
        color1,
        audio,
        level = 750,
        time = 0,
        mineTimer,
        timer,
        sound,
        counter = 0,
        done = false,
        win = false,
        playerCounter = 0;

    function createGame() {
        var i, x;
        gameArr = [];
        for (i = 0; i < 5; i = i + 1) {
            x = Math.floor((Math.random() * 4) + 1);
            gameArr.push('s' + x);
        }
    }

    function setIntervalX(callback, delay, repetitions) {
        var x = 0,
            intervalID;
        intervalID = window.setInterval(function () {
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
        if (counter >= 5 && counter < 9) {
            level = 500;
        } else if (counter >= 9 && counter < 13) {
            level = 250;
        } else if (counter >= 13 && counter < 20) {
            level = 50;
        } else if (counter === 20) {
            win = true;
            reset();
        }
        $('#display').html(counter);
        setIntervalX(function () {
            if (checked && start) {
                playNow(gameArr[i]);
                i = i + 1;
            }
            if (i === counter) {
                done = true;
                time = 0;
                countdown();
            }
        }, level + 500, counter);
        playerCounter = 0;
    }

    function countdown() {
        time = 0;
        timer = setInterval(function () {
            time = time + 1;
            if (time >= 5) {
                reset();
            }
        }, 1000);
    }

    function reset() {
        clearInterval(timer);
        if (strict && !win) {
            counter = 0;
            done = false;
            start = false;
            buzzer.play();
            $('#start').removeClass('active');
        }

        if (!strict && !win) {
            done = false;
            buzzer.play();
            buzzer.onended = function () {
                counter = counter - 1;
                computerTurn();
            };
        }

        if (win) {
            tada.play();
            counter = 0;
            done = false;
            createGame();
            level = 750;
            win = false;
            playerCounter = 0;
            computerTurn();
        }
    }

    function playNow(s, p) {
        clearInterval(timer);
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
        } else if (p !== 'p') {
            $(obj).css('background-color', color1);
            sound = new Audio(audio);
            sound.play();
            sound.onplay = function () {
                setTimeout(function () {
                    $('#inner-1').css('background-color', '#00A74A');
                    $('#inner-2').css('background-color', '#9f0f17');
                    $('#inner-3').css('background-color', '#cca707');
                    $('#inner-4').css('background-color', '#094a8f');
                    return;
                }, level);
            };
        }
    }

    function compareMoves(z) {
        if (z === gameArr[playerCounter]) {
            playerCounter = playerCounter + 1;
            if (playerCounter === counter) {
                computerTurn();
            }
        } else if (z !== gameArr[playerCounter] && strict === true) {
            reset();
        } else if (z !== gameArr[playerCounter] && strict === false) {
            reset();
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
                $('#display').html('0');
                clearInterval(timer);
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
            $('#display').html('0');
        } else {
            $('#start').removeClass('active');
            start = false;
            checked = false;
            clearInterval(timer);
            $('#display').html('-');
        }
    });


});
