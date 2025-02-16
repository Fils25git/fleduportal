// Combining comprehension and grammar questions
const questions = [
    { question: "1. What was missing at the beginning of the story?", answers: ["Tom’s book", "Tom’s pencil", "Tom’s backpack", "Tom’s test paper"], correct: 1 },
    { question: "2. Where did Tom look for his pencil?", answers: ["In the teacher’s desk", "In his pocket", "In his shoe", "In the window"], correct: 2 },
    { question: "3. What did the pencil say?", answers: ["'I love writing!'", "'I’m tired of writing! I need a break!'", "'I want to draw pictures!'", "'Let’s go outside!'"], correct: 1 },
    { question: "4. Where did the pencil hide?", answers: ["Under the teacher’s desk", "Behind the chalkboard", "Inside Tom’s bag", "On another student’s table"], correct: 0 },
    { question: "5. How did Tom convince the pencil to come back?", answers: ["He chased it around the room", "He told the teacher", "He promised to give it a long rest", "He gave it to a friend"], correct: 2 },
    { question: "6. Choose the correct plural form of the word 'child':", answers: ["childs", "childes", "children", "childrens"], correct: 2 },
    { question: "7. Which of the following is a synonym for 'happy'?", answers: ["Sad", "Joyful", "Angry", "Tired"], correct: 1 },
    { question: "8. Identify the adjective in the following sentence: 'The tall boy runs fast.'", answers: ["tall", "boy", "runs", "fast"], correct: 0 },
    { question: "9. Choose the correct past tense of the verb 'go':", answers: ["goed", "went", "gone", "going"], correct: 1 },
    { question: "10. Which sentence is punctuated correctly?", answers: ['"Can I have some water."', '"What time is it?"', '"I am hungry!"', '"She said, Hello."'], correct: 1 },
    { question: "11. Fill in the blank with the correct preposition: 'She is sitting ___ the chair.'", answers: ["in", "on", "at", "under"], correct: 1 },
    { question: "12. Choose the correct conjunction to complete the sentence: 'I want to play, ___ it is raining.'", answers: ["and", "but", "or", "so"], correct: 1 },
    { question: "13. What is the correct order of the days of the week starting from Monday?", answers: ["Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday", "Monday, Wednesday, Tuesday, Thursday, Friday, Sunday, Saturday", "Monday, Tuesday, Thursday, Wednesday, Friday, Saturday, Sunday", "Monday, Tuesday, Wednesday, Friday, Thursday, Saturday, Sunday"], correct: 0 },
    { question: "14. Which of the following is a question?", answers: ["She is reading a book.", "Where are you going?", "They are playing football.", "I have a new pencil."], correct: 1 },
    { question: "15. Fill in the blank with the correct article: 'I saw ___ elephant at the zoo.'", answers: ["a", "an", "the", "no article needed"], correct: 1 },
    { question: "16. Choose the correct form of the verb to complete the sentence: 'She ___ to school every day.'", answers: ["go", "goes", "going", "gone"], correct: 1 },
    { question: "17. Which word is a noun?", answers: ["Quickly", "Beautiful", "Happiness", "Run"], correct: 2 },
    { question: "18. Identify the correct sentence:", answers: ['"He don\'t like apples."', '"He doesn\'t likes apples."', '"He doesn\'t like apples."', '"He don\'t likes apples."'], correct: 2 },
    { question: "19. Fill in the blank with the correct pronoun: 'Maria and ___ are going to the market.'", answers: ["me", "I", "mine", "my"], correct: 1 },
    { question: "20. Choose the correct spelling:", answers: ["Recieve", "Receive", "Recive", "Receeve"], correct: 1 }
];

let currentQuestionIndex = 0;
let score = 0;
let answeredQuestions = new Set();

// Show Comprehension questions
function showComprehensionQuestions() {
    document.getElementById('text-section').style.display = 'none';
    document.getElementById('comprehension-section').style.display = 'block';
    
    const comprehensionQuestions = [
        "What was missing at the beginning of the story?",
        "Where did Tom look for his pencil?",
        "What did the pencil say?",
        "Where did the pencil hide?",
        "How did Tom convince the pencil to come back?"
    ];

    let htmlContent = "";
    comprehensionQuestions.forEach((question, index) => {
        htmlContent += `
            <div>
                <p>${index + 1}. ${question}</p>
                <input type="text" id="comprehension-answer-${index}" />
            </div>
        `;
    });
    document.getElementById('comprehension-questions').innerHTML = htmlContent;
}

// Show Grammar questions after comprehension
function showGrammarQuestions() {
    document.getElementById('comprehension-section').style.display = 'none';
    document.getElementById('grammar-section').style.display = 'block';
    
    loadQuestion();
}

// Load the grammar question based on index
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = question.question;
    document.getElementById('answer0').innerText = `A) ${question.answers[0]}`;
    document.getElementById('answer1').innerText = `B) ${question.answers[1]}`;
    document.getElementById('answer2').innerText = `C) ${question.answers[2]}`;
    document.getElementById('answer3').innerText = `D) ${question.answers[3]}`;
    document.getElementById('result').innerHTML = '';

    // Reset the answer button colors
    resetButtonColors();

    // Disable answers if the question is already answered
    disableAnsweredButtons();

    document.getElementById('prev-btn').style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    document.getElementById('next-btn').style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submit-btn').style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
}

function resetButtonColors() {
    document.getElementById('answer0').style.backgroundColor = '';
    document.getElementById('answer1').style.backgroundColor = '';
    document.getElementById('answer2').style.backgroundColor = '';
    document.getElementById('answer3').style.backgroundColor = '';
}

function disableAnsweredButtons() {
    for (let i = 0; i < 4; i++) {
        document.getElementById(`answer${i}`).disabled = answeredQuestions.has(currentQuestionIndex);
    }
}

function checkAnswer(answerIndex) {
    const correctAnswer = questions[currentQuestionIndex].correct;

    // Mark the selected answer
    if (answerIndex === correctAnswer) {
        document.getElementById(`answer${answerIndex}`).style.backgroundColor = 'green';
        score++;
    } else {
        document.getElementById(`answer${answerIndex}`).style.backgroundColor = 'red';
        document.getElementById(`answer${correctAnswer}`).style.backgroundColor = 'green'; // Correct answer in green
    }

    // Mark the question as answered
    answeredQuestions.add(currentQuestionIndex);

    // Disable all buttons after selection
    disableAnswerButtons();

    // Show next button after answer
    document.getElementById('next-btn').style.display = 'inline-block';
}

function disableAnswerButtons() {
    for (let i = 0; i < 4; i++) {
        document.getElementById(`answer${i}`).disabled = true;
    }
}

function goToNext() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function goToPrevious() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function submitQuiz() {
    // Hide next/previous buttons
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('prev-btn').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'none';

    // Display the final score and results
    const resultText = `
        <div class="result">
            <p>Your Score: ${score}/${questions.length}</p>
        </div>
    `;
    document.getElementById('result').innerHTML = resultText;

    // Disable answer buttons and hide other elements
    disableAnswerButtons();
}

// Initialize the first question
loadQuestion();
