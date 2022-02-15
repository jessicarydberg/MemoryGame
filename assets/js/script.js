//Add eventlistener to button when the page is loaded
//and call function startGame.
document.addEventListener("DOMContentLoaded", function() {

    let button = document.getElementsByTagName("button");
    button[0].addEventListener("click", function() {

        startGame();

    });

    startGame();

});

// Declair variables to the global scope so it can be used in removing and adding eventlisteners
// to the images.
let turnedCards = [];
let open = function(e) {

    openCard(turnedCards, e.currentTarget);

};

/**
 * Create playground with shuffled cards
 */
function startGame() {
    
    //Reset the counter for number of moves to 0 and remove all cards if there are any.
    document.getElementById("moves").innerText = 0;
    
    let oldCards = document.getElementsByClassName("card");
    while (oldCards.length > 0) {

        oldCards[0].remove();

    }
    
    //Create an array of 20 random unique numbers
    let arrayRandom = [];
    while (arrayRandom.length < 20) {

        let number = Math.floor(Math.random()*20);
        if (arrayRandom.includes(number) === false) {

            arrayRandom.push(number);

        }

    }

    //Use ArrayRandom and create an array of the hidden images in random order.
    let cards = document.getElementsByClassName("hidden");
    let shuffledCards = [];
    for(let i = 0; i < 20; i++) {

        shuffledCards.push(cards[arrayRandom[i]]);

    }
    
    //Create html code of the cards and push to the html document.
    for (let shuffledCard of shuffledCards) {

        let source = shuffledCard.getAttribute("src");
        let alt = shuffledCard.getAttribute("alt");
        let img = document.createElement("img");
        img.setAttribute("src", source);
        img.setAttribute("alt", alt);
        img.className = "card closed";
        let cardDiv = document.getElementsByClassName('cards');
        cardDiv[0].appendChild(img);

    }

    //Add eventlisteners to the cards.
    cards = document.getElementsByClassName("closed");
    for (let card of cards) {

        card.addEventListener("click", open, true);

    }
    
}

/**
 * Show the card clicked and remove its eventlistener so it can't be clicked while open.
 * Call checkPair function when 2 cards are clicked.
 */
function openCard(turnedCards, card) {

    card.classList.remove("closed");
    card.removeEventListener("click", open, true);
    turnedCards.push(card);

    if (turnedCards.length === 2) {
        setTimeout( function() {
            checkPair(turnedCards);
            turnedCards.length = 0;
            addMove();
        }, 500);    
    }

}

/**
 * Check if the two cards clicked are matching.
 * If they are, change color and keep open.
 * If not, turn back and add eventlisteners again.
 */
function checkPair(turnedCards) {
    
    let source1 = turnedCards[0].getAttribute("src");
    let source2 = turnedCards[1].getAttribute("src");
    
    if (source1 === source2) {

        turnedCards[0].className = "card paired zoom";
        turnedCards[1].className = "card paired zoom";
        setTimeout( function() {
            winGame();
            }, 500);
        
    } else {

        turnedCards[0].className = "card closed";
        turnedCards[1].className = "card closed";
        turnedCards[0].addEventListener("click", open, true);
        turnedCards[1].addEventListener("click", open, true);
    }
}

/**
 * Show number of moves the user has done during this game.
 */
function addMove() {

    let moves = parseInt(document.getElementById("moves").innerText);
    document.getElementById("moves").innerText = ++moves;

}

/**
 * Calculate if all pairs are found and post an alertmessage if they are.
 */
function winGame() {

    let paired = document.getElementsByClassName("card paired");
    if (paired.length === 20) {
        
        let moves = parseInt(document.getElementById("moves").innerText);
        let oldRecord = parseInt(document.getElementById("record").innerText);
        
        if (moves < oldRecord) {
            alert(`Congratulations to e new record! You found all the pairs with only ${moves} moves!`);
            recordCount();
        } else if (oldRecord === 0) {
            alert(`Congratulations to e new record! You found all the pairs with only ${moves} moves!`);
            recordCount();
        } else {
            alert(`Good job, you found all the pairs with only ${moves} moves.`);
            recordCount();
        }

    }
    
}

/**
 * Show the lowest number of moves per game since the page loaded.
 */
function recordCount() {

    let moves = parseInt(document.getElementById("moves").innerText);
    let oldRecord = parseInt(document.getElementById("record").innerText);

    if (moves < oldRecord) {
        document.getElementById("record").innerText = moves;
    } else if (oldRecord === 0) {
        document.getElementById("record").innerText = moves;
    }

}