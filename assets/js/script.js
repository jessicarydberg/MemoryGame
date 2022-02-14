//Add eventlistener to button when the page is loaded
//and call function startGame.
document.addEventListener("DOMContentLoaded", function() {
    let button = document.getElementsByTagName("button")
    button[0].addEventListener("click", function() {
        startGame();
    });

    startGame();

});

/**
 * Create playground with shuffled cards
 */
function startGame() {
    
    //Reset the counter for number of moves to 0 and remove all cards.

    document.getElementById("moves").innerText = 0;
    
    let oldCards = document.getElementsByClassName("card");
    while (oldCards.length > 0) {
        oldCards[0].remove();
    };
    
    //Create an array of 20 random unique numbers
    let arrayRandom = []
    while (arrayRandom.length < 20) {
        let number = Math.floor(Math.random()*20);
        if (arrayRandom.includes(number) === false) {
            arrayRandom.push(number);
        }
    }

    //With help of random array,
    //Create an array of the hidden images in random order.
    let cards = document.getElementsByClassName("hidden");
    let shuffledCards = []
    for(let i = 0; i < 20; i++) {
        shuffledCards.push(cards[arrayRandom[i]])
    }
    
    //Create html of the cards and push to the html document.
    for (let i = 0; i < shuffledCards.length; i++) {
        let source = shuffledCards[i].getAttribute("src");
        let img = document.createElement("img");
        img.setAttribute("src", source);
        img.className = "card closed";
        let cardDiv = document.getElementsByClassName('cards')
        cardDiv[0].appendChild(img);
    };

    cards = document.getElementsByClassName("closed");
    let turnedCards = [];
    for (let card of cards) {
        let open = function() {
            openCard(turnedCards, card);
        }
        card.addEventListener("click", open, true);
    }

};

/**
 * Show the card clicked and remove eventlistener for it so it cant be clicked while open.
 * Call checkPair function when 2 cards are clicked.
 */
function openCard(turnedCards, card) {
    console.log(card)
    card.classList.remove("closed");
    //card.removeEventListener("click", open, true);


    turnedCards.push(card);

    if (turnedCards.length === 2) {
        setTimeout( function() {
            checkPair(turnedCards, card);
            turnedCards.splice(0, 2);
            addMove();
        }, 500);    
    }
};

/**
 * Check if the two cards clicked are matching.
 * If they are, change color and keep open.
 * If not, turn back and add eventlisteners again.
 */
function checkPair(turnedCards, card) {
    
    let source1 = turnedCards[0].getAttribute("src");
    let source2 = turnedCards[1].getAttribute("src");
    
    if (source1 === source2) {

        turnedCards[0].className = "card paired";
        turnedCards[1].className = "card paired";
        setTimeout( function() {
            winGame()
            }, 500);
        
    } else {

        turnedCards[0].className = "card closed";
        turnedCards[1].className = "card closed";
        //turnedCards[0].addEventListener("click", open, true);
        //turnedCards[1].addEventListener("click", open, true);
    }
};

/**
 * Show number of moves the user has done during this game.
 */
function addMove() {
    let moves = parseInt(document.getElementById("moves").innerText);
    document.getElementById("moves").innerText = ++moves;
};

/**
 * Calculate if all pairs are found and if so, alert: congratulations!
 */
function winGame() {
    
    let paired = document.getElementsByClassName("card paired");
    if (paired.length === 20) {
        alert("You won!");
        recordCount();
    };
    
};

/**
 * Show the lowest number of moves per game.
 */
function recordCount() {
    let moves = parseInt(document.getElementById("moves").innerText);
    let oldRecord = parseInt(document.getElementById("record").innerText);
    if (moves < oldRecord) {
        document.getElementById("record").innerText = moves;
    } else if (oldRecord === 0) {
        document.getElementById("record").innerText = moves;
    }
};