// Quiz Module
function loadQuizModule() {
  const quizCategories = [
    {
      name: 'Alphabet Quiz',
      emoji: '🔤',
      color: 'bg-red-400',
      questions: [
        {
          question: 'What letter comes after A?',
          options: ['B', 'C', 'D', 'E'],
          correct: 'B',
          emoji: '🔤'
        },
        {
          question: 'Which letter makes the "mmm" sound?',
          options: ['N', 'M', 'L', 'K'],
          correct: 'M',
          emoji: '👄'
        },
        {
          question: 'What is the first letter of "Cat"?',
          options: ['A', 'B', 'C', 'D'],
          correct: 'C',
          emoji: '🐱'
        },
        {
          question: 'Which letter comes before Z?',
          options: ['X', 'Y', 'W', 'V'],
          correct: 'Y',
          emoji: '🔤'
        }
      ]
    },
    {
      name: 'Numbers Quiz',
      emoji: '🔢',
      color: 'bg-blue-400',
      questions: [
        {
          question: 'How many fingers do you have?',
          options: ['8', '9', '10', '11'],
          correct: '10',
          emoji: '✋'
        },
        {
          question: 'What comes after 5?',
          options: ['4', '6', '7', '8'],
          correct: '6',
          emoji: '🔢'
        },
        {
          question: 'How many wheels does a car have?',
          options: ['2', '3', '4', '5'],
          correct: '4',
          emoji: '🚗'
        },
        {
          question: 'What is 2 + 2?',
          options: ['3', '4', '5', '6'],
          correct: '4',
          emoji: '➕'
        }
      ]
    },
    {
      name: 'Colors Quiz',
      emoji: '🎨',
      color: 'bg-green-400',
      questions: [
        {
          question: 'What color do you get when you mix red and yellow?',
          options: ['Purple', 'Orange', 'Green', 'Blue'],
          correct: 'Orange',
          emoji: '🎨'
        },
        {
          question: 'What color is the sun?',
          options: ['Blue', 'Green', 'Yellow', 'Purple'],
          correct: 'Yellow',
          emoji: '☀️'
        },
        {
          question: 'What color is grass?',
          options: ['Red', 'Green', 'Blue', 'Yellow'],
          correct: 'Green',
          emoji: '🌱'
        },
        {
          question: 'What color is the sky?',
          options: ['Green', 'Red', 'Blue', 'Yellow'],
          correct: 'Blue',
          emoji: '☁️'
        }
      ]
    },
    {
      name: 'Shapes Quiz',
      emoji: '🔺',
      color: 'bg-purple-400',
      questions: [
        {
          question: 'How many sides does a triangle have?',
          options: ['2', '3', '4', '5'],
          correct: '3',
          emoji: '🔺'
        },
        {
          question: 'What shape is a ball?',
          options: ['Square', 'Triangle', 'Circle', 'Rectangle'],
          correct: 'Circle',
          emoji: '⚽'
        },
        {
          question: 'How many sides does a square have?',
          options: ['3', '4', '5', '6'],
          correct: '4',
          emoji: '🟦'
        },
        {
          question: 'What shape has no corners?',
          options: ['Square', 'Triangle', 'Rectangle', 'Circle'],
          correct: 'Circle',
          emoji: '🔵'
        }
      ]
    },
    {
      name: 'Animals Quiz',
      emoji: '🦁',
      color: 'bg-yellow-400',
      questions: [
        {
          question: 'What sound does a cow make?',
          options: ['Woof', 'Meow', 'Moo', 'Roar'],
          correct: 'Moo',
          emoji: '🐄'
        },
        {
          question: 'Which animal is the king of the jungle?',
          options: ['Tiger', 'Lion', 'Elephant', 'Monkey'],
          correct: 'Lion',
          emoji: '🦁'
        },
        {
          question: 'What do bees make?',
          options: ['Milk', 'Honey', 'Eggs', 'Cheese'],
          correct: 'Honey',
          emoji: '🐝'
        },
        {
          question: 'Which animal has a long trunk?',
          options: ['Giraffe', 'Elephant', 'Zebra', 'Hippo'],
          correct: 'Elephant',
          emoji: '🐘'
        }
      ]
    }
  ];

  let currentCategory = null;
  let currentQuestionIndex = 0;
  let score = 0;
  let quizStarted = false;

  const moduleBody = document.getElementById('module-body');
  
  moduleBody.innerHTML = `
    <div id="quiz-content">
      <div class="text-center mb-8">
        <h3 class="text-3xl font-bold text-kid-blue mb-4">Fun Quiz Time! 🧩</h3>
        <p class="text-gray-600">Choose a quiz category and test your knowledge!</p>
      </div>
      
      <!-- Category Selection -->
      <div id="category-selection">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          ${quizCategories.map(category => `
            <div class="quiz-category card-hover ${category.color} rounded-3xl p-8 text-white text-center cursor-pointer shadow-lg" 
                 onclick="selectQuizCategory('${category.name}')">
              <div class="text-6xl mb-4">${category.emoji}</div>
              <h4 class="text-2xl font-bold mb-2">${category.name}</h4>
              <p class="text-sm opacity-80">${category.questions.length} Questions</p>
            </div>
          `).join('')}
        </div>
      </div>
      
      <!-- Quiz Game -->
      <div id="quiz-game" class="hidden"></div>
      
      <!-- Quiz Results -->
      <div id="quiz-results" class="hidden"></div>
    </div>
  `;

  function selectQuizCategory(categoryName) {
    currentCategory = quizCategories.find(cat => cat.name === categoryName);
    currentQuestionIndex = 0;
    score = 0;
    quizStarted = true;
    
    document.getElementById('category-selection').classList.add('hidden');
    showQuestion();
    app.playSound('click');
  }

  function showQuestion() {
    const gameDiv = document.getElementById('quiz-game');
    gameDiv.classList.remove('hidden');
    
    const question = currentCategory.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentCategory.questions.length) * 100;
    
    gameDiv.innerHTML = `
      <div class="max-w-2xl mx-auto">
        <!-- Progress -->
        <div class="text-center mb-6">
          <div class="text-lg text-gray-600">Question ${currentQuestionIndex + 1} of ${currentCategory.questions.length}</div>
          <div class="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div class="bg-kid-blue h-3 rounded-full transition-all duration-500" style="width: ${progress}%"></div>
          </div>
          <div class="mt-2 text-sm text-gray-500">Score: ${score}/${currentQuestionIndex}</div>
        </div>
        
        <!-- Question -->
        <div class="bg-white rounded-3xl p-8 shadow-xl mb-8">
          <div class="text-center mb-8">
            <div class="text-8xl mb-4">${question.emoji}</div>
            <h4 class="text-2xl font-bold text-gray-800 mb-4">${question.question}</h4>
          </div>
          
          <!-- Answer Options -->
          <div class="grid grid-cols-2 gap-4">
            ${question.options.map(option => `
              <button class="quiz-answer bg-gray-50 border-4 border-gray-200 rounded-2xl p-6 text-center hover:scale-105 transition-all shadow-md font-bold text-lg" 
                      onclick="selectAnswer('${option}', '${question.correct}')">
                ${option}
              </button>
            `).join('')}
          </div>
        </div>
        
        <div id="answer-feedback" class="text-center text-2xl font-bold mb-6"></div>
      </div>
    `;
  }

  function selectAnswer(selected, correct) {
    const feedback = document.getElementById('answer-feedback');
    const answerButtons = document.querySelectorAll('.quiz-answer');
    
    // Disable all buttons
    answerButtons.forEach(btn => {
      btn.style.pointerEvents = 'none';
      if (btn.textContent.trim() === correct) {
        btn.classList.add('bg-green-100', 'border-green-500', 'text-green-800');
      } else if (btn.textContent.trim() === selected && selected !== correct) {
        btn.classList.add('bg-red-100', 'border-red-500', 'text-red-800');
      }
    });
    
    if (selected === correct) {
      feedback.innerHTML = `<div class="text-green-600">🎉 Correct! Great job!</div>`;
      score++;
      app.playSound('success');
      app.awardStars('quiz', 2);
      app.speak('Correct! Well done!');
    } else {
      feedback.innerHTML = `<div class="text-red-500">Good try! The correct answer is "${correct}"</div>`;
      app.playSound('error');
      app.speak(`Good try! The correct answer is ${correct}`);
    }
    
    // Show next button after 2 seconds
    setTimeout(() => {
      if (currentQuestionIndex < currentCategory.questions.length - 1) {
        feedback.innerHTML += `
          <button onclick="nextQuestion()" class="bg-kid-blue text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:scale-105 transition-all ml-4">
            Next Question →
          </button>
        `;
      } else {
        feedback.innerHTML += `
          <button onclick="showResults()" class="bg-kid-green text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:scale-105 transition-all ml-4">
            See Results 🏆
          </button>
        `;
      }
    }, 2000);
  }

  function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
    app.playSound('click');
  }

  function showResults() {
    const gameDiv = document.getElementById('quiz-game');
    const resultsDiv = document.getElementById('quiz-results');
    
    gameDiv.classList.add('hidden');
    resultsDiv.classList.remove('hidden');
    
    const percentage = Math.round((score / currentCategory.questions.length) * 100);
    let message, emoji, color;
    
    if (percentage >= 80) {
      message = "Excellent! You're a quiz champion!";
      emoji = "🏆";
      color = "text-yellow-600";
      app.awardStars('quiz', 5);
      app.showConfetti();
    } else if (percentage >= 60) {
      message = "Great job! You did really well!";
      emoji = "🌟";
      color = "text-green-600";
      app.awardStars('quiz', 3);
    } else {
      message = "Good try! Practice makes perfect!";
      emoji = "💪";
      color = "text-blue-600";
      app.awardStars('quiz', 1);
    }
    
    resultsDiv.innerHTML = `
      <div class="max-w-2xl mx-auto text-center">
        <div class="bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl p-8 text-white shadow-xl mb-8">
          <div class="text-8xl mb-4">${emoji}</div>
          <h3 class="text-3xl font-bold mb-4">Quiz Complete!</h3>
          <div class="text-6xl font-bold mb-2">${score}/${currentCategory.questions.length}</div>
          <div class="text-2xl mb-4">${percentage}% Correct</div>
          <div class="text-xl ${color}">${message}</div>
        </div>
        
        <div class="flex justify-center space-x-4">
          <button onclick="retakeQuiz()" class="bg-kid-blue text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:scale-105 transition-all">
            🔄 Try Again
          </button>
          <button onclick="backToCategories()" class="bg-kid-green text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:scale-105 transition-all">
            📚 New Quiz
          </button>
        </div>
      </div>
    `;
    
    app.playSound('success');
  }

  function retakeQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('quiz-results').classList.add('hidden');
    showQuestion();
    app.playSound('click');
  }

  function backToCategories() {
    currentCategory = null;
    currentQuestionIndex = 0;
    score = 0;
    quizStarted = false;
    
    document.getElementById('quiz-game').classList.add('hidden');
    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('category-selection').classList.remove('hidden');
    
    app.playSound('click');
  }

  // Global functions for quiz module
  window.selectQuizCategory = selectQuizCategory;
  window.selectAnswer = selectAnswer;
  window.nextQuestion = nextQuestion;
  window.showResults = showResults;
  window.retakeQuiz = retakeQuiz;
  window.backToCategories = backToCategories;
}