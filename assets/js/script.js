//Add eventlistener to button when the page is loaded
//and call function startGame.
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function() {
            modal.className = "modal hidden";
            startGame();
        })
    };
    startGame();
});

// Declair global variables
let modal = document.getElementsByClassName("modal hidden")[0];
let div = document.getElementsByClassName("modal-text")[0];
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
        //Remove all eventlisteners to make it impossible to open
        //more then two cards at the time.
        let cards = document.getElementsByClassName("card closed");
        for (let card of cards) {
            card.removeEventListener("click", open, true);
        }
        setTimeout( function() {
            checkPair(turnedCards);
            turnedCards.length = 0;
            addMove();
        }, 800);    
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
        turnedCards[0].className = "card paired";
        turnedCards[1].className = "card paired";
        let cards = document.getElementsByClassName("card closed");
        for (let card of cards) {
            card.addEventListener("click", open, true);
        }
        setTimeout( function() {
            winGame();
            }, 500);   
    } else {
        turnedCards[0].className = "card closed";
        turnedCards[1].className = "card closed";
        let cards = document.getElementsByClassName("card closed");
        for (let card of cards) {
            card.addEventListener("click", open, true);
        }
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
        
        //Empty the content of the modal to make room for new content.
        while (div.children.length > 0) {
            div.children[0].remove();
        }
        if (moves < oldRecord) {
            modal.classList.remove("hidden");
            let h1 = document.createElement("h1");
            h1.innerText = "Yay, you made a new record!";
            div.appendChild(h1);
            let p = document.createElement("p");
            p.innerText = `You found all the matching pairs with only ${moves} moves!`;
            div.appendChild(p);
            recordCount();
        } else if (oldRecord === 0) {
            modal.classList.remove("hidden");
            let h1 = document.createElement("h1");
            h1.innerText = "Good job!";
            div.appendChild(h1);
            let p = document.createElement("p");
            p.innerText = `You found all the matching pairs with only ${moves} moves!`;
            div.appendChild(p);
            recordCount();
        } else {
            modal.classList.remove("hidden");
            let h1 = document.createElement("h1");
            h1.innerText = "Good job!";
            div.appendChild(h1);
            let p = document.createElement("p");
            p.innerText = `You found all the matching pairs with ${moves} moves!`;
            div.appendChild(p);
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