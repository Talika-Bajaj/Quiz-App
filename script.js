let score = 0;
let startQuiz = document.getElementById("startQuiz");
let playAgain = document.getElementById("playAgain");


async function getQuestions() {
    let question = await fetch("https://opentdb.com/api.php?amount=1");
    let data = await question.json();
    console.log(data);
    console.log(data.response_code);
    if (data.response_code === 0) {
        showQuestion(data.results[0]);
    } else {
        document.getElementById("question").innerHTML = "Error fetching question.Please try again";
        score-= 10;
    }

}

getQuestions();


function showQuestion(data) {
    try {

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
            `<button class="btn">${ans}</button>`
        ).join(" ")} `;
        // let answersList = document.querySelector(".answersList")
        answersList.querySelectorAll("button").forEach(element => {
            if (element.innerHTML === correct_answer) {
                element.addEventListener("click", correctAnswer)
            }

        });
    } catch (error) {
        question.innerHTML = "Error in fetching question. Please Wait";
        console.log(error);
    }
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
    document.getElementById("quizScreen").classList.remove("active");
    document.getElementById("endScreen").classList.remove("hidden");
    let endMsg = document.getElementById("endMessage");
    let finalScore = document.getElementById("finalScore");

    if (score <= 20) {
        endMsg.innerHTML = `<span style = "color: black">Remarks: </span> You played poor`;
    } else if (score >= 20 && score <= 50) {
        endMsg.innerHTML = `<span style = "color: black">Remarks: </span> You played good`;
    } else {
        endMsg.innerHTML = `<span style = "color: black">Remarks: </span> You played good`;
    }

    finalScore.innerHTML = `<span style = "font-weight:600">Final score: </span> ${score}`;
}


startQuiz.addEventListener("click", () => {
    countDown(60);
    document.getElementById("start-rules").style.display = "none";
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("quizScreen").classList.add("active");
    // document.getElementById("quizScreen").style.display = "flex";
})

playAgain.addEventListener("click", () => {
    document.getElementById("quizScreen").classList.add("active");
    document.getElementById("endScreen").classList.add("hidden");

    getQuestions();
    countDown(60);
    score = 0;
    updateScore();

})