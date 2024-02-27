//setting score to 0
let score = 0;
let startQuiz = document.getElementById("start-quiz");
let playAgain = document.getElementById("play-again");

//async function to fetch api
async function getQuestions() {
    let question = await fetch("https://opentdb.com/api.php?amount=1");
    let data = await question.json();
    console.log(data);
    // console.log(data.response_code);
    try {
        showQuestion(data.results[0]);
    } catch (error) {
        document.getElementById("question").innerHTML = "Error fetching question.Please try again";
    }

}

getQuestions();

//function to display questions from api
function showQuestion(data) {

    // console.log(data);
    console.log(data.correct_answer);

    question.innerHTML = data.question;
    const { correct_answer, incorrect_answers } = data;
    const answer = [correct_answer, ...incorrect_answers];
    // console.log(answer);

    answer.sort(() => Math.random() - 0.5);
    // console.log(answer);

    let answersList = document.querySelector(".answers-list")
    answersList.innerHTML = `
    ${answer.map((ans) =>
        `<button class="btn">${ans}</button>`
    ).join(" ")} `;

    answersList.querySelectorAll("button").forEach(element => {
        if (element.innerHTML !== correct_answer) {
            element.addEventListener("click", () => {
                element.style.backgroundColor = "#a42626";
                setTimeout(() => {
                    getQuestions();
                }, 500)
            });
        } else {
            element.addEventListener("click", () => {
                score += 10;
                console.log("it is correct");
                element.style.backgroundColor = "mediumseagreen";
                setTimeout(() => {
                    getQuestions();
                    updateScore();
                }, 500)
            });
        }

    });

}

//function to run countdown
function countDown(seconds) {
    let counter = seconds;

    let interval = setInterval(() => {
        counter--;
        document.getElementById("timer").innerHTML = `Time left: ${counter} seconds`;

        if (counter == 0) {
            clearInterval(interval);
            endQuiz();
        }
    }, 1000)
}

//function for correct answer
function correctAnswer() {
    score += 10;
    console.log("it is correct");
    getQuestions();
    updateScore();
}

//function to update the score
function updateScore() {
    document.getElementById("score").innerHTML = score;
}

// function to display remarks
function endQuiz() {
    document.getElementById("quiz-screen").classList.remove("active");
    document.getElementById("end-screen").classList.add("active");
    let endMsg = document.getElementById("end-message");
    let finalScore = document.getElementById("final-score");

    if (score <= 20) {
        endMsg.innerHTML = `<span style = "color: black">Remarks: </span> You played poor`;
    } else if (score >= 20 && score <= 50) {
        endMsg.innerHTML = `<span style = "color: black">Remarks: </span> You played good`;
    } else {
        endMsg.innerHTML = `<span style = "color: black">Remarks: </span> You played good`;
    }

    finalScore.innerHTML = `<span style = "font-weight:600">Final score: </span> ${score}`;
}

//event listener to start the quiz
startQuiz.addEventListener("click", () => {
    countDown(60);
    document.getElementById("start-rules").style.display = "none";
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-screen").classList.add("active");
    // document.getElementById("quizScreen").style.display = "flex";
})

//event handler to play the game again
playAgain.addEventListener("click", () => {
    document.getElementById("quiz-screen").classList.add("active");
    document.getElementById("end-screen").classList.remove("active");

    getQuestions();
    countDown(60);
    score = 0;
    updateScore();

})