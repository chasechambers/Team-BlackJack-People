let newDeckUrl = 'https://deckofcardsapi.com/api/deck/new/';
let shuffleDeckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
let newDeck = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
// let returnCards = `https://deckofcardsapi.com/api/deck/${deckId}/return/`
let deckId = 1;
let playerDeck = document.getElementById('player-deck');

let playerCards = document.getElementById('player-cards');
let opponentCards = document.getElementById('oppo-cards');
let hitMeButton = document.getElementById('hit')


// GET A DECK AND DRAW 1 CARD FUNCTION

function retrieveNewDeck() {
return fetch(newDeck)
    .then((response) => {
        return response.json();
    })
        .then((data) => {
            deckId = data.deck_id;
    });
};

function displayPlayerCardsInHtml(cards){
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
        playerCards.appendChild(cardImgElement);
    };
    console.log(data);
});
};

function displayOpponentCardsInHtml(cards){
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
        opponentCards.appendChild(cardImgElement);
    };
    console.log(data);
});
};

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

            console.log(data)
    
    })
    
}

// THIS IS THE CODE RUNNING

retrieveNewDeck()
    .then((response) => {
        displayPlayerCardsInHtml();
        displayOpponentCardsInHtml();
        console.log(deckId);
        hitMeButton.addEventListener('click', function() {
            hitMe();
        });
    })