let newDeckUrl = 'https://deckofcardsapi.com/api/deck/new/';
let shuffleDeckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
let newDeck = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2';

// DOM MANIPULATION VARIABLES
let playerDeck = document.getElementById('player-deck');
let playerCards = document.getElementById('player-cards');
let opponentCards = document.getElementById('oppo-cards');
let hitMeButton = document.getElementById('hit');
let stayMeButton = document.getElementById('stay');
let playerScore = document.getElementById('player-hand-total');
let dealerScore = document.getElementById('oppo-hand-total');

let playerScoreArray = [];
let dealerScoreArray = [];
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
    "10" : 10,
    "JACK" : 10,
    "QUEEN" : 10,
    "KING" : 10,
    "ACE" : 11,
};

function retrieveNewDeck() {
    return fetch(newDeck)
        .then((response) => {
            return response.json();
        })
            .then((data) => {
                deckId = data.deck_id;
        });
    };
  

    function universalDrawCard(containerElement){
        let drawCards = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
       return fetch(drawCards)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let cardImgElement = document.createElement('img');
            cardImgElement.src  = data.cards[0].image;
            cardImgElement.dataset.cardValue = valueMapper[data.cards[0].value];
            containerElement.appendChild(cardImgElement);
           
    })
    };

function buildArray(containerElement, array) {
    let i = 0;
    let children = containerElement.children;  
    for (i=0; i<children.length; i++) {
    array.push(Number(children[i].dataset.cardValue));
    }
    console.log(array)
}


function calculateScore(array, scoreContainer) {
    let sum = 0;
    let i = 0;
    for(i = 0; i<array.length; i++) {
        sum += array[i];
    };
    scoreContainer.textContent = sum;
}

hitMeButton.addEventListener('click', function() {
    playerScoreArray.length = 0;
    universalDrawCard(playerCards);
    setTimeout(() => {
        buildArray(playerCards,playerScoreArray);
        calculateScore(playerScoreArray, playerScore);
        if (playerScore.textContent > 21) {
            console.log('You lose')};
    }, 200);
   
});





    retrieveNewDeck()
    .then(() => {
            universalDrawCard(playerCards);
            universalDrawCard(playerCards);
            universalDrawCard(opponentCards);
            universalDrawCard(opponentCards);
            setTimeout(() => {
                buildArray(playerCards,playerScoreArray);
                buildArray(opponentCards,dealerScoreArray);
                calculateScore(playerScoreArray, playerScore)
                calculateScore(dealerScoreArray, dealerScore)
            }, 500);
           
    })


    
    stayMeButton.addEventListener('click', function() {

        
        if (dealerScore.textContent < 16 ) {
            dealerScoreArray.length = 0;
            universalDrawCard(opponentCards);
            setTimeout(() => {
                buildArray(opponentCards, dealerScoreArray);
                calculateScore(dealerScoreArray, dealerScore)
            }, 500);
        } 
        setTimeout(() => {
            if (dealerScore.textContent < 16) {
                console.log ('Need to draw again')
                dealerScoreArray.length = 0;
                universalDrawCard(opponentCards);
                setTimeout(() => {
                    buildArray(opponentCards, dealerScoreArray);
                    calculateScore(dealerScoreArray, dealerScore)
                }, 500);
                
            } else { console.log ('Stop drawing cards')
    }
        }, 500);

    //     while (dealerScore.textContent < 16) {
    //         setTimeout(() => {
    //             dealerScoreArray.length = 0;
    //             universalDrawCard(opponentCards);
    //             buildArray(opponentCards,dealerScoreArray);
    //             calculateScore(dealerScoreArray, dealerScore);
    //     })
    // }
    });