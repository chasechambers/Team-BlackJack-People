let newDeckUrl = 'https://deckofcardsapi.com/api/deck/new/';
let shuffleDeckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
let drawCards = 'https://deckofcardsapi.com/api/deck/new/draw/?count=2';
// let returnCards = `https://deckofcardsapi.com/api/deck/${deckId}/return/`
let deckId = 1;
let playerDeck = document.getElementById('player-deck');

let playerCards = document.getElementById('player-cards');

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
                let cardImgElement = document.createElement('img');
                cardImgElement.src= data.cards[i].image;
                playerCards.appendChild(cardImgElement);
        }
        })
    };
//     var cards = [
//         {
//             "image" : "urlgoeshere"
//         }
//     ];
// function displayCardsInHtml(cards){
//     for(...){
//     let cardImgElement = document.createElement('img');
//                 cardImgElement.src= cards[i].image;
//                 playerCards.appendChild(cardImgElement);
//     }
// }
drawSomeCards()
    .then((response) => {
        console.log(deckId);
        






    })

