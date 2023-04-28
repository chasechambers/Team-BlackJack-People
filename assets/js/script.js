// API VARIABLES
let newDeckUrl = 'https://deckofcardsapi.com/api/deck/new/';
let shuffleDeckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
let newDeck = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

// DOM MANIPULATION VARIABLES
let playerDeck = document.getElementById('player-deck');
let playerCards = document.getElementById('player-cards');
let opponentCards = document.getElementById('oppo-cards');
let hitMeButton = document.getElementById('hit');
let playerScore = document.getElementById('player-hand-total');

//GLOBAL VARIABLES

let deckId = 1;

let valueMapper = {
    "1" : 1,
    "2" : 2,
    "3" : 3,
    "4" : 4,
    "5" : 5,
    "6" : 6,
    "7" : 7,
    "8" : 8,
    "9" : 9,
    "JACK" : 10,
    "QUEEN" : 10,
    "KING" : 10,
    "ACE" : 11,
};

// GET A NEW DECK AT BEGINNING OF THE GAME

function retrieveNewDeck() {
return fetch(newDeck)
    .then((response) => {
        return response.json();
    })
        .then((data) => {
            deckId = data.deck_id;
    });
};

// GIVES TWO CARDS AT THE BEGINNING OF THE GAME

function displayBeginningCardsInHtml(containerElement){
    let drawCards = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
    fetch(drawCards)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
    let i = 0;
    for (i=0; i<2; i++) {
        let cardImgElement = document.createElement('img');
        cardImgElement.src= data.cards[i].image;
        cardImgElement.dataset.cardValue = valueMapper[data.cards[i].value];
        containerElement.appendChild(cardImgElement);
    };
    console.log(data);

});
};


//HIT ME BUTTON FUNCTION

function hitMe(cards){
    let drawCards = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    fetch(drawCards)
    .then((response) => {
        return response.json();
    })
    .then((data) =>{

        // hitMeButton.addEventListener('click', function(e) {
    
            let cardImgElement = document.createElement('img');
            cardImgElement.src= data.cards[0].image;
            playerCards.appendChild(cardImgElement);
            playerScore.textContent = 
            console.log(data)
    
    })
    
}

//STAY BUTTON FUNCTIONALITY

function stayMe(cards){
    while (dealerScore < 16) {
        let drawCards = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`

        fetch(drawCards)
        .then((response) => {
            return response.json();
        })
        .then((data) =>{

            // hitMeButton.addEventListener('click', function(e) {
    
            let cardImgElement = document.createElement('img');
            cardImgElement.src= data.cards[0].image;
            opponentCards.appendChild(cardImgElement);
            // add new card to dealer score
            if (dealderScore > 21)
            {
                //Dealer loses
            }
            playerScore.textContent = 
            console.log(data)
    
    })
    }
}

// SCORE TALLY




// THIS IS THE CODE RUNNING

retrieveNewDeck()
    .then((response) => {
        displayBeginningCardsInHtml(playerCards);
        displayBeginningCardsInHtml(opponentCards);
        console.log(deckId);
        hitMeButton.addEventListener('click', function() {
            hitMe();
        });
    })