
    const comprehensionQuestions = [
    // Your comprehension questions here
];

const grammarQuestions = [
    // Your grammar questions here
];

let currentGrammarIndex = 0;
let score = 0;
let answeredComprehensionQuestions = new Array(comprehensionQuestions.length).fill(false);
let answeredGrammarQuestions = new Array(grammarQuestions.length).fill(false);

// Show Comprehension Questions
function showComprehensionQuestions() {
    document.getElementById('text-section').style.display = 'none';
    document.getElementById('comprehension-section').style.display = 'block';

    let htmlContent = "";
    comprehensionQuestions.forEach((q, index) => {
        htmlContent += `
            <div>
                <p>${q.question}</p>
                <button class="answer-btn" onclick="checkComprehensionAnswer(${index}, 0)">${q.answers[0]}</button>
                <button class="answer-btn" onclick="checkComprehensionAnswer(${index}, 1)">${q.answers[1]}</button>
                <button class="answer-btn" onclick="checkComprehensionAnswer(${index}, 2)">${q.answers[2]}</button>
                <button class="answer-btn" onclick="checkComprehensionAnswer(${index}, 3)">${q.answers[3]}</button>
            </div>
        `;
    });
    document.getElementById('comprehension-questions').innerHTML = htmlContent;
}

// Check Comprehension Answer
function checkComprehensionAnswer(questionIndex, answerIndex) {
    if (answeredComprehensionQuestions[questionIndex]) return;

    const correctAnswer = comprehensionQuestions[questionIndex].correct;
    let buttons = document.querySelectorAll(`#comprehension-questions div:nth-child(${questionIndex + 1}) button`);
    buttons[answerIndex].style.backgroundColor = (answerIndex === correctAnswer) ? "green" : "red";

    answeredComprehensionQuestions[questionIndex] = true;

    // Display motivational message
    if (answerIndex === correctAnswer) {
        showMotivationalMessage(true);
    } else {
        showMotivationalMessage(false);
    }
}

// Show Grammar Questions
function showGrammarQuestions() {
    document.getElementById('comprehension-section').style.display = 'none';
    document.getElementById('grammar-section').style.display = 'block';
    loadGrammarQuestion();
}

// Load Grammar Question
function loadGrammarQuestion() {
    const question = grammarQuestions[currentGrammarIndex];
    document.getElementById('question-text').innerText = question.question;
    document.getElementById('answer0').innerText = `A) ${question.answers[0]}`;
    document.getElementById('answer1').innerText = `B) ${question.answers[1]}`;
    document.getElementById('answer2').innerText = `C) ${question.answers[2]}`;
    document.getElementById('answer3').innerText = `D) ${question.answers[3]}`;
}

// Check Grammar Answer
function checkAnswer(answerIndex) {
    if (answeredGrammarQuestions[currentGrammarIndex]) return;

    const correctAnswer = grammarQuestions[currentGrammarIndex].correct;
    const buttons = document.querySelectorAll('#answer-buttons button');
    buttons[answerIndex].style.backgroundColor = (answerIndex === correctAnswer) ? 'green' : 'red';

    answeredGrammarQuestions[currentGrammarIndex] = true;

    // Display motivational message
    if (answerIndex === correctAnswer) {
        showMotivationalMessage(true);
    } else {
        showMotivationalMessage(false);
    }
}

// Show Motivational Message
function showMotivationalMessage(correct) {
    const resultDiv = document.getElementById('result');
    if (correct) {
        resultDiv.innerHTML = 'You nailed it! Keep up the great work!';
    } else {
        resultDiv.innerHTML = 'Oops! Try again, you will get it!';
    }
}

// Navigate to next or previous question
function goToNext() {
    if (currentGrammarIndex < grammarQuestions.length - 1) {
        currentGrammarIndex++;
        loadGrammarQuestion();
    }
}

function goToPrevious() {
    if (currentGrammarIndex > 0) {
        currentGrammarIndex--;
        loadGrammarQuestion();
    }
}

// Submit the quiz and show the score
function submitQuiz() {
    let totalScore = 0;

    answeredGrammarQuestions.forEach((answered, index) => {
        if (answered) totalScore++;
    });

    document.getElementById('result').innerHTML = `You have completed the test! Your score is ${totalScore} out of ${grammarQuestions.length}.`;
}
