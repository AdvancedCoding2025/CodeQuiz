// MCQ Data - 15 Questions
const mcqData = [
  {
    question: "What will be the output of the following Python code?\nprint(2 ** 3 ** 2)",
    options: ["A) 64", "B) 512", "C) 256", "D) 36"],
    answer: 1
  },
  {
    question: "Which of the following is not a primitive data type in Java?",
    options: ["A) int", "B) boolean", "C) String", "D) char"],
    answer: 2
  },
  {
    question: "In C, what is the size of sizeof(char)?",
    options: ["A) 4 bytes", "B) 2 bytes", "C) 1 byte", "D) Depends on compiler"],
    answer: 2
  },
  {
    question: "Which of the following sorting algorithms has the best average time complexity?",
    options: ["A) Bubble Sort", "B) Insertion Sort", "C) Merge Sort", "D) Selection Sort"],
    answer: 2
  },
  {
    question: "In SQL, which keyword is used to remove duplicate values from a result set?",
    options: ["A) UNIQUE", "B) DISTINCT", "C) REMOVE", "D) DELETE"],
    answer: 1
  },
  {
    question: "In JavaScript, what is the result of typeof null?",
    options: ["A) \"null\"", "B) \"undefined\"", "C) \"object\"", "D) \"number\""],
    answer: 2
  },
  {
    question: "Which data structure uses the principle of LIFO (Last In First Out)?",
    options: ["A) Queue", "B) Array", "C) Stack", "D) Linked List"],
    answer: 2
  },
  {
    question: "What is the time complexity of searching in a balanced Binary Search Tree (BST)?",
    options: ["A) O(n)", "B) O(log n)", "C) O(n log n)", "D) O(1)"],
    answer: 1
  },
  {
    question: "In Python, what does the // operator do?",
    options: ["A) Modulus", "B) Exponentiation", "C) Floor division", "D) Float division"],
    answer: 2
  },
  {
    question: "Which of the following is NOT an OOP principle?",
    options: ["A) Inheritance", "B) Abstraction", "C) Polymorphism", "D) Compilation"],
    answer: 3
  },
  {
    question: "In C++, which operator cannot be overloaded?",
    options: ["A) + (plus)", "B) == (equality)", "C) . (dot operator)", "D) < (less than)"],
    answer: 2
  },
  {
    question: "In Git, which command is used to upload local changes to a remote repository?",
    options: ["A) git push", "B) git pull", "C) git commit", "D) git upload"],
    answer: 0
  },
  {
    question: "Which of the following best describes a deadlock situation in operating systems?",
    options: [
      "A) Processes finish execution in parallel", 
      "B) Processes are waiting indefinitely for resources held by each other", 
      "C) Process spends all time in I/O", 
      "D) Process crashes"
    ],
    answer: 1
  },
  {
    question: "In HTML, which tag is used to create a hyperlink?",
    options: ["A) <h>", "B) <a>", "C) <link>", "D) <hyper>"],
    answer: 1
  },
  {
    question: "What is the correct way to declare a constant in JavaScript (ES6+)?",
    options: ["A) var PI = 3.14", "B) let PI = 3.14", "C) const PI = 3.14", "D) constant PI = 3.14"],
    answer: 2
  }
];

// Global Variables
let currentQuestion = 0;
let score = 0;
let userName = "";
let userRoll = "";
let userAnswers = new Array(mcqData.length).fill(null);
let flaggedQuestions = new Array(mcqData.length).fill(false);
let isViewingAll = false;

// Utility Functions
function validateRollNumber(rollNumber) {
  const rollPattern = /^hu22csen0\d{6}$/i;
  return rollPattern.test(rollNumber);
}

function updateProgress() {
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const answeredCount = userAnswers.filter(answer => answer !== null).length;
  
  const progressPercent = (answeredCount / mcqData.length) * 100;
  progressFill.style.width = `${progressPercent}%`;
  progressText.textContent = `Question ${currentQuestion + 1} of ${mcqData.length}`;
}

