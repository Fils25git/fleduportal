let currentQuestionIndex = 0;
let score = 0;
let currentSection = 'text'; // to keep track of the current section (text, comprehension, grammar)

const comprehensionQuestions = [
    { question: "Where was Tom looking for his pencil?", options: ["Under the book", "In his bag", "In his shoe", "All of the above"], correctAnswerIndex: 3 },
    { question: "What did the pencil say?", options: ["I need a break", "I'm lost", "I can't find my way", "I want to be sharpened"], correctAnswerIndex: 0 },
    { question: "What did Tom offer the pencil?", options: ["A new case", "A long rest", "A new pencil", "A pencil sharpener"], correctAnswerIndex: 1 },
    { question: "Where did the pencil hide?", options: ["Under the table", "Under the teacher’s desk", "In the drawer", "Under the book"], correctAnswerIndex: 1 },
    { question: "How did Tom get the pencil back?", options: ["By calling it", "By promising a long rest", "By searching more", "By finding it in his bag"], correctAnswerIndex: 1 }
];

const grammarQuestions = [
    { question: "Choose the correct verb form: Tom ___ his pencil.", options: ["find", "finds", "found", "finding"], correctAnswerIndex: 2 },
    { question: "Which sentence is correct?", options: ["Tom was finding his pencil.", "Tom find his pencil.", "Tom finds his pencil.", "Tom is finding his pencil."], correctAnswerIndex: 2 },
    { question: "Choose the correct preposition: The pencil is ___ the book.", options: ["on", "in", "under", "beside"], correctAnswerIndex: 2 },
    { question: "What is the correct article? ___ pencil is on the table.", options: ["A", "An", "The", "Some"], correctAnswerIndex: 1 },
    { question: "Which word is a noun?", options: ["run", "pencil", "quick", "happily"], correctAnswerIndex: 1 },
    { question: "Choose the correct tense: Tom ___ a pencil case.", options: ["has", "have", "had", "having"], correctAnswerIndex: 0 },
    { question: "Which sentence is correct?", options: ["The pencil rolling off", "The pencil rolls off", "The pencil rolled off", "The pencil roll off"], correctAnswerIndex: 2 },
    { question: "What is the opposite of 'finished'?", options: ["started", "done", "continuing", "stopped"], correctAnswerIndex: 2 },
    { question: "Fill in the blank: He ___ his pencil.", options: ["find", "finded", "found", "finding"], correctAnswerIndex: 2 },
    { question: "Choose the correct word: Tom looked ___ the book for his pencil.", options: ["on", "in", "under", "beside"], correctAnswerIndex: 2 }
];

function showComprehensionQuestions() {
    document.getElementById('text-section').style.display = 'none';
    document.getElementById('comprehension-section').style.display = 'block';
    const question = comprehensionQuestions[currentQuestionIndex];
    let questionHTML = `
        <h3>${question.question}</h3>
        ${question.options.map((option, index) => `
            <button class="answer-button" onclick="checkAnswer('comprehension', ${index})">${option}</button>
        `).join('')}
    `;
    document.getElementById('comprehension-questions').innerHTML = questionHTML;
}

function showGrammarQuestions() {
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

function checkAnswer(type, selectedIndex) {
    let question;
    if (type === 'comprehension') {
        question = comprehensionQuestions[currentQuestionIndex];
    } else {
        question = grammarQuestions[currentQuestionIndex - comprehensionQuestions.length];
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

function goToPrevious() {
    currentQuestionIndex--;
    if (currentQuestionIndex < comprehensionQuestions.length) {
        showComprehensionQuestions();
    } else if (currentQuestionIndex < comprehensionQuestions.length + grammarQuestions.length) {
        showGrammarQuestions();
    }
}

function submitQuiz() {
    document.getElementById('grammar-section').style.display = 'none';
    document.getElementById('motivation').style.display = 'none';
    alert('You have completed the quiz! Final Score: ' + score);
}
