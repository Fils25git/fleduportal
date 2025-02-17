const comprehensionQuestions = [
    { question: "1. What was missing at the beginning of the story?", answers: ["Tom's book", "Tom's pencil", "Tom's backpack", "Tom's test paper"], correct: 1 },
    { question: "2. Where did Tom look for his pencil?", answers: ["In the teacher’s desk", "In his pocket", "In his shoe", "In the window"], correct: 2 },
    { question: "3. What did the pencil say?", answers: ["I love writing!", "I’m tired of writing! I need a break!", "I want to draw pictures!", "Let’s go outside!"], correct: 1 },
    { question: "4. Where did the pencil hide?", answers: ["Under the teacher’s desk", "Behind the chalkboard", "Inside Tom’s bag", "On another student’s table"], correct: 0 },
    { question: "5. How did Tom convince the pencil to come back?", answers: ["He chased it around the room", "He told the teacher", "He promised to give it a long rest", "He gave it to a friend"], correct: 2 }
];

const grammarQuestions = [
    { question: "1. Choose the correct plural form of the word 'child':", answers: ["childs", "childes", "children", "childrens"], correct: 2 },
    { question: "2. Which of the following is a synonym for 'happy'?", answers: ["Sad", "Joyful", "Angry", "Tired"], correct: 1 },
    { question: "3. Identify the adjective in the sentence: 'The tall boy runs fast.'", answers: ["tall", "boy", "runs", "fast"], correct: 0 },
    { question: "4. Choose the correct past tense of the verb 'go':", answers: ["goed", "went", "gone", "going"], correct: 1 },
    { question: "5. Which sentence is punctuated correctly?", answers: ['"Can I have some water."', '"What time is it?"', '"I am hungry!"', '"She said, Hello."'], correct: 1 },
    { question: "6. Fill in the blank with the correct preposition: 'She is sitting ___ the chair.'", answers: ["in", "on", "at", "under"], correct: 1 },
    { question: "7. Choose the correct conjunction: 'I want to play, ___ it is raining.'", answers: ["and", "but", "or", "so"], correct: 1 },
    { question: "8. What is the correct order of the days of the week starting from Monday?", answers: ["Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday", "Monday, Wednesday, Tuesday, Thursday, Friday, Sunday, Saturday", "Monday, Tuesday, Thursday, Wednesday, Friday, Saturday, Sunday", "Monday, Tuesday, Wednesday, Friday, Thursday, Saturday, Sunday"], correct: 0 },
    { question: "9. Which of the following is a question?", answers: ["She is reading a book.", "Where are you going?", "They are playing football.", "I have a new pencil."], correct: 1 },
    { question: "10. Fill in the blank with the correct article: 'I saw ___ elephant at the zoo.'", answers: ["a", "an", "the", "no article needed"], correct: 1 },
    { question: "11. Choose the correct form of the verb: 'She ___ to school every day.'", answers: ["go", "goes", "going", "gone"], correct: 1 },
    { question: "12. Which word is a noun?", answers: ["Quickly", "Beautiful", "Happiness", "Run"], correct: 2 },
    { question: "13. Identify the correct sentence:", answers: ['"He don\'t like apples."', '"He doesn\'t likes apples."', '"He doesn\'t like apples."', '"He don\'t likes apples."'], correct: 2 },
    { question: "14. Fill in the blank with the correct pronoun: 'Maria and ___ are going to the market.'", answers: ["me", "I", "mine", "my"], correct: 1 },
    { question: "15. Choose the correct spelling:", answers: ["Recieve", "Receive", "Recive", "Receeve"], correct: 1 }
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
                <button onclick="checkComprehensionAnswer(${index}, 0)">${q.answers[0]}</button>
                <button onclick="checkComprehensionAnswer(${index}, 1)">${q.answers[1]}</button>
                <button onclick="checkComprehensionAnswer(${index}, 2)">${q.answers[2]}</button>
                <button onclick="checkComprehensionAnswer(${index}, 3)">${q.answers[3]}</button>
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
    let buttons = document.querySelectorAll("#answer-buttons button");
    buttons[answerIndex].style.backgroundColor = (answerIndex === correctAnswer) ? "green" : "red";
    answeredGrammarQuestions[currentGrammarIndex] = true;

    // Move to next question after answering
    if (currentGrammarIndex < grammarQuestions.length - 1) {
        currentGrammarIndex++;
        setTimeout(loadGrammarQuestion, 1000);
    }
}

// Submit Quiz and Show Result
function submitQuiz() {
    score = 0;

    // Calculate score
    comprehensionQuestions.forEach((q, i) => {
        if (answeredComprehensionQuestions[i]) score++;
    });

    grammarQuestions.forEach((q, i) => {
        if (answeredGrammarQuestions[i]) score++;
    });

    document.getElementById('grammar-section').style.display = 'none';
    document.getElementById('result').innerHTML = `Your score is: ${score} / ${comprehensionQuestions.length + grammarQuestions.length}`;
}

console.log("Quiz script loaded successfully.");
