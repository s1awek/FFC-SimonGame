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
    var obj;

    function createGame() {
        for (var i = 0; i < 20; i = i + 1) {
            var x = Math.floor((Math.random() * 4) + 1);
            gameArr.push('s' + x);
        }
    }

    function computerTurn() {

    }

    function playNow(color, audio, s) {
        if (s === 's1') {
            obj = '#inner-1';
        } else if (s === 's2') {
            obj = '#inner-2';
        } else if (s === 's3') {
            obj = '#inner-3';
        } else if (s === 's4') {
            obj = '#inner-4';
        }
        if (start) {
            $(obj).css('background-color', color);
            //Push player's move to playerMoves array
            playerMoves.push(s);
            //Create sound object
            s = new Audio(audio);
            //Trigger function to compare with gameArr
            compareMoves();
            //Play sound
            s.play();
        }
    }

    //Add highlight and sound when pressed
    $('#inner-1').on('mousedown', function () {
        playNow('#00ff6e', 'sounds/simonSound1.mp3', 's1');
    });
    //Back to default state when moseover on mouse up
    $('#inner-1').on('mouseout mouseup', function () {
        $(this).css('background-color', '#00A74A');
    });

    $('#inner-2').on('mousedown', function () {
        playNow('#fc2530', 'sounds/simonSound2.mp3', 's2');
    });

    $('#inner-2').on('mouseout mouseup', function () {
        $(this).css('background-color', '#9f0f17');
    });

    $('#inner-3').on('mousedown', function () {
        playNow('#ffd014', 'sounds/simonSound3.mp3', 's3');
    });

    $('#inner-3').on('mouseout mouseup', function () {
        $(this).css('background-color', '#cca707');
    });

    $('#inner-4').on('mousedown', function () {
        playNow('#168aff', 'sounds/simonSound4.mp3', 's4');
    });

    $('#inner-4').on('mouseout mouseup', function () {
        $(this).css('background-color', '#094a8f');
    });


    function compareMoves() {
        console.log(playerMoves);
    }

    //Reads controls states and set it to true or false
    $('#start').on('click', function () {
        if (checked) {
            $(this).toggleClass('active');
            if ($(this).hasClass('active')) {
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
