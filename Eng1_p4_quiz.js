const comprehensionQuestions = [
    { question: "1. What was missing at the beginning of the story?", answers: ["Tom's book", "Tom's pencil", "Tom's backpack", "Tom's test paper"], correct: 1 },
    { question: "2. Where did Tom look for his pencil?", answers: ["In the teacher’s desk", "In his pocket", "In his shoe", "In the window"], correct: 2 },
    { question: "3. What did the pencil say?", answers: ["I love writing!", "I’m tired of writing! I need a break!", "I want to draw pictures!", "Let’s go outside!"], correct: 1 },
    { question: "4. Where did the pencil hide?", answers: ["Under the teacher’s desk", "Behind the chalkboard", "Inside Tom’s bag", "On another student’s table"], correct: 0 },
    { question: "5. How did Tom convince the pencil to come back?", answers: ["He chased it around the room", "He told the teacher", "He promised to give it a long rest", "He gave it to a friend"], correct: 2 }
];

const grammarQuestions = [
    { question: "1. Choose the correct plural form of 'child':", answers: ["childs", "childes", "children", "childrens"], correct: 2 },
    { question: "2. Which word is a synonym for 'happy'?", answers: ["Sad", "Joyful", "Angry", "Tired"], correct: 1 },
    { question: "3. Identify the adjective in: 'The tall boy runs fast.'", answers: ["tall", "boy", "runs", "fast"], correct: 0 },
    { question: "4. Choose the past tense of 'go':", answers: ["goed", "went", "gone", "going"], correct: 1 },
    { question: "5. Which sentence is punctuated correctly?", answers: ['"Can I have some water."', '"What time is it?"', '"I am hungry!"', '"She said, Hello."'], correct: 1 },
    { question: "6. Fill in the blank: 'She is sitting ___ the chair.'", answers: ["in", "on", "at", "under"], correct: 1 },
    { question: "7. Choose the correct conjunction: 'I want to play, ___ it is raining.'", answers: ["and", "but", "or", "so"], correct: 1 },
    { question: "8. Correct order of the days of the week from Monday:", answers: ["Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday", "Monday, Wednesday, Tuesday, Thursday, Friday, Sunday, Saturday", "Monday, Tuesday, Thursday, Wednesday, Friday, Saturday, Sunday", "Monday, Tuesday, Wednesday, Friday, Thursday, Saturday, Sunday"], correct: 0 },
    { question: "9. Which is a question?", answers: ["She is reading a book.", "Where are you going?", "They are playing football.", "I have a new pencil."], correct: 1 },
    { question: "10. Fill in the blank: 'I saw ___ elephant at the zoo.'", answers: ["a", "an", "the", "no article needed"], correct: 1 },
    { question: "11. Choose the correct verb form: 'She ___ to school every day.'", answers: ["go", "goes", "going", "gone"], correct: 1 },
    { question: "12. Which word is a noun?", answers: ["Quickly", "Beautiful", "Happiness", "Run"], correct: 2 },
    { question: "13. Identify the correct sentence:", answers: ['"He don\'t like apples."', '"He doesn\'t likes apples."', '"He doesn\'t like apples."', '"He don\'t likes apples."'], correct: 2 },
    { question: "14. Fill in the blank: 'Maria and ___ are going to the market.'", answers: ["me", "I", "mine", "my"], correct: 1 },
    { question: "15. Choose the correct spelling:", answers: ["Recieve", "Receive", "Recive", "Receeve"], correct: 1 }
];

let currentComprehensionIndex = 0;
let currentGrammarIndex = 0;
let score = 0;

// Display comprehension questions
function showComprehensionQuestions() {
    document.getElementById('text-section').style.display = 'none';
    document.getElementById('comprehension-section').style.display = 'block';

    let htmlContent = "";
    comprehensionQuestions.forEach((q, index) => {
        htmlContent += `
            <div>
                <p>${q.question}</p>
                ${q.answers.map((answer, i) => 
                    `<button class="answer-btn" onclick="checkComprehensionAnswer(${index}, ${i}, this)">${answer}</button>`).join('')}
            </div>
        `;
    });
    document.getElementById('comprehension-questions').innerHTML = htmlContent;
}

// Check comprehension answers
function checkComprehensionAnswer(questionIndex, answerIndex, button) {
    const correctAnswer = comprehensionQuestions[questionIndex].correct;
    button.classList.add(answerIndex === correctAnswer ? 'green' : 'red');
}

// Show grammar questions after comprehension
function showGrammarQuestions() {
    document.getElementById('comprehension-section').style.display = 'none';
    document.getElementById('grammar-section').style.display = 'block';
    loadGrammarQuestion();
}

// Load grammar question
function loadGrammarQuestion() {
    const question = grammarQuestions[currentGrammarIndex];
    document.getElementById('question-text').innerText = question.question;
    document.getElementById('answer-buttons').innerHTML = question.answers.map((answer, i) =>
        `<button class="answer-btn" onclick="checkAnswer(${i}, this)">${answer}</button>`
    ).join('');
}

// Check grammar answer
function checkAnswer(answerIndex, button) {
    const correctAnswer = grammarQuestions[currentGrammarIndex].correct;
    button.classList.add(answerIndex === correctAnswer ? 'green' : 'red');

    // Move to next question
    setTimeout(() => {
        if (answerIndex === correctAnswer) score++;
        if (currentGrammarIndex < grammarQuestions.length - 1) {
            currentGrammarIndex++;
            loadGrammarQuestion();
        } else {
            submitQuiz();
        }
    }, 800);
}

// Submit quiz
function submitQuiz() {
    document.getElementById('grammar-section').style.display = 'none';
    document.getElementById('result').innerHTML = `Your score is: ${score} / ${grammarQuestions.length + comprehensionQuestions.length}`;
}
