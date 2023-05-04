// API VARIABLES

const newDeck = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

// DOM MANIPULATION VARIABLES

const playerDeck = document.getElementById('player-deck');
const playerCards = document.getElementById('player-cards');
const opponentCards = document.getElementById('oppo-cards');
const hitMeButton = document.getElementById('hit');
const stayMeButton = document.getElementById('stay');
const playerScore = document.getElementById('player-hand-total');
const dealerScore = document.getElementById('oppo-hand-total');
const playAgain = document.getElementById('play-again');
const cardCovers = document.getElementById('cardCovers');
const handCovers = document.getElementById('oppo-hand-cover');
const handText = document.getElementById('oppo-hand-text');
const highscoreButton = document.getElementById('save-button');

//GLOBAL VARIABLES

var playerScoreArray = [];
var dealerScoreArray = [];
var deckId = 1;
var score = 0;


// CARD VALUES

var valueMapper = {
    "1" : 1,
    "2" : 2,
    "3" : 3,
    "4" : 4,
    "5" : 5,
    "6" : 6,
    "7" : 7,
    "8" : 8,
    "9" : 9,
    "10": 10,
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

// When called draws a card and gives it to either the player or the dealer

function universalDrawCard(containerElement){
    let drawCards = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    fetch(drawCards)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let cardImgElement = document.createElement('img');
        let cardImgCover = document.createElement('img');
        cardImgCover.src = 'assets/images/BackOfCard.png';
        if (containerElement == opponentCards) {
            //creates the card cover image, visible
            cardCovers.appendChild(cardImgCover);
            //creates the card's actual data, invisible
            cardImgElement.src = data.cards[0].image;
        } else {
            cardImgElement.src = data.cards[0].image;
        }
        cardImgElement.dataset.cardValue = valueMapper[data.cards[0].value];
        
        containerElement.appendChild(cardImgElement);
    });
};

// BUILDS ARRAY FROM VALUES OF CARDS

function buildArray(containerElement, array) {
    let i = 0;
    let children = containerElement.children;  
    for (i=0; i<children.length; i++) {
    array.push(Number(children[i].dataset.cardValue));
    }
}

// CALCULATES VALUE OF CARDS FOR EACH PLAYER

function calculateScore(array, scoreContainer) {
    let sum = 0;
    let i = 0;
    for(i = 0; i<array.length; i++) {
        sum += array[i];
    };
    scoreContainer.textContent = sum;
}




//HIT ME BUTTON FUNCTION

hitMeButton.addEventListener('click', function() {
    playerScoreArray.length = 0;
    universalDrawCard(playerCards);
    setTimeout(() => {
        buildArray(playerCards,playerScoreArray);
        calculateScore(playerScoreArray, playerScore);
        if (playerScore.textContent > 21) {
            hitMeButton.style.display ='none';
            stayMeButton.style.display='none';
        }
    }, 200);
   
});

// STAY BUTTON FUNCTIONALITY

stayMeButton.addEventListener('click', function() {
    // Removes card covers and displays scores
    hitMeButton.style.display ='none';
    cardCovers.style.display = 'none';
        handCovers.style.display = 'none';
        opponentCards.style.display = 'initial';
        handText.style.display = 'inline';
        dealerScore.style.display = 'inline';

    if (dealerScore.textContent <= 16 ) {
        dealerScoreArray.length = 0;
        universalDrawCard(opponentCards);
        setTimeout(() => {
            buildArray(opponentCards, dealerScoreArray);
            calculateScore(dealerScoreArray, dealerScore)
        }, 200); 
    } 
    setTimeout(() => {
        if (dealerScore.textContent <= 16) {
            dealerScoreArray.length = 0;
            universalDrawCard(opponentCards);
            setTimeout(() => {
                buildArray(opponentCards, dealerScoreArray);
                calculateScore(dealerScoreArray, dealerScore)
            }, 600);
            
        } else { 
            checkWinner(playerScore.textContent, dealerScore.textContent);
        }
    }, 500);
    
    
});

//reloads page after play again press
playAgain.addEventListener('click', function() {
    location.reload()
}
    
);
// creates an object with the user's score and initials

// ORIGINAL CODE FOR HIGHSCORE

function saveScore(e) {
    var initials = input.value;
    var scoreData = {
        initials: initials,
        score: score
    };
    var scores = JSON.parse(localStorage.getItem("scores")) || [];

    scores.push(scoreData);
 
    localStorage.setItem('scores', JSON.stringify(scores));
}

// TEST CODE FOR HIGHSCORE

highscoreButton.addEventListener('click', function(event) {
    event.preventDefault;
    saveScore();
    window.location.replace("./highscores.html");
       
})



// checks is playerScore is equal to 21

function checkWinner(playerScore, dealerScore) {
    if (playerScore === 21 && dealerScore === 21){
        console.log("its a tie!");
        
    }
    else if(playerScore === 21 && dealerScore != 21){
        score += 1;
        console.log("you win!");
        
    }
    else if (dealerScore === 21 && playerScore != 21){
        console.log("you lose!");
        saveScore();
        
    }
    else if(playerScore > 21){
        console.log("you lose!");
        saveScore();
        
    }
    else if(dealerScore > 21){
        score += 1;
        console.log("you win!");
        
    }
    else if(playerScore<= 21 && playerScore>dealerScore){
        score += 1;
        console.log("you win!");
       
    }
    else if(dealerScore<= 21 && dealerScore>playerScore){
        console.log("you lose!");
        saveScore();
        
    }
};

    // THIS IS THE CODE RUNNING


    retrieveNewDeck()
    .then(() => {
            universalDrawCard(playerCards);
            universalDrawCard(playerCards);
            universalDrawCard(opponentCards);
            universalDrawCard(opponentCards);
            setTimeout(() => {
                buildArray(playerCards,playerScoreArray);
                buildArray(opponentCards,dealerScoreArray);
                calculateScore(playerScoreArray, playerScore);
                calculateScore(dealerScoreArray, dealerScore);
                checkWinner();
            }, 500);
           
    })


var audio = new Audio('assets/audio/casino-music.mp3');
var audioPlayed = false;
var isMuted = false;

// plays music when anything is clicked
document.addEventListener('click', function () {
    if (!audioPlayed) {
      audio.volume = 0.1;
      audio.play();
      audioPlayed = true;
      document.getElementById("stop-audio").innerHTML = "Mute";
    }
  });
  
  // pauses music if pause button is pressed
  document.getElementById('stop-audio').addEventListener('click', function() {
    if (audio.muted) {
      audio.muted = false;
      isMuted = false;
      document.getElementById("stop-audio").innerHTML = "Mute";
    } else {
      audio.muted = true;
      isMuted = true;
      document.getElementById("stop-audio").innerHTML = "Unmute";
    }
  });
  


