// API VARIABLES
let newDeckUrl = 'https://deckofcardsapi.com/api/deck/new/';
let shuffleDeckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
let newDeck = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

// DOM MANIPULATION VARIABLES
let playerDeck = document.getElementById('player-deck');
let playerCards = document.getElementById('player-cards');
let opponentCards = document.getElementById('oppo-cards');
let hitMeButton = document.getElementById('hit');
let stayMeButton = document.getElementById('stay');
let playerScore = document.getElementById('player-hand-total');
var dealerScore = 10;

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
            document.getElementById('cardCovers').appendChild(cardImgCover);
            //creates the card's actual data, invisible
            cardImgElement.src = data.cards[0].image;
        } else {
            cardImgElement.src = data.cards[0].image;
        }
        cardImgElement.dataset.cardValue = valueMapper[data.cards[0].value];
        
        containerElement.appendChild(cardImgElement);
        console.log(data);
    });
};


//HIT ME BUTTON FUNCTION

function hitMe(cards){
    universalDrawCard(playerCards);
    // Code to calculate current score
    // Code to calculate loss if player score is over 21
    
}

// STAY BUTTON FUNCTIONALITY

function stayMe(cards){
    // DEALER'S TURN
    // dealerScore will be replaced with a function that returns the actual current score
    while (houseScore < 16) {
        universalDrawCard(opponentCards);
        //adds new card to dealer score
        houseScore =  houseScore + 1; //Temp code to emulate the card's value
    }
    document.getElementById('cardCovers').style.display = 'none';
    opponentCards.style.display = 'initial';
    // CHECKS WHO WINS
    checkWinner();
}

// creates an object with the user's score and initials

function saveScore() {
    var initials = prompt("Please enter your initals.")

    var scoreData = {
        initials: initials,
        score: score
    };
    var scores = JSON.parse(localStorage.getItem("scores")) || [];

    scores.push(scoreData);

    checkWinner();
}

// creates an object with the user's score and initials

function saveScore() {
    var initials = prompt("Please enter your initals.")

    var scoreData = {
        initials: initials,
        score: score
    };
    var scores = JSON.parse(localStorage.getItem("scores")) || [];

    scores.push(scoreData);

    localStorage.setItem('scores', JSON.stringify(scores));
}

// adds event listener to the submit button
var submitButton = document.querySelector("#submit");
if (submitButton) {
  submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    saveScore();
    window.location.replace("./highscores.html");
  });
}

// checks is playerScore is equal to 21
function checkWinner(playerScore, houseScore) {
    if (playerScore === 21 && houseScore != 21){
        score += 1;
        console.log("you win!");
        console.log(score);
    }
    else if (houseScore === 21 && playerScore != 21){
        console.log("you lose!");
        saveScore();
        console.log(score);
    }
    else if (playerScore === 21 && houseScore === 21){
        console.log("its a tie!");
        console.log(score);
    }
    else if(playerScore > 21){
        console.log("you lose!");
        saveScore();
        console.log(score);
    }
    else if(houseScore > 21){
        score += 1;
        console.log("you win!");
        console.log(score);
    }
    else if(playerScore<= 21 && playerScore>houseScore){
        score += 1;
        console.log("you win!");
        console.log(score);
    }
    else if(houseScore<= 21 && houseScore>playerScore){
        console.log("you lose!");
        saveScore();
        console.log(score);
    }
};

    // THIS IS THE CODE RUNNING

retrieveNewDeck()
.then((response) => {
    for (i=0; i<2; i++) {
        universalDrawCard(playerCards);
    }
    for (i=0; i<2; i++) {
         universalDrawCard(opponentCards);
    }
    console.log(deckId);
    hitMeButton.addEventListener('click', function() {
        hitMe();
    });
    stayMeButton.addEventListener('click', function() {
        stayMe();
    });
})

var audio = new Audio('assets/audio/casino-music.mp3');
var audioPlayed = false;
var isMuted = false;

var audioIcon = document.getElementById('audio-icon');

// plays music when anything is clicked
document.addEventListener('click', function () {
    if (!audioPlayed) {
      audio.volume = 0.2;
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
  


