let newDeckUrl = 'https://deckofcardsapi.com/api/deck/new/';
let shuffleDeckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
let drawCards = 'https://deckofcardsapi.com/api/deck/new/draw/?count=4';
// let returnCards = `https://deckofcardsapi.com/api/deck/${deckId}/return/`
let deckId = 1;
let playerDeck = document.getElementById('player-deck');

let playerCards = document.getElementById('player-cards');
let opponentCards = document.getElementById('oppo-cards');

// GET A DECK AND DRAW 1 CARD FUNCTION
function drawPlayerCards() {
return fetch(drawCards)
    .then((response) => {
        return response.json();
    })
        .then((data) => {
            deckId = data.deck_id;
            console.log(data)
        
        // function displayPlayerCardsInHtml(cards){
            let i = 0;
            for (i=0; i<2; i++) {
                let cardImgElement = document.createElement('img');
                cardImgElement.src= data.cards[i].image;
                playerCards.appendChild(cardImgElement);
            }
    });
};

function displayPlayerCardsInHtml(cards){
    let i = 0;
    for (i=0; i<2; i++) {
        let cardImgElement = document.createElement('img');
        cardImgElement.src= data.cards[i].image;
        playerCards.appendChild(cardImgElement);
    }
};

function displayOpponentCardsInHtml(opponentCards){
    let i = 0;
    for (i=0; i<2; i++) {
        let cardImgElement = document.createElement('img');
        cardImgElement.src= data.cards[i].image;
        opponentCards.appendChild(cardImgElement);
    }
};

drawPlayerCards()
    .then((response) => {
        drawOpponentCards();
        console.log(deckId);






    })

    function drawOpponentCards() {
        return fetch(drawCards)
            .then((response) => {
                return response.json();
            })
                .then((data) => {
                    deckId = data.deck_id;
                    console.log(data)
                
                // function displayPlayerCardsInHtml(cards){
                    let i = 0;
                    for (i=0; i<2; i++) {
                        let cardImgElement = document.createElement('img');
                        cardImgElement.src= data.cards[i].image;
                        opponentCards.appendChild(cardImgElement);
                    }
            });
        };