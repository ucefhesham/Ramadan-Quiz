const questions = [
    {
        question: "Who is the prophet of Islam?",
        answers:[
            {text: "Muhammad", correct: true},
            {text: "Moses", correct: false},
            {text: "Jesus", correct: false},
            {text: "Abraham", correct: false},
        ]
    },
    {
        question: "What is the holy book of Islam called?",
        answers:[
            {text: "Quran", correct: true},
            {text: "Bible", correct: false},
            {text: "Torah", correct: false},
            {text: "Vedas", correct: false},
        ]
    },
    {
        question: "How many times a day do Muslims pray?",
        answers:[
            {text: "One Time", correct: false},
            {text: "Two times", correct: false},
            {text: "Three times", correct: false},
            {text: "Five times", correct: true},
        ]
    },
    {
        question: "What is the name of the holy month in Islam when Muslims fast?",
        answers:[
            {text: "Ramadan", correct: true},
            {text: "Hajj", correct: false},
            {text: "Eid", correct: false},
            {text: "Shahada", correct: false},
        ]
    },
    {
        question: "What is the name of the holy city in Islam that Muslims face when they pray?",
        answers:[
            {text: "Jerusalem", correct: false},
            {text: "Mecca", correct: true},
            {text: "Medina", correct: false},
            {text: "Baghdad", correct: false},
        ]
    },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'You Scored ' + score + ' out of '+ questions.length + '!';
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}    

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();