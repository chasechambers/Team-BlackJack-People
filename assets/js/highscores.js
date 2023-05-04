var highscore = document.getElementById('highscore');
var clearHighscore = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");



//event listener that clear scores 
clearHighscore.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
    
});

//retreives local stroage 
var scores = JSON.parse(localStorage.getItem("scores")) || [];
console.log(scores);
if (scores !== null) {
    for (var i = 0; i < scores.length; i++) {
        var newLi = document.createElement("li");
        newLi.textContent = `Initials: ${scores[i].initials} Consecutive Wins: ${scores[i].score}`;
        newLi.classList.add('subtitle');
        newLi.classList.add('is-5');
        newLi.classList.add("has-text-white");
        highscore.appendChild(newLi);
    }
}

//event listener that moves to back to first page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});