/*
 * Create a list that holds all of your cards
 */
var icons = ['bicycle', 'leaf', 'cube', 'anchor', 'paper-plane-o', 'bolt', 'diamond', 'bomb', 'bicycle', 'leaf', 'cube', 'anchor', 'paper-plane-o', 'bolt', 'diamond', 'bomb'];
var matches = 0;
var timer;
var openCards = [];
var moves = 0;
var turn = 0;
var rating = "3";

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
function createGrid() {
    let cardList = shuffle(icons);
    //Loop through each card and create its HTML then add it to the page
    for (var i = 0; i < cardList.length; i++) {
        $(".deck").append('<li class="card"><i class = "fa fa-' + cardList[i] + '"></i></li>');
    }
}
/* set up the event listener for a card. If a card is clicked, display the card's symbol. Event listner only runs if array has less two elements or less */
function findMatch() {
    $('.card').click(function () {
        turn++;
        if (openCards.length < 2) {
            var card = $(this);
            $(this).addClass('open show');
            /*  add the card to a *list* of "open" cards */
            openCards.push(card);
            /*  if the list already has another card, check to see if the two cards match */
            /*  if the cards do match, lock the cards in the open position */
            if (openCards.length == 2 && openCards[0][0].children[0].className == openCards[1][0].children[0].className) {
                openCards = [];
                /*    + increment the move counter and display it on the page*/
                moves++;
                matches++;
                $('.moves').text(moves);
                rateGame();
                winModal();
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
                    rateGame();
                }, 500);
            }
        }

    })
}
//Rate performance.
function rateGame() {
    if (moves > 16) {
        $('#star3').removeClass("fa-star");
        $('#star3').addClass("fa-star-o");
        rating = "2";
    }
    if (moves > 22) {
        $('#star2').removeClass("fa-star");
        $('#star2').addClass("fa-star-o");
        rating = "1";
    }
}

//if all cards have matched, display a message with the final score
function winModal() {
    if (matches === 8) {
        $('.rating').html(rating);
        $('#myModal').css("display", "block");
        $(".close").click(function () {
            $('#myModal').css("display", "none");
        });
    }
}
//reset game when reload button is click    
$(".restart").click(function () {
    location.reload()
});
//game timer
function startTime() {
    $(".card").one("click", function () {
        if (turn === 1) {
            /*adopted parts from https://github.com/shannonj498/memory-matching-game/blob/master/js/app.js*/
            var sec = 0;
            function time(val) { return val > 9 ? val : "0" + val; }
            timer = setInterval(function () {
                $(".seconds").html(time(++sec % 60));
                $(".minutes").html(time(parseInt(sec / 60, 10)));
                if (matches === 8) {
                    clearInterval(timer);
                    return timer;
                }
            }, 1000);
        }
    })
}

createGrid();
findMatch();
startTime();