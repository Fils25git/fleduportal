let currentQuestionIndex = 0;
let score = 0;
let currentSection = 'text'; // to keep track of the current section (text, comprehension, grammar)

const comprehensionQuestions = [
    { question: "Where was Tom looking for his pencil?", options: ["Under the book", "In his bag"], correctAnswerIndex: 0 },
    { question: "What did the pencil say?", options: ["I need a break", "I'm tired of writing"], correctAnswerIndex: 0 },
    { question: "What did Tom offer the pencil?", options: ["A long rest", "A new pencil case"], correctAnswerIndex: 0 },
    { question: "Where did the pencil hide?", options: ["Under the teacher’s desk", "Under the table"], correctAnswerIndex: 0 },
    { question: "How did Tom get the pencil back?", options: ["By promising a long rest", "By calling it"], correctAnswerIndex: 0 }
];

const grammarQuestions = [
    { question: "Choose the correct verb form: Tom ___ his pencil.", options: ["find", "found"], correctAnswerIndex: 1 },
    { question: "Which sentence is correct?", options: ["Tom was finding his pencil.", "Tom finds his pencil."], correctAnswerIndex: 1 },
    { question: "Choose the correct preposition: The pencil is ___ the book.", options: ["on", "under"], correctAnswerIndex: 1 },
    { question: "What is the correct article? ___ pencil is on the table.", options: ["An", "A"], correctAnswerIndex: 0 },
    { question: "Which word is a noun?", options: ["run", "pencil"], correctAnswerIndex: 1 },
    { question: "Choose the correct tense: Tom ___ a pencil case.", options: ["has", "had"], correctAnswerIndex: 0 },
    { question: "Which sentence is correct?", options: ["The pencil rolls off", "The pencil rolling off"], correctAnswerIndex: 0 },
    { question: "What is the opposite of 'finished'?", options: ["started", "continuing"], correctAnswerIndex: 1 },
    { question: "Fill in the blank: He ___ his pencil.", options: ["found", "finded"], correctAnswerIndex: 0 },
    { question: "Choose the correct word: Tom looked ___ the book for his pencil.", options: ["on", "under"], correctAnswerIndex: 1 }
];

function showComprehensionQuestions() {
    document.getElementById('text-section').style.display = 'none';
    document.getElementById('comprehension-section').style.display = 'block';
    let questionHTML = comprehensionQuestions.map((question, index) => {
        return `
            <div>
                <h3>${question.question}</h3>
                ${question.options.map((option, idx) => `
                    <button class="answer-button" onclick="checkAnswer('comprehension', ${index}, ${idx})">${option}</button>
                `).join('')}
            </div>
        `;
    }).join('');
    document.getElementById('comprehension-questions').innerHTML = questionHTML;
}

function checkAnswer(type, questionIndex, selectedIndex) {
    let question;
    if (type === 'comprehension') {
        question = comprehensionQuestions[questionIndex];
    } else {
        question = grammarQuestions[questionIndex - comprehensionQuestions.length];
    }

    const correctAnswerIndex = question.correctAnswerIndex;
    if (selectedIndex === correctAnswerIndex) {
        score++;
        showMotivationalWords(true); // Show motivational words for correct answer
    } else {
        showMotivationalWords(false); // Show motivational words for wrong answer
    }

    document.querySelectorAll('.answer-button').forEach(button => button.disabled = true);
    document.getElementById('next-btn').disabled = false;
}

function showMotivationalWords(isCorrect) {
    const motivationDiv = document.getElementById('motivation');
    motivationDiv.style.display = 'block';
    if (isCorrect) {
        motivationDiv.innerHTML = `<p class="motivation-text">You nailed it! 🎉</p>`;
    } else {
        motivationDiv.innerHTML = `<p class="motivation-text">Don't worry, try again! 💪</p>`;
    }
}

function showGrammarQuestions() {
    alert('Welcome to Grammar Section!');
    document.getElementById('comprehension-section').style.display = 'none';
    document.getElementById('grammar-section').style.display = 'block';
    const question = grammarQuestions[currentQuestionIndex - comprehensionQuestions.length];
    let questionHTML = `
        <h3>${question.question}</h3>
        ${question.options.map((option, index) => `
            <button class="answer-button" onclick="checkAnswer('grammar', ${index})">${option}</button>
        `).join('')}
    `;
    document.getElementById('question-text').innerHTML = questionHTML;
}

function goToNext() {
    currentQuestionIndex++;
    if (currentQuestionIndex < comprehensionQuestions.length) {
        showComprehensionQuestions();
    } else if (currentQuestionIndex < comprehensionQuestions.length + grammarQuestions.length) {
        showGrammarQuestions();
    } else {
        submitQuiz();
    }
}

function submitQuiz() {
    document.getElementById('grammar-section').style.display = 'none';
    document.getElementById('motivation').style.display = 'none';
    document.getElementById('comprehension-section').style.display = 'none';
    document.getElementById('score-text').innerHTML = 'Final Score: ' + score;
}
