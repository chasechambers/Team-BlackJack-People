var highscore = document.querySelector("#highscore");
var clearHighscore = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

//event listener that clear scores 
clearHighscore.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

//retreives local stroage 
var scores = localStorage.getItem("scores");
scores = JSON.parse(scores);

if (scores !== null) {
    for (var i = 0; i < scores.length; i++) {
        var newLi = document.createElement("li");
        newLi.textContent = scores[i].initials + " " + scores[i].score;
        highscore.appendChild(newLi);
    }
}

//event listener that moves to back to first page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});