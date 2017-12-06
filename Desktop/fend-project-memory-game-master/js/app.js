/*
 * Create a list that holds all of your cards
 */
var icons = ['bicycle', 'leaf', 'cube', 'anchor', 'paper-plane-o', 'bolt', 'diamond', 'bomb', 'bicycle', 'leaf', 'cube', 'anchor', 'paper-plane-o', 'bolt', 'diamond', 'bomb'];
var matches = 0;
var time = 0;
var openCards = [];
var moves = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    $('class').text(function (i) {
        return array[i];
    });

    return array;
};
$(document).ready(function () {

    var cardList = shuffle(icons);
    //Loop through each card and create its HTML then add it to the page
    function arrangeCards() {
        for (var i = 0; i < cardList.length; i++) {
            ($(".deck").append($('<li class="card"><i class = "fa fa-' + cardList[i] + '"></i></li>'))
            )
        }
    }
});
/* set up the event listener for a card. If a card is clicked, display the card's symbol. Event listner only runs if array has less two elements or less */
function findMatch() {
    $('.card').click(function () {
        if (openCards.length <= 2) {
            var card = $(this);
            $(this).addClass('open show');
            /*  add the card to a *list* of "open" cards */
            openCards.push(card);
        };

        /*  if the list already has another card, check to see if the two cards match */
        /*  if the cards do match, lock the cards in the open position */
        if (openCards.length == 2 && openCards[0][0].children[0].className == openCards[1][0].children[0].className) {
            openCards = [];
            /*    + increment the move counter and display it on the page*/
            moves++;
            $('.moves').text(moves);
            matches++;
        }
        /*  if the cards do not match, remove the cards from the list and hide the card's symbol */
        else if (openCards.length == 2 && openCards[0][0].children[0].className != openCards[1][0].children[0].className) {
            setTimeout(function () {

                openCards[0].removeClass('open show');
                openCards[1].removeClass('open show');
                openCards = [];
                /*    + increment the move counter and display it on the page*/
                moves++;
                $('.moves').text(moves);
            }, 500)
        }
    })
    }
//Rate performance.
function rating(moves) {
    if (moves > 3) {
        ($('.stars').children("li: first").remove())
        if (moves > 30) {
            ($('.stars').children("li: first").remove())
        }
    }
}

//if all cards have matched, display a message with the final score
var modal = $('#myModal');
var span = $(".close")[0];
function winModal () {
    if (matches === 1) {
    $(".modal-content").html('<p>Congratulations!<br>Time: ' + time + '<br>Stars:  ' + stars.length + '</p>');

    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }}}
//reset game when reload button is click (in progress)    