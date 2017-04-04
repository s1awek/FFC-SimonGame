$(document).ready(function () {
    var playerMoves = [];
    var tempPlayerMoves = [];
    var currLength = 0;
    var s1, s2, s3, s4;
    //var s3 = new Audio('sounds/simonSound3.mp3');
    //var s4 = new Audio('sounds/simonSound4.mp3');
    var buzzer = new Audio('sounds/buzzer.mp3');

    $('#inner-1').on('mousedown', function () {
        $(this).css('background-color', '#00ff6e');
        currLength = currLength + 1
        s1 = new Audio('sounds/simonSound1.mp3');
        playerMoves.push('s1');
        compareMoves();
        s1.play();
    });

    $('#inner-1').on('mouseout mouseup', function () {
        $(this).css('background-color', '#00A74A');
    });

    $('#inner-2').on('mousedown', function () {
        $(this).css('background-color', '#fc2530');
        currLength = currLength + 1
        s2 = new Audio('sounds/simonSound2.mp3');
        playerMoves.push('s2');
        compareMoves();
        s2.play();
    });

    $('#inner-2').on('mouseout mouseup', function () {
        $(this).css('background-color', '#9f0f17');
    });

    $('#inner-3').on('mousedown', function () {
        $(this).css('background-color', '#ffd014');
        currLength = currLength + 1;
        s3 = new Audio('sounds/simonSound3.mp3');
        playerMoves.push('s3');
        compareMoves();
        s3.play();
    });

    $('#inner-3').on('mouseout mouseup', function () {
        $(this).css('background-color', '#cca707');
    });

    $('#inner-4').on('mousedown', function () {
        $(this).css('background-color', '#168aff');
        currLength = currLength + 1
        s4 = new Audio('sounds/simonSound4.mp3');
        playerMoves.push('s4');
        compareMoves();
        s4.play();
    });

    $('#inner-4').on('mouseout mouseup', function () {
        $(this).css('background-color', '#094a8f');
    });


    function compareMoves() {
        console.log(playerMoves);
    }

});
