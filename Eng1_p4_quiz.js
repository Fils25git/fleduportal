let currentQuestionIndex = 0;
let score = 0;

const comprehensionQuestions = [
  {
    question: "Where was Tom looking for his pencil?",
    options: ["Under the book", "In his bag", "In his shoe", "All of the above"],
    correctAnswerIndex: 3
  },
  {
    question: "What did the pencil say?",
    options: ["I need a break", "I'm lost", "I can't find my way", "I want to be sharpened"],
    correctAnswerIndex: 0
  },
  {
    question: "What did Tom offer the pencil?",
    options: ["A new case", "A long rest", "A new pencil", "A pencil sharpener"],
    correctAnswerIndex: 1
  },
  {
    question: "Where did the pencil hide?",
    options: ["Under the table", "Under the teacher’s desk", "In the drawer", "Under the book"],
    correctAnswerIndex: 1
  },
  {
    question: "How did Tom get the pencil back?",
    options: ["By calling it", "By promising a long rest", "By searching more", "By finding it in his bag"],
    correctAnswerIndex: 1
  }
];

const grammarQuestions = [
  {
    question: "Choose the correct verb form: Tom ___ his pencil.",
    options: ["find", "finds", "found", "finding"],
    correctAnswerIndex: 2
  },
  {
    question: "Which sentence is correct?",
    options: ["Tom was finding his pencil.", "Tom find his pencil.", "Tom finds his pencil.", "Tom is finding his pencil."],
    correctAnswerIndex: 2
  },
  {
    question: "Choose the correct preposition: The pencil is ___ the book.",
    options: ["on", "in", "under", "beside"],
    correctAnswerIndex: 2
  },
  {
    question: "What is the correct article? ___ pencil is on the table.",
    options: ["A", "An", "The", "Some"],
    correctAnswerIndex: 1
  },
  {
    question: "Which word is a noun?",
    options: ["run", "pencil", "quick", "happily"],
    correctAnswerIndex: 1
  },
  {
    question: "Choose the correct tense: Tom ___ a pencil case.",
    options: ["has", "have", "had", "having"],
    correctAnswerIndex: 0
  },
  {
    question: "Which sentence is a question?",
    options: ["Is the pencil on the table?", "Tom found the pencil.", "The pencil is missing.", "Tom is writing."],
    correctAnswerIndex: 0
  },
  {
    question: "Which sentence uses the past tense?",
    options: ["Tom is writing.", "Tom writes.", "Tom wrote.", "Tom is writing a test."],
    correctAnswerIndex: 2
  },
  {
    question: "Choose the correct adverb: Tom writes ___.",
    options: ["quickly", "quick", "quickness", "quicker"],
    correctAnswerIndex: 0
  },
  {
    question: "What is the correct conjunction? Tom ___ his pencil, and then he started writing.",
    options: ["but", "and", "because", "or"],
    correctAnswerIndex: 1
  },
  {
    question: "Choose the correct possessive adjective: This is ___ pencil.",
    options: ["my", "his", "her", "their"],
    correctAnswerIndex: 0
  },
  {
    question: "What is the correct preposition? The pencil is ___ the case.",
    options: ["in", "on", "under", "beside"],
    correctAnswerIndex: 0
  },
  {
    question: "Which word is an adjective?",
    options: ["quickly", "happily", "fast", "slow"],
    correctAnswerIndex: 3
  },
  {
    question: "Choose the correct comparative form: Tom is ___ than the other students.",
    options: ["more smarter", "more smart", "smarter", "most smart"],
    correctAnswerIndex: 2
  },
  {
    question: "Which sentence is in the future tense?",
    options: ["Tom is writing his test.", "Tom writes his test.", "Tom will write his test.", "Tom wrote his test."],
    correctAnswerIndex: 2
  }
];

function showComprehensionQuestions() {
  const question = comprehensionQuestions[currentQuestionIndex];
  document.getElementById('comprehension-questions').innerHTML = `
    <h3>${question.question}</h3>
    ${question.options.map((option, index) => `
      <button class="answer-button" onclick="checkAnswer('comprehension', ${index})">${option}</button>
    `).join('')}
  `;
  document.getElementById('next-btn').style.display = 'block';
}

function showGrammarQuestions() {
  if (currentQuestionIndex >= comprehensionQuestions.length) {
    const question = grammarQuestions[currentQuestionIndex - comprehensionQuestions.length];
    document.getElementById('comprehension-questions').innerHTML = `
      <h3>${question.question}</h3>
      ${question.options.map((option, index) => `
        <button class="answer-button" onclick="checkAnswer('grammar', ${index})">${option}</button>
      `).join('')}
    `;
    document.getElementById('next-btn').style.display = 'block';
  }
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
    alert("You nailed it!");
  } else {
    alert("Oops, that's not right!");
  }

  document.querySelectorAll('.answer-button').forEach(button => button.disabled = true);
  document.getElementById('next-btn').disabled = false;
}

function goToNext() {
  if (currentQuestionIndex < comprehensionQuestions.length + grammarQuestions.length - 1) {
    currentQuestionIndex++;
    if (currentQuestionIndex < comprehensionQuestions.length) {
      showComprehensionQuestions();
    } else {
      showGrammarQuestions();
    }
  }
}

function goToPrevious() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    if (currentQuestionIndex < comprehensionQuestions.length) {
      showComprehensionQuestions();
    } else {
      showGrammarQuestions();
    }
  }
}

function submitQuiz() {
  alert(`You completed the quiz! Your score is ${score}/${comprehensionQuestions.length + grammarQuestions.length}.`);
}
