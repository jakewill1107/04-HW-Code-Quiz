/* Creating elements from the DOM Html to be used later */
var startButton = document.getElementById("start-button");
var timer = document.getElementById("timer");
var containerEl = document.querySelector(".quiz-container");
var questionEl = document.getElementById("question");

/* Creates an empty variable set for the answers */
var answersEl;

/* Questions Array */
var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    options: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "2",
  },
  {
    question:
      "The condition in an if/else statement is enclosed within ______.",
    options: ["Quotes", "Curly brackets", "Parenthesis", "Square Brackets"],
    answer: "2",
  },
  {
    question: "Arrays in JavaScript can be used to store ______.",
    options: [
      "Numbers and Strings",
      "Other Arrays",
      "Booleans",
      "All of the Above",
    ],
    answer: "3",
  },
  {
    question:
      "String values must be enclosed within ______ when being assigned to variables.",
    options: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
    answer: "2",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: ["JavaScript", "Terminal/Bash", "For Loops", "Console.log"],
    answer: "3",
  },
];

/* Starts the quiz and the timer */
function startQuiz() {
  var secondsLeft = 75;
  timer.innerText = secondsLeft;
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timer.innerText = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      endQuiz(secondsLeft);
    }
  }, 1000);
  /* Removes button */
  startButton.remove();
  /* Creates html elements for the answer list - not styled in CSS or displayed in index */
  answersEl = document.createElement("ul");
  answersEl.classList.add("answer-list");
  /* Places the list in the container element */
  containerEl.appendChild(answersEl);
  /* Adding button functionality inside created answer list */
  answersEl.addEventListener("click", function (event) {
    var clickedElement = event.target;
    if (clickedElement.matches("button")) {
      var userChoice = clickedElement.getAttribute("option-value");

      /* Checks if the answer matches the the correct answer or not and displays correct or wrong message */
      if (userChoice === questions[currentQuestion].answer) {
        displayResult("Correct");
      } else {
        displayResult("Wrong");
        /* If answer is wrong, decrements the timer by 10 seconds */
        secondsLeft -= 10;
        timer.innerText = secondsLeft;
      }
      /* Progresses through questions until last question and stops the quiz */
      currentQuestion++;
      if (currentQuestion === questions.length) {
        clearInterval(timerInterval);
        endQuiz(secondsLeft);
      } else {
        displayQuiz(currentQuestion);
      }
    }
  });
  /* Makes sure the user start on the 1st question */
  var currentQuestion = 0;
  displayQuiz(currentQuestion);
}

/* Creates an element in the container area to display the result */
function displayResult(result) {
  var resultEl = document.createElement("p");
  resultEl.innerText = result;
  containerEl.appendChild(resultEl);
  var resultInterval = setInterval(function () {
    resultEl.remove();
    clearInterval(resultInterval);
  }, 750);
}

/* Displays the quiz questions from the questions array and clears any left over answers */
function displayQuiz(questionIndex) {
  questionEl.innerText = questions[questionIndex].question;
  answersEl.innerHTML = "";
  /* Creating the questions and answer options and places them in the Html */
  for (let i = 0; i < questions[questionIndex].options.length; i++) {
    var liEl = document.createElement("li");
    var buttonEl = document.createElement("button");
    buttonEl.setAttribute("option-value", i);
    buttonEl.classList.add("button");
    buttonEl.innerText = i + 1 + ". " + questions[questionIndex].options[i];
    liEl.appendChild(buttonEl);
    answersEl.appendChild(liEl);
  }
}

/* Ends quiz, removes elements and displays score */
function endQuiz(score) {
  answersEl.remove();
  questionEl.innerText = "Your final score is " + score;
  /* Creates a form and input for initials and places it in html */
  var FormEl = document.createElement("form");
  containerEl.appendChild(FormEl);
  var labelEl = document.createElement("label");
  labelEl.innerText = "Enter Initials: ";
  FormEl.appendChild(labelEl);
  var inputEl = document.createElement("input");
  FormEl.appendChild(inputEl);
  var submitButton = document.createElement("button");
  submitButton.classList.add("button");
  submitButton.innerText = "Submit";
  FormEl.appendChild(submitButton);
  /* Prevents default in form submission, grabs user input initials and makes them an object */
  FormEl.addEventListener("submit", function (event) {
    event.preventDefault();

    var userInitial = inputEl.value;
    if (userInitial) {
      var scoreObj = { initials: userInitial, score: score };

      /* Stores highscore initial input in local storage and converts it to a string */
      var highscoresList = JSON.parse(
        localStorage.getItem("code-quiz-highscores")
      );

      if (highscoresList) {
        highscoresList.push(scoreObj);
      } else {
        highscoresList = [scoreObj];
      }

      localStorage.setItem(
        "code-quiz-highscores",
        JSON.stringify(highscoresList)
      );
      /* link to separate highscores page */
      location.href = "highscores.html";
    }
  });
}

/* Starts the quiz and all the code when start quiz button is clicked */
startButton.addEventListener("click", startQuiz);
