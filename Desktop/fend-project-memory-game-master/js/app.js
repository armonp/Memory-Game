/*
 * Create a list that holds all of your cards
 */
var icons = ['bicycle', 'leaf', 'cube', 'anchor', 'paper-plane-o', 'bolt', 'diamond', 'bomb', 'bicycle', 'leaf', 'cube', 'anchor', 'paper-plane-o', 'bolt', 'diamond', 'bomb'];

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
    var openCards = [];
    //Loop through each card and create its HTML then add it to the page
    for (var i = 0; i < cardList.length; i++) {
        ($(".deck").append($('<li class="card"><i class = "fa fa-' + cardList[i] + '"></i></li>'))
        )
    }
    /* set up the event listener for a card. If a card is clicked, display the card's symbol. Event listner only runs if array has less two elements or less */
    if (openCards.length <= 2) {
        $('.card').click(function () {
            $(this).addClass('open show');
            /*  add the card to a *list* of "open" cards */
            openCards.push(this);
        });
    }
    /*  if the list already has another card, check to see if the two cards match */
    /*  if the cards do match, lock the cards in the open position */
    if (openCards.length = 2 && openCards[0] == openCards[1]) {
        openCards = [];
    }
    /*  if the cards do not match, remove the cards from the list and hide the card's symbol */
    else if (openCards.length = 2 && openCards[0] != openCards[1]) {
        openCards[0].removeClass('open show');
        openCards[1].removeClass('open show');
        openCards = [];
    }
});

 /*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
