const start = document.getElementById("start");
const teslaQuiz = document.getElementById("teslaQuiz");
const qImg = document.getElementById("qImg");
const question = document.getElementById("question");
const a = document.getElementById("A");
const b = document.getElementById("B");
const c = document.getElementById("C");
const d = document.getElementById("D");

const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const score = document.getElementById("score");

let lastQuestionIndex = questions.length- 1;
let runningQuestionindex = 0;


let question = [
    {
        question: "Where was Nikola Tesla from?",
        imgSrc: "Repositories/Quite-the-Quiz/assets/photos/Old tesla portrait.webp",
        answers: {
            a: "Czech",
            b: "Romania",
            c: "Germany",
            d: "Croatia",
        },
        correctAnswer: "d"
    },
    {
        question: "Which well known man promised Nikola money for his work and then told him,'Tesla, you don't understand our American humor.'?",
        answers:{
            a: "JP Morgan",
            b: "Mark Twain",
            c: "Thomas Edison",
            d: "Henry Ford",
        },
        correctAnswer: "c",
    },
    {
        question: "Where did Tesla relocate to after hus lab burned down in New York City?",
        answers:{
            a: "Colorado Springs",
            b: "Seatle",
            c: "Boston",
        },
        correctAnswer: "b",
    },
   {
        question: "Which invention patents did he have stolen from him?",
        answers:{
            a: "AC transmission",
            b: "Radio powered boat",
            c: "Teleforce",
        },
        correctAnswer: "a",
    },
    {
        question: "Tesla had an unusual special ability, what was it?",
        answers:{
            a: "Intense visual imagination",
            b: "Reading fast",
            c: "Good with money",
            d: "Hand-eye coordination",
        },
        correctAnswer: "a",
    }   
];



function renderQuestion(){
    let q = questions[runningQuestionIndex];
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    question.innerHTML = "<p>" + q.question+ "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceA.innerHTML = q.choiceB;
    choiceA.innerHTML = q.choiceC;
    choiceA.innerHTML = q.choiceD;
    
    renderQuestion()
    runningQuestionIndex++
}

function progressRender(){
    for(let qIndex = 0; qIndex <= lastQuestionIndex; qIndex++){
        progressRender.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}
function answerIsCorrect(){
    document.getElementBuId(runningQuestionIndex).style.backgroundColor = "green"
}
function answerIsWrong(){
    document.getElementBuId(runningQuestionIndex).style.backgroundColor = "red";
}
const questionTime = 10;
const gaugeWidth = 150;
let count = 0;
const gaugeProgressUnit = gaugeWidth/questionTime;
let TIMER = setInterval(counterRender, 1000);

function counterRender(){
    if(count <= questionTime){
        counterRender.innerHTML = count;
        timeGauge.style.width = gaugeProgressUnit * count + "px";
        count++;
    }
    else{
        count = 0;
        answerIsWrong();
        if(runningQuestionIndex < lastQuestionIndex){
            runningQuestionIndex++;
            questionRender();
        }
        else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}
function checkAnswer(answer){
    if(questions[runningQuestionIndex].correct == answer){
        score++;
        answerIsCorrect();
    }
    else{
        answerIsWrong();
    }
    if(runningQuestionIndex < lastQuestionIndex){
        count = 0;
        runningQuestionIndex++;
        questionRender();
    }
    else{
        clearInterval(TIMER);
        scoreRender();
    }
}
start.addEventListener("click", startQuiz);

function startQuiz(){
    start.style.display = "none";
        counterRender();
        TIMER = setInterval(counterRender, 1000);
        progressRender();
        questionRender();
        startQuiz.style.display = "block";
}
function scoreRender(){
    scoreContainer.style.display = "block";
    let scorePerCent = Math.roundd(100 * score / questions.length);
    let text = (scorePerCent >= 80) ? "80":
                (scorePerCent >= 60) ? "60":
                (scorePerCent >= 40) ? "40":
                (scorePerCent >= 20) ? "20":
                (scorePerCent >= 0) ? "0": "LOSER";
                
    scoreContainer.innerHTML = "<text src" + text + "><p>" + scorePerCent + "%</p>";
}