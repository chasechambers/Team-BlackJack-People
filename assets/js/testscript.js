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
