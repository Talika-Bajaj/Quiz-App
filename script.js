let score = 0;
let startQuiz = document.getElementById("startQuiz");
let playAgain = document.getElementById("playAgain");


async function getQuestions() {
    let question = await fetch("https://opentdb.com/api.php?amount=1");
    let data = await question.json();
    console.log(data);
    showQuestion(data.results[0]);

}

getQuestions();


function showQuestion(data) {
    console.log(data);
    console.log(data.correct_answer);

    question.innerHTML = data.question;
    const { correct_answer, incorrect_answers } = data;
    const answer = [correct_answer, ...incorrect_answers];
    console.log(answer);

    answer.sort(() => Math.random() - 0.5);
    console.log(answer);

    // let answers = document.querySelectorAll(".answer");
    // for (let i = 0; i< answer.length; i++) {
    //     answers[i].innerHTML = answer[i];
    // }
    let answersList = document.querySelector(".answersList")
    answersList.innerHTML = `
    ${answer.map((ans) =>
        `<button>${ans}</button>`
    ).join(" ")} `;
    // let answersList = document.querySelector(".answersList")
    answersList.querySelectorAll("button").forEach(element => {
        if (element.innerHTML === correct_answer) {
            element.addEventListener("click", correctAnswer)
        }

    });
}

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


function correctAnswer() {
    score += 10;
    console.log("it is correct");
    getQuestions();
    updateScore();
}

function updateScore() {
    document.getElementById("score").innerHTML = score;
}

function endQuiz() {
    document.getElementById("quizScreen").classList.add("hidden");
    document.getElementById("endScreen").classList.remove("hidden");
    let endMsg = document.getElementById("endMessage");
    let finalScore = document.getElementById("finalScore");

    if (score <= 20) {
        endMsg.innerText = "You played poor";
    } else if (score >= 20 && score <= 50) {
        endMsg.innerText = "You played good";
    } else {
        endMsg.innerText = "You played good";
    }

    finalScore.innerHTML = score;
}


startQuiz.addEventListener("click", () => {
    countDown(60);
    document.getElementById("start-rules").style.display = "none";
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("quizScreen").classList.remove("hidden");
})

playAgain.addEventListener("click", ()=> {
    document.getElementById("quizScreen").classList.remove("hidden");
    document.getElementById("endScreen").classList.add("hidden");
    
    getQuestions();
    countDown(60);
    score = 0;
    updateScore();

})