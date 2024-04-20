let question = document.querySelector("#question");
let nextBtn = document.querySelector("#next-btn");
let btn1 = document.querySelector("#btn1");
let btn2 = document.querySelector("#btn2");
let btn3 = document.querySelector("#btn3");
let btn4 = document.querySelector("#btn4");
let btn = document.querySelectorAll(".btn");
let scoreDiv = document.querySelector(".score");
let quizDiv = document.querySelector(".quiz");
var index = 0;
var score = 0;
var result;

async function Quizz() {
  let url = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`;

  try {
    const response = await fetch(url);
    var result = await response.json();
    var stringg = JSON.stringify(result.results);
    localStorage.setItem("store", stringg);
    startQuiz();
  } catch (error) {
    console.error(error);
  }
}

const startQuiz = () => {
  var QuizData = localStorage.getItem("store");
  var result = JSON.parse(QuizData);
  let correctAnswer = result[index].correct_answer.split();

  let Incorrect_answer = result[index].incorrect_answers;

  let all_answer = correctAnswer.concat(Incorrect_answer);
  const all_answer_1 = all_answer.sort(() => Math.random() - 0.5);

  question.innerHTML = result[index].question;
  btn1.innerHTML = all_answer_1[0];
  btn2.innerHTML = all_answer_1[1];
  btn3.innerHTML = all_answer_1[2];
  btn4.innerHTML = all_answer_1[3];

  index++;
};

nextBtn.addEventListener("click", () => {
  btn.forEach(function (option) {
    option.style.removeProperty("background-color");
    option.disabled = false;
    nextBtn.style.display = "none";
  });

  startQuiz();
});

function checkAnswer(clickedOption) {
  var answer = localStorage.getItem("store");
  var result = JSON.parse(answer);
  let question_answer = result[index - 1].correct_answer;
  let Clicked_answer = clickedOption.innerText;

  if (Clicked_answer == question_answer) {
    clickedOption.style.backgroundColor = "#26C45D";
    score++;
  } else {
    clickedOption.style.backgroundColor = "red";
    btn.forEach(function (option) {
      if (option.innerText == question_answer) {
        option.style.backgroundColor = "#26C45D";
      }
    });
  }

  btn.forEach(function (option) {
    option.disabled = true;
  });

  if (index === 9) {
    quizDiv.style.display = "none";
    scoreDiv.style.display = "block";
    scoreDiv.innerHTML = `Score = ${score}`;
  }

  nextBtn.style.display = "block";
}
