let currentQuestionIndex = 0; // Track the current question index
let score = 0; // Track the user's score
let comprehensionQuestions = []; // Store comprehension questions
let grammarQuestions = []; // Store grammar questions

// Function to display the comprehension questions section
function showComprehensionQuestions() {
    const storyText = document.getElementById('story-text');
    const comprehensionSection = document.getElementById('comprehension-section');
    const textSection = document.getElementById('text-section');

    textSection.style.display = 'none';
    comprehensionSection.style.display = 'block';

    // Load comprehension questions
    comprehensionQuestions = [
        {
            question: 'What did Tom lose?',
            answers: ['His pencil', 'His book', 'His eraser', 'His bag'],
            correct: 0
        },
        {
            question: 'Where did the pencil hide?',
            answers: ['Under the table', 'Under the teacher’s desk', 'In the bag', 'Behind the book'],
            correct: 1
        },
        {
            question: 'What did Tom promise the pencil?',
            answers: ['To give it a long rest', 'To give it a sharpener', 'To throw it away', 'To chew on it'],
            correct: 0
        }
    ];

    // Display comprehension questions
    const comprehensionQuestionsContainer = document.getElementById('comprehension-questions');
    comprehensionQuestionsContainer.innerHTML = '';
    
    comprehensionQuestions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        
        const questionText = document.createElement('h4');
        questionText.innerText = question.question;
        questionElement.appendChild(questionText);

        question.answers.forEach((answer, answerIndex) => {
            const answerButton = document.createElement('button');
            answerButton.innerText = answer;
            answerButton.onclick = () => checkComprehensionAnswer(index, answerIndex);
            questionElement.appendChild(answerButton);
        });

        comprehensionQuestionsContainer.appendChild(questionElement);
    });
}

// Function to check the selected comprehension answer
function checkComprehensionAnswer(index, answerIndex) {
    const question = comprehensionQuestions[index];
    const buttons = document.querySelectorAll(`#comprehension-questions .question:nth-child(${index + 1}) button`);
    const selectedButton = buttons[answerIndex];

    // Check if the answer is correct
    if (answerIndex === question.correct) {
        selectedButton.classList.add('green');
        score++;
        showMotivation(true);  // Show positive motivation
    } else {
        selectedButton.classList.add('red');
        showMotivation(false);  // Show negative motivation
    }

    // Disable all buttons after the answer is selected
    buttons.forEach(button => button.disabled = true);
    document.getElementById('next-btn-comprehension').style.display = 'block';
}

// Function to move to the grammar section after answering comprehension questions
function showGrammarQuestions() {
    const comprehensionSection = document.getElementById('comprehension-section');
    const grammarSection = document.getElementById('grammar-section');
    const nextBtnComprehension = document.getElementById('next-btn-comprehension');

    comprehensionSection.style.display = 'none';
    grammarSection.style.display = 'block';
    nextBtnComprehension.style.display = 'none';

    // Load grammar questions
    grammarQuestions = [
        {
            question: 'Which of the following is correct?',
            answers: ['I are learning', 'You is learning', 'I am learning', 'We was learning'],
            correct: 2
        },
        {
            question: 'Which word is a noun?',
            answers: ['Run', 'Quickly', 'Jump', 'Pencil'],
            correct: 3
        }
    ];

    // Display grammar questions
    const grammarQuestionsContainer = document.getElementById('question-text');
    grammarQuestionsContainer.innerHTML = '';
    
    grammarQuestions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        
        const questionText = document.createElement('h4');
        questionText.innerText = question.question;
        questionElement.appendChild(questionText);

        question.answers.forEach((answer, answerIndex) => {
            const answerButton = document.createElement('button');
            answerButton.innerText = answer;
            answerButton.onclick = () => checkGrammarAnswer(index, answerIndex);
            questionElement.appendChild(answerButton);
        });

        grammarQuestionsContainer.appendChild(questionElement);
    });
}

// Function to check the selected grammar answer
function checkGrammarAnswer(index, answerIndex) {
    const question = grammarQuestions[index];
    const buttons = document.querySelectorAll(`#question-text .question:nth-child(${index + 1}) button`);
    const selectedButton = buttons[answerIndex];

    // Check if the answer is correct
    if (answerIndex === question.correct) {
        selectedButton.classList.add('green');
        score++;
        showMotivation(true);  // Show positive motivation
    } else {
        selectedButton.classList.add('red');
        showMotivation(false);  // Show negative motivation
    }

    // Disable all buttons after the answer is selected
    buttons.forEach(button => button.disabled = true);
    document.getElementById('next-btn').style.display = 'block';
}

// Function to handle the previous button
function goToPrevious() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// Function to handle the next button
function goToNext() {
    if (currentQuestionIndex < grammarQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
}

// Function to handle the quiz submission
function submitQuiz() {
    const result = document.getElementById('result');
    result.innerHTML = `<h3>Your Score: ${score} / ${comprehensionQuestions.length + grammarQuestions.length}</h3>`;

    // Display the submit button and disable further interaction
    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('prev-btn').style.display = 'none';
}
