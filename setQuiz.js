const questions = [
    { question: "1. What is used to dig and turn over the soil?", answers: ["Rake", "Hoe", "Watering can", "Shovel"], correct: 1 },
    { question: "2. Which of these animals gives birth to live young?", answers: ["Chicken", "Lizard", "Elephant", "Crocodile"], correct: 2 },
    { question: "3. Which part of a plant takes in water from the soil?", answers: ["Leaf", "Stem", "Root", "Flower"], correct: 2 },
    { question: "4. What do green leaves need to make food?", answers: ["Oxygen and water", "Sunlight, water, and carbon dioxide", "Soil and air", "Minerals and wind"], correct: 1 },
    { question: "5. What do we use to lift heavy objects with less effort?", answers: ["Inclined plane", "Pulley", "Lever", "Screw"], correct: 2 },
    { question: "6. Which of the following can take the shape of its container?", answers: ["Rock", "Ice", "Water", "Glass"], correct: 2 },
    { question: "7. What pumps blood in the human body?", answers: ["Lungs", "Stomach", "Heart", "Brain"], correct: 2 },
    { question: "8. What type of teeth help in chewing and grinding food?", answers: ["Canines", "Incisors", "Molars", "Premolars"], correct: 2 },
    { question: "9. What happens when water is heated?", answers: ["It freezes", "It turns into vapor", "It turns into ice", "It stays the same"], correct: 1 },
    { question: "10. What do we use to measure the speed of wind?", answers: ["Thermometer", "Barometer", "Anemometer", "Compass"], correct: 2 },
    { question: "11. Which energy source cannot be replaced once used?", answers: ["Wind", "Solar", "Coal", "Water"], correct: 2 },
    { question: "12. What type of energy is produced by a burning candle?", answers: ["Electrical and light energy", "Heat and light energy", "Sound and chemical energy", "Mechanical and nuclear energy"], correct: 1 },
    { question: "13. Which material allows heat to pass through easily?", answers: ["Plastic", "Rubber", "Metal", "Cotton"], correct: 2 },
    { question: "14. What should people do to protect the environment?", answers: ["Burn plastic waste", "Cut down all trees", "Plant more trees", "Dump waste into rivers"], correct: 2 },
    { question: "15. What happens when cars produce too much smoke?", answers: ["It makes the air fresh", "It causes air pollution", "It improves the weather", "It makes plants grow faster"], correct: 1 },
    { question: "16. Which part of a computer is used to enter information?", answers: ["Monitor", "Mouse", "Keyboard", "Speaker"], correct: 2 },
    { question: "17. What helps us to see what is displayed on a computer?", answers: ["CPU", "Keyboard", "Monitor", "Mouse"], correct: 2 },
    { question: "18. What do people use to send messages quickly over long distances?", answers: ["Radio", "Television", "Telephone", "Clock"], correct: 2 },
    { question: "19. Why is it important to wash hands before eating?", answers: ["To make them soft", "To remove dirt and germs", "To cool the hands", "To make food taste better"], correct: 1 },
    { question: "20. What should you do if someone gets a small cut?", answers: ["Wash it with clean water and cover it", "Leave it open without cleaning", "Cover it with soil", "Rub it with dirty hands"], correct: 0 }
];

let currentQuestionIndex = 0;
let score = 0;
let answeredQuestions = new Set();

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
    const resultElement = document.getElementById('result');

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
}

// Initialize the first question
loadQuestion();