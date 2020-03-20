function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var cards = ["Ariel.png", "czarownica.png", "krab.png", "neptun.png", "rybka.png", "Ariel.png", "czarownica.png", "krab.png", "neptun.png", "rybka.png"];
cards = shuffle(cards);

//alert(cards[4])
console.log(cards);

var c0 = document.getElementById('c0');
var c1 = document.getElementById('c1');
var c2 = document.getElementById('c2');
var c3 = document.getElementById('c3');

var c4 = document.getElementById('c4');
var c5 = document.getElementById('c5');
var c6 = document.getElementById('c6');
var c7 = document.getElementById('c7');

c0.addEventListener("click", function () { revealCard(0); });
c1.addEventListener("click", function () { revealCard(1); });
c2.addEventListener("click", function () { revealCard(2); });
c3.addEventListener("click", function () { revealCard(3); });

c4.addEventListener("click", function () { revealCard(4); });
c5.addEventListener("click", function () { revealCard(5); });
c6.addEventListener("click", function () { revealCard(6); });
c7.addEventListener("click", function () { revealCard(7); });

var oneVisible = false;
var turnCounter = 0;
var visibleNumber;
var lock = false;
var pairsLeft = 4;

function revealCard(nr) {
    var opacityValue = $('#c' + nr).css('opacity');

    //alert('opacity: ' + opacityValue);

    if (opacityValue != 0 && lock == false) {
        lock = true;
        //alert(nr)
        var obraz = "url(img/" + cards[nr] + ")";

        $('#c' + nr).css('background-image', obraz);
        $('#c' + nr).addClass('card-face-up');
        $('#c' + nr).removeClass('card-hidden');

        if (oneVisible == false) {
            //first card
            oneVisible = true;
            visibleNumber = nr;
            lock = false;
        }
        else {
            //second card

            if (cards[visibleNumber] == cards[nr]) {
                //alert('para');
                setTimeout(function () { hide2Cards(nr, visibleNumber) }, 750);

            }
            else {
                // alert('pudlo');

                setTimeout(function () { restore2Cards(nr, visibleNumber) }, 1000);

            }
            turnCounter++
            $('.score').html('Licznik: ' + turnCounter);
            oneVisible = false;
        }
    }

    //alert(nr);


}
function hide2Cards(nr1, nr2) {
    $('#c' + nr1).css('opacity', '0');
    $('#c' + nr2).css('opacity', '0');

    pairsLeft--;

    if (pairsLeft == 0) {
        $('.board').html('<h1>Wygrana!<br></h1>');
    }
    lock = false;
}

function restore2Cards(nr1, nr2) {
    $('#c' + nr1).css('background-image', 'url(img/revers.png)');
    $('#c' + nr1).addClass('card-hidden');
    $('#c' + nr1).removeClass('card-face-up');

    $('#c' + nr2).css('background-image', 'url(img/revers.png)');
    $('#c' + nr2).addClass('card-hidden');
    $('#c' + nr2).removeClass('card-face-up');

    lock = false;
}