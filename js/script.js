$(document).ready(function () {
    'use strict';
    var playerMoves = [];
    var tempPlayerMoves = [];
    var currLength = 0;
    var s1, s2, s3, s4;
    var buzzer = new Audio('sounds/buzzer.mp3');
    var checked = false;
    var start = false;
    var strict = false;
    var gameArr = [];
    var obj, color1, color2, audio, sound;
    var counter = 0;
    var goodMove = false;
    var done = false;

    function createGame() {
        gameArr = [];
        for (var i = 0; i < 20; i = i + 1) {
            var x = Math.floor((Math.random() * 4) + 1);
            gameArr.push('s' + x);
        }
    }

    function computerTurn() {
        done = false;
        if (playerMoves[playerMoves.length - 1] === gameArr[playerMoves.length - 1]) {
            goodMove = true;
        } else {
            goodMove = false;
        }
        if (counter === 0) {
            counter = counter + 1;
            for (var i = 0; i < counter; i = i + 1) {
                playNow(gameArr[i]);
            }
        } else if (goodMove && counter < 20) {
            counter = counter + 1;
            for (var i = 0; i < counter; i = i + 1) {
                setTimeout(function () {
                    playNow(gameArr[i]);
                    console.log('hit' + i);
                }, 1000);
            }
        } else {
            buzzer.play();
        }
        return done = true;
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
        } else {
            console.log('Wrong s parameter in playNow(s)');
        }
        if (start && p === 'p' && playerMoves.length > counter) {
            $(obj).css('background-color', color1);
            //Push player's move to playerMoves array
            playerMoves.push(s);
            //Create sound object
            sound = new Audio(audio);
            //Play sound
            sound.play();
            //Trigger function to compare with gameArr
            compareMoves(s);
        } else {
            $(obj).css('background-color', color1);
            sound = new Audio(audio);
            sound.play();
        }
    }

    function compareMoves(z) {
        if (z === gameArr[gameArr.length - 1]) {
            console.log('ok');
        } else {
            console.log('NOT ok');
        }


    }


    //Add highlight and sound when pressed
    $('#inner-1').on('mousedown', function () {
        playNow('s1', 'p');
    });
    //Back to default state when moseover on mouse up
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


    //Reads controls states and set it to true or false
    $('#start').on('click', function () {
        if (checked) {
            $(this).toggleClass('active');
            if ($(this).hasClass('active')) {
                counter = 0;
                createGame();
                computerTurn();
                playerMoves = [];
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