function updateQuestionNavigation() {
  const questionGrid = document.getElementById('questionGrid');
  questionGrid.innerHTML = '';
  
  mcqData.forEach((_, index) => {
    const btn = document.createElement('button');
    btn.className = 'question-nav-btn';
    btn.textContent = index + 1;
    
    if (index === currentQuestion) {
      btn.classList.add('current');
    } else if (flaggedQuestions[index]) {
      btn.classList.add('flagged');
    } else if (userAnswers[index] !== null) {
      btn.classList.add('answered');
    } else {
      btn.classList.add('unanswered');
    }
    
    btn.addEventListener('click', () => {
      if (!isViewingAll) {
        saveCurrentAnswer();
        loadQuestion(index);
      }
    });
    
    questionGrid.appendChild(btn);
  });
}

function updateSubmitButton() {
  const submitBtn = document.getElementById('submitBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (!isViewingAll && currentQuestion === mcqData.length - 1) {
    submitBtn.style.display = 'block';
    nextBtn.textContent = 'Next';
  } else {
    submitBtn.style.display = 'none';
    nextBtn.textContent = currentQuestion === mcqData.length - 1 ? 'Finish' : 'Next';
  }
}

function saveCurrentAnswer() {
  if (isViewingAll) {
    // Save all answers from the all-questions view
    const allQuestions = document.querySelectorAll('.all-question-item');
    allQuestions.forEach((questionItem, index) => {
      const radios = questionItem.querySelectorAll('input[type="radio"]');
      radios.forEach((radio, optionIndex) => {
        if (radio.checked) {
          userAnswers[index] = optionIndex;
        }
      });
    });
  } else {
    // Save current single question answer
    const radios = document.getElementsByName('option');
    radios.forEach((radio, index) => {
      if (radio.checked) {
        userAnswers[currentQuestion] = index;
      }
    });
  }
}

function loadQuestion(index) {
  currentQuestion = index;
  
  // Update question number
  document.getElementById('questionNumber').textContent = `Question ${currentQuestion + 1}`;
  
  // Load question text
  document.getElementById('question').textContent = mcqData[currentQuestion].question;
  
  // Load options
  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';
  
  mcqData[currentQuestion].options.forEach((option, optionIndex) => {
    const label = document.createElement('label');
    label.className = 'option-label';
    
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'option';
    radio.value = optionIndex;
    
    if (userAnswers[currentQuestion] === optionIndex) {
      radio.checked = true;
      label.classList.add('selected');
    }
    
    radio.addEventListener('change', () => {
      document.querySelectorAll('.option-label').forEach(l => l.classList.remove('selected'));
      if (radio.checked) {
        label.classList.add('selected');
      }
    });
    
    label.appendChild(radio);
    label.appendChild(document.createTextNode(option));
    optionsContainer.appendChild(label);
  });
  
  // Update flag button
  const flagBtn = document.getElementById('flagBtn');
  if (flaggedQuestions[currentQuestion]) {
    flagBtn.classList.add('flagged');
    flagBtn.textContent = 'Unflag Question';
  } else {
    flagBtn.classList.remove('flagged');
    flagBtn.textContent = 'Flag Question';
  }
  
  // Update navigation buttons
  document.getElementById('prevBtn').disabled = (currentQuestion === 0);
  
  updateProgress();
  updateQuestionNavigation();
  updateSubmitButton();
}

