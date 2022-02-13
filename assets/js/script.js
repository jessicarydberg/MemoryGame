//Add eventlistener to button when the page is loaded
//and call function startGame.
document.addEventListener("DOMContentLoaded", function() {
    let button = document.getElementsByTagName("button")
    button[0].addEventListener("click", function() {
        startGame();
    });

    startGame();

});

function startGame() {

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

    playGame()

};

function playGame() {
    let cards = document.getElementsByClassName("closed");

    let turnedCards = [];
    for (let card of cards) {
        card.addEventListener("click", function() {
            openCard(turnedCards, card);
        });
    }
}

function openCard(turnedCards, card) {
    console.log(card)
    card.classList.remove("closed");
    //cards[i].removeEventListener("click", open, true)
    turnedCards.push(card);
    console.log(turnedCards)
    if (turnedCards.length === 2) {
        setTimeout( function() {
            checkPair(turnedCards);
        }, 500);    
    }

    delete turnedCards;
    console.log(turnedCards)

};

function checkPair(turnedCards) {
    
    let source1 = turnedCards[0].getAttribute("src");
    let source2 = turnedCards[1].getAttribute("src");
    
    if (source1 === source2) {

        turnedCards[0].className = "card paired";
        turnedCards[1].className = "card paired";
        
    } else {

        turnedCards[0].className = "card closed";
        turnedCards[1].className = "card closed";
        //turnedCards[0].addEventListener("click", open, true);
        //turnedCards[1].addEventListener("click", open, true);
        
    }
    
    turnedCards.splice(0, 2);
    playGame()
};

function addMove() {

};

function addPair() {

};

function recordCount() {

};