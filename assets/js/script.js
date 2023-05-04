// API VARIABLES

const newDeck = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

// DOM MANIPULATION VARIABLES

const playerDeck = document.getElementById('player-deck');
const playerCards = document.getElementById('player-cards');
const dealerCards = document.getElementById('dealer-cards');
const hitMeButton = document.getElementById('hit');
const stayMeButton = document.getElementById('stay');
const playerScore = document.getElementById('player-hand-total');
const dealerScore = document.getElementById('dealer-hand-total');
const playAgain = document.getElementById('play-again');
const cardCovers = document.getElementById('cardCovers');
const handCovers = document.getElementById('dealer-hand-cover');
const handText = document.getElementById('dealer-hand-text');
const highscoreButton = document.getElementById('save-button');
const startButton = document.getElementById('startGame');
const winText = document.getElementById('win-text');

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
        if (containerElement == dealerCards) {
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


// BUTTON SECTION

// START BUTTON

startButton.addEventListener('click', function() {
    playerCards.innerHTML = '';
    dealerCards.innerHTML = '';
    cardCovers.innerHTML = '';
    winText.textContent = '';
    cardCovers.style.display = 'initial';
    handCovers.style.display = 'initial';
    dealerCards.style.display = 'none';
    handText.style.display = 'none';
    dealerScore.style.display = 'none';

    hitMeButton.style.display ='initial';
    stayMeButton.style.display='initial';

    playerScoreArray = [];
    dealerScoreArray = [];
    deckId = 1;
    retrieveNewDeck()
    .then(() => {
            universalDrawCard(playerCards);
            universalDrawCard(playerCards);
            universalDrawCard(dealerCards);
            universalDrawCard(dealerCards);
            setTimeout(() => {
                buildArray(playerCards,playerScoreArray);
                buildArray(dealerCards,dealerScoreArray);
                calculateScore(playerScoreArray, playerScore);
                calculateScore(dealerScoreArray, dealerScore);
                checkWinner();
            }, 500); 
    })
})


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
            hitMeButton.style.display ='none';
            cardCovers.style.display = 'none';
            handCovers.style.display = 'none';
            dealerCards.style.display = 'initial';
            handText.style.display = 'inline';
            dealerScore.style.display = 'inline';
            winText.textContent = "You lose!"
            saveScore();
        }
    }, 200);
   
});

// STAY BUTTON FUNCTIONALITY

stayMeButton.addEventListener('click', function() {

// Removes card covers and displays scores

    hitMeButton.style.display ='none';
    cardCovers.style.display = 'none';
    handCovers.style.display = 'none';
    dealerCards.style.display = 'initial';
    handText.style.display = 'inline';
    dealerScore.style.display = 'inline';

//Reviews first for under or equal to 16.
    if (dealerScore.textContent <= 16 ) {
        dealerScoreArray.length = 0;
        universalDrawCard(dealerCards);
        setTimeout(() => {
            buildArray(dealerCards, dealerScoreArray);
            calculateScore(dealerScoreArray, dealerScore)
        }, 200); 
    } 
    setTimeout(() => {

// Delay then check again 

        if (dealerScore.textContent <= 16) {
            dealerScoreArray.length = 0;
            universalDrawCard(dealerCards);
            setTimeout(() => {
                buildArray(dealerCards, dealerScoreArray);
                calculateScore(dealerScoreArray, dealerScore)
            }, 600);
            
// If over 16, check through win conditions
        } else { 
            checkWinner(playerScore.textContent, dealerScore.textContent);
        }
    }, 500);
    
    
});



highscoreButton.addEventListener('click', function(event) {
    event.preventDefault;
    saveScore();
    window.location.replace("./highscores.html");
       
})
// creates an object with the user's score and initials


// HIGHSCORE CALCULATING SECTION SECTION


function saveScore() {
    var initials = input.value;
    var scoreData = {
        initials: initials,
        score: score
    };
    var scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push(scoreData);
    localStorage.setItem('scores', JSON.stringify(scores));
}

// WIN CONDITIONS

// checks is playerScore is equal to 21

function checkWinner(playerScore, dealerScore) {
    if (playerScore === 21 && dealerScore === 21){
        console.log("its a tie!");
        winText.textContent = "It's a tie!"
        
    }
    else if(playerScore === 21 && dealerScore != 21){
        score += 1;
        console.log("you win!");
        winText.textContent = "You win!"
    
    }
    else if (dealerScore === 21 && playerScore != 21){
        console.log("you lose!");
        winText.textContent = "You lose!"
        
        
    }
    else if(playerScore > 21){
        console.log("you lose!");
        winText.textContent = "You lose!"
        
    }
    else if(dealerScore > 21){
        score += 1;
        console.log("you win!");
        winText.textContent = "You win!"
    }
    else if(playerScore<= 21 && playerScore>dealerScore){
        score += 1;
        console.log("you win!");
        winText.textContent = "You win!"
    }
    else if(dealerScore<= 21 && dealerScore>playerScore){
        console.log("you lose!");
        winText.textContent = "You lose!"
    
        
    }
};

// MUSIC SECTION

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
  


   // THIS IS THE CODE RUNNING



