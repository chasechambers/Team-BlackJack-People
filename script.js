let newDeckUrl = 'https://deckofcardsapi.com/api/deck/new/';
let shuffleDeckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
let drawCards = 'https://deckofcardsapi.com/api/deck/new/draw/?count=2';
// let returnCards = `https://deckofcardsapi.com/api/deck/${deckId}/return/`
let deckId = 1;
let userCard = document.getElementById('userCard');
let cardImgElement = document.createElement('img');

// GET A DECK AND DRAW 1 CARD FUNCTION
function drawSomeCards() {
return fetch(drawCards)
    .then((response) => {
        return response.json();
    })
        .then((data) => {
            console.log(data);
            deckId = data.deck_id;

            let i = 0;
            for (i=0; i<2; i++) {

            cardImgElement.src+= data.cards[i].image;
            document.body.appendChild(cardImgElement);
        }
        })
    };


drawSomeCards()
    .then((response) => {
        console.log(deckId);
        






    })