function loadAllQuestions() {
  const allQuestionsContainer = document.getElementById('allQuestions');
  allQuestionsContainer.innerHTML = '';
  
  mcqData.forEach((questionData, questionIndex) => {
    const questionItem = document.createElement('div');
    questionItem.className = 'all-question-item';
    
    const questionNumber = document.createElement('div');
    questionNumber.className = 'all-question-number';
    questionNumber.textContent = `Question ${questionIndex + 1}`;
    
    const questionText = document.createElement('div');
    questionText.className = 'all-question-text';
    questionText.textContent = questionData.question;
    
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'all-question-options';
    
    questionData.options.forEach((option, optionIndex) => {
      const label = document.createElement('label');
      label.className = 'option-label';
      
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `all-question-${questionIndex}`;
      radio.value = optionIndex;
      
      if (userAnswers[questionIndex] === optionIndex) {
        radio.checked = true;
        label.classList.add('selected');
      }
      
      radio.addEventListener('change', () => {
        const allLabels = optionsContainer.querySelectorAll('.option-label');
        allLabels.forEach(l => l.classList.remove('selected'));
        if (radio.checked) {
          label.classList.add('selected');
        }
      });
      
      label.appendChild(radio);
      label.appendChild(document.createTextNode(option));
      optionsContainer.appendChild(label);
    });
    
    questionItem.appendChild(questionNumber);
    questionItem.appendChild(questionText);
    questionItem.appendChild(optionsContainer);
    allQuestionsContainer.appendChild(questionItem);
  });
}

function toggleFlag() {
  flaggedQuestions[currentQuestion] = !flaggedQuestions[currentQuestion];
  
  const flagBtn = document.getElementById('flagBtn');
  if (flaggedQuestions[currentQuestion]) {
    flagBtn.classList.add('flagged');
    flagBtn.textContent = 'Unflag Question';
  } else {
    flagBtn.classList.remove('flagged');
    flagBtn.textContent = 'Flag Question';
  }
  
  updateQuestionNavigation();
}

function toggleViewMode() {
  const singleView = document.getElementById('singleQuestionView');
  const allView = document.getElementById('allQuestionsView');
  const viewModeBtn = document.getElementById('viewModeBtn');
  const navButtons = document.querySelector('.nav-buttons');
  const submitBtn = document.getElementById('submitBtn');
  
  saveCurrentAnswer();
  
  if (!isViewingAll) {
    // Switch to all questions view
    singleView.style.display = 'none';
    allView.style.display = 'block';
    navButtons.style.display = 'none';
    submitBtn.style.display = 'block';
    viewModeBtn.textContent = 'Single Question View';
    isViewingAll = true;
    loadAllQuestions();
  } else {
    // Switch to single question view
    singleView.style.display = 'block';
    allView.style.display = 'none';
    navButtons.style.display = 'flex';
    viewModeBtn.textContent = 'View All Questions';
    isViewingAll = false;
    loadQuestion(currentQuestion);
  }
  
  updateQuestionNavigation();
}

function nextQuestion() {
  saveCurrentAnswer();
  
  if (currentQuestion === mcqData.length - 1) {
    submitExam();
  } else {
    loadQuestion(currentQuestion + 1);
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    saveCurrentAnswer();
    loadQuestion(currentQuestion - 1);
  }
}

function calculateScore() {
  score = 0;
  for (let i = 0; i < mcqData.length; i++) {
    if (userAnswers[i] === mcqData[i].answer) {
      score++;
    }
  }
}

function getScoreMessage(score, total) {
  const percentage = (score / total) * 100;
  
  if (percentage >= 90) return { message: "Outstanding Performance", color: "#10b981" };
  if (percentage >= 80) return { message: "Excellent Work", color: "#059669" };
  if (percentage >= 70) return { message: "Good Performance", color: "#0891b2" };
  if (percentage >= 60) return { message: "Satisfactory", color: "#7c3aed" };
  if (percentage >= 50) return { message: "Needs Improvement", color: "#dc2626" };
  return { message: "Requires More Practice", color: "#991b1b" };
}

function submitExam() {
  // Confirm submission
  const unansweredCount = userAnswers.filter(answer => answer === null).length;
  let confirmMessage = `Are you sure you want to submit your exam?`;
  
  if (unansweredCount > 0) {
    confirmMessage += `\n\nYou have ${unansweredCount} unanswered question(s).`;
  }
  
  if (!confirm(confirmMessage)) {
    return;
  }
  
  saveCurrentAnswer();
  calculateScore();
  showResult();
}

