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
        let cards = document.getElementsByClassName('cards')
        cards[0].appendChild(img);
    };

    let closedCards = document.getElementsByTagName("img")
    for (let i = 0; i < closedCards.length; i++) {
        closedCards[i].addEventListener("click", function() {
            openCard();
        });
    }
};

function openCard() {
    alert("hello");
};

function checkPair() {

};

function addMove() {

};

function addPair() {

};

function recordCount() {

};