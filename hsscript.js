/* Creates DOM html elements to be used later */
var highscoresListEl = document.getElementById("highscores-list");
var clearButton = document.getElementById("clear-highscores");

/* Grabs the highscores from local storage, sorts them and displays them in the highscores html */
var highscoresList = JSON.parse(localStorage.getItem("code-quiz-highscores"));

if (highscoresList) {
  highscoresList.sort(function (a, b) {
    return b.score - a.score;
  });

  highscoresList.forEach(function (highscore, index) {
    var liEl = document.createElement("li");
    liEl.innerText = highscore.initials + " - " + highscore.score;
    highscoresListEl.appendChild(liEl);
  });
}

/* Clears the high scores from the page and removes them from local storage */
clearButton.addEventListener("click", function (event) {
  event.preventDefault();

  localStorage.removeItem("code-quiz-highscores");

  highscoresListEl.innerHTML = "";
});