function showResult() {
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('result').style.display = 'flex';
  
  const resultContainer = document.getElementById('resultContent');
  const scoreInfo = getScoreMessage(score, mcqData.length);
  const percentage = ((score / mcqData.length) * 100).toFixed(1);
  
  let resultHTML = `
    <div class="result-summary">
      <div class="result-stat">
        <div class="result-stat-value">${score}</div>
        <div class="result-stat-label">Correct Answers</div>
      </div>
      <div class="result-stat">
        <div class="result-stat-value">${mcqData.length - score}</div>
        <div class="result-stat-label">Incorrect/Unanswered</div>
      </div>
      <div class="result-stat">
        <div class="result-stat-value">${percentage}%</div>
        <div class="result-stat-label">Score Percentage</div>
      </div>
    </div>
    
    <div style="text-align: center; margin-bottom: 30px;">
      <h3 style="color: ${scoreInfo.color}; font-size: 1.4rem; font-weight: 600;">${scoreInfo.message}</h3>
      <p style="color: var(--text-secondary); margin-top: 10px; font-size: 1rem;">
        <strong>${userName}</strong> (${userRoll})
      </p>
    </div>
    
    <div class="result-details">
      <h3>Detailed Results</h3>
      <table class="result-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  mcqData.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    const correctAnswer = question.answer;
    const isCorrect = userAnswer === correctAnswer;
    
    let userAnswerText = "Not Answered";
    let resultClass = "result-not-answered";
    let resultText = "Not Answered";
    
    if (userAnswer !== null) {
      userAnswerText = question.options[userAnswer];
      if (isCorrect) {
        resultClass = "result-correct";
        resultText = "Correct";
      } else {
        resultClass = "result-incorrect";
        resultText = "Incorrect";
      }
    }
    
    resultHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${userAnswerText}</td>
        <td>${question.options[correctAnswer]}</td>
        <td class="${resultClass}">${resultText}</td>
      </tr>
    `;
  });
  
  resultHTML += `
        </tbody>
      </table>
    </div>
  `;
  
  resultContainer.innerHTML = resultHTML;
}

function retakeExam() {
  if (confirm("Are you sure you want to retake the exam? This will reset all your answers.")) {
    // Reset all variables
    currentQuestion = 0;
    score = 0;
    userAnswers = new Array(mcqData.length).fill(null);
    flaggedQuestions = new Array(mcqData.length).fill(false);
    isViewingAll = false;
    
    // Show quiz page
    document.getElementById('result').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    
    // Reset views
    document.getElementById('singleQuestionView').style.display = 'block';
    document.getElementById('allQuestionsView').style.display = 'none';
    document.getElementById('viewModeBtn').textContent = 'View All Questions';
    document.querySelector('.nav-buttons').style.display = 'flex';
    
    // Load first question
    loadQuestion(0);
  }
}

// Event Listeners
document.getElementById("introForm").addEventListener("submit", function (e) {
  e.preventDefault();
  
  userName = document.getElementById("name").value.trim();
  userRoll = document.getElementById("roll").value.trim();
  
  // Validate inputs
  if (!userName) {
    alert("Please enter your name.");
    return;
  }
  
  if (!userRoll) {
    alert("Please enter your roll number.");
    return;
  }
  
  if (!validateRollNumber(userRoll)) {
    alert("Invalid roll number format. Please use the format: HU22CSEN0XXXXXX (where XXXXXX are 6 digits)\nExample: HU22CSEN0300121");
    return;
  }
  
  // Start exam
  document.getElementById("intro").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("userInfo").textContent = `${userName} | ${userRoll.toUpperCase()}`;
  
  loadQuestion(0);
});

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
  if (document.getElementById('quiz').style.display !== 'none') {
    if (e.key === 'ArrowLeft' && currentQuestion > 0 && !isViewingAll) {
      prevQuestion();
    } else if (e.key === 'ArrowRight' && !isViewingAll) {
      nextQuestion();
    } else if (e.key === 'Enter' && !isViewingAll) {
      nextQuestion();
    }
  }
});

// Initialize Application
window.addEventListener('load', function () {
  document.getElementById("intro").style.display = "block";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "none";
});