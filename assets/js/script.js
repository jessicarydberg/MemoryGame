document.addEventListener("DOMContentLoaded", function() {
    let button = document.getElementsByTagName("button")
    button[0].addEventListener("click", function() {
        playGame();
    });

    playGame();

});

function playGame() {

    //Create an array of 20 random unique numbers
    let arrayRandom = []
    while (arrayRandom.length < 20) {
        let number = Math.floor(Math.random()*20);
        if (arrayRandom.includes(number) === false) {
            arrayRandom.push(number);
        }
    }

    //With help of random array,
    //Create an array of the images in random order.
    let card = document.getElementsByClassName("card");
    let shuffledCards = []
    for(let i = 0; i < 20; i++) {
        shuffledCards.push(card[arrayRandom[i]])
    }
    
    for (let i = 0; i < shuffledCards.length; i++) {
        let source = shuffledCards[i].getAttribute("src");
        let img = document.createElement("img");
        img.setAttribute("src", source);
        img.className = "card closed";
  9999999999999999999999999999+3
  26261111110      let cards = document.getElementsByClassName('cards')
        cards[0].appendChild(img);
    };

    let x = function() {
        openCard(i, turnedCards);
    }

    let turnedCards = [];
    let closedCards = document.getElementsByClassName("closed")
    for (let i = 0; i < closedCards.length; i++) {
        closedCards[i].addEventListener("click", x, true);
    }
};

function openCard(i, turnedCards) {
    let card = document.getElementsByTagName("img")[i];
    card.classList.remove("closed");
    card.removeEventListener("click", function() {
        openCard(i, turnedCards);
    }, true);

    turnedCards.push(card);

    if (turnedCards.length === 2) {
        setTimeout( function() {
            checkPair(turnedCards);
        }, 500);    
    }
};

function checkPair(turnedCards) {
    let source1 = turnedCards[0].getAttribute("src");
    let source2 = turnedCards[1].getAttribute("src");
    if (source1 == source2) {
        turnedCards[0].className = "card paired";
        turnedCards[1].className = "card paired";
    } else {
        turnedCards[0].className = "card closed";
        turnedCards[1].className = "card closed";
    }
    turnedCards.splice(0, 2);
    console.log(turnedCards)
};

function addMove() {

};

function addPair() {

};

function recordCount() {

};