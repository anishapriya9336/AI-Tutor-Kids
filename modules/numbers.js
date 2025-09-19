// Numbers Learning Module
function loadNumbersModule() {
  const numbersData = [
    { number: 0, word: 'Zero', emoji: '⭕', items: '', color: 'bg-gray-400' },
    { number: 1, word: 'One', emoji: '1️⃣', items: '🍎', color: 'bg-red-400' },
    { number: 2, word: 'Two', emoji: '2️⃣', items: '🍎🍎', color: 'bg-blue-400' },
    { number: 3, word: 'Three', emoji: '3️⃣', items: '🍎🍎🍎', color: 'bg-green-400' },
    { number: 4, word: 'Four', emoji: '4️⃣', items: '🍎🍎🍎🍎', color: 'bg-yellow-400' },
    { number: 5, word: 'Five', emoji: '5️⃣', items: '🍎🍎🍎🍎🍎', color: 'bg-purple-400' },
    { number: 6, word: 'Six', emoji: '6️⃣', items: '🍎🍎🍎🍎🍎🍎', color: 'bg-pink-400' },
    { number: 7, word: 'Seven', emoji: '7️⃣', items: '🍎🍎🍎🍎🍎🍎🍎', color: 'bg-indigo-400' },
    { number: 8, word: 'Eight', emoji: '8️⃣', items: '🍎🍎🍎🍎🍎🍎🍎🍎', color: 'bg-teal-400' },
    { number: 9, word: 'Nine', emoji: '9️⃣', items: '🍎🍎🍎🍎🍎🍎🍎🍎🍎', color: 'bg-orange-400' },
    { number: 10, word: 'Ten', emoji: '🔟', items: '🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎', color: 'bg-red-500' }
  ];

  let currentIndex = 0;
  let gameMode = 'counting';
  let countingGame = null;

  const moduleBody = document.getElementById('module-body');
  
  moduleBody.innerHTML = `
    <div class="text-center mb-6">
      <div class="flex justify-center space-x-4 mb-6">
        <button onclick="setNumberMode('counting')" id="counting-btn" class="bg-kid-blue text-white px-6 py-3 rounded-full font-bold shadow-lg">
          🔢 Counting
        </button>
        <button onclick="setNumberMode('game')" id="number-game-btn" class="bg-gray-400 text-white px-6 py-3 rounded-full font-bold shadow-lg">
          🎮 Number Game
        </button>
      </div>
    </div>
    
    <div id="numbers-content"></div>
  `;

  function setNumberMode(mode) {
    gameMode = mode;
    document.getElementById('counting-btn').className = mode === 'counting' 
      ? 'bg-kid-blue text-white px-6 py-3 rounded-full font-bold shadow-lg'
      : 'bg-gray-400 text-white px-6 py-3 rounded-full font-bold shadow-lg';
    
    document.getElementById('number-game-btn').className = mode === 'game' 
      ? 'bg-kid-blue text-white px-6 py-3 rounded-full font-bold shadow-lg'
      : 'bg-gray-400 text-white px-6 py-3 rounded-full font-bold shadow-lg';
    
    if (mode === 'counting') {
      showCounting();
    } else {
      showNumberGame();
    }
  }

  function showCounting() {
    const content = document.getElementById('numbers-content');
    const item = numbersData[currentIndex];
    
    // Create interactive counting items
    let interactiveItems = '';
    for (let i = 0; i < item.number; i++) {
      interactiveItems += `<span class="text-4xl cursor-pointer hover:scale-125 transition-transform inline-block m-1 counting-item" 
                                onclick="countItem(${i + 1})" data-count="${i + 1}">🍎</span>`;
    }
    
    content.innerHTML = `
      <div class="max-w-md mx-auto">
        <div class="text-center mb-6">
          <div class="text-lg text-gray-600">${currentIndex + 1} of ${numbersData.length}</div>
          <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div class="bg-kid-blue h-2 rounded-full transition-all duration-300" style="width: ${((currentIndex + 1) / numbersData.length) * 100}%"></div>
          </div>
        </div>
        
        <div class="card-hover ${item.color} rounded-3xl p-12 text-white text-center shadow-xl mb-6">
          <div class="text-8xl mb-4">${item.number}</div>
          <div class="text-3xl font-bold mb-4">${item.word}</div>
          <div class="min-h-24 flex flex-wrap justify-center items-center mb-4" id="counting-area">
            ${interactiveItems}
          </div>
          <button onclick="pronounceNumber()" class="bg-white text-gray-800 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-all">
            🔊 Listen
          </button>
        </div>
        
        <div class="flex justify-between">
          <button onclick="previousNumber()" ${currentIndex === 0 ? 'disabled' : ''} 
                  class="bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-white px-6 py-3 rounded-full font-bold shadow-lg">
            ← Previous
          </button>
          <button onclick="nextNumber()" ${currentIndex === numbersData.length - 1 ? 'disabled' : ''} 
                  class="bg-kid-green hover:bg-green-600 disabled:opacity-50 text-white px-6 py-3 rounded-full font-bold shadow-lg">
            Next →
          </button>
        </div>
      </div>
    `;
  }

  function showNumberGame() {
    const targetNumber = Math.floor(Math.random() * 8) + 2; // 2-9
    const totalItems = 15;
    
    countingGame = {
      target: targetNumber,
      selected: 0,
      completed: false
    };
    
    let items = '';
    for (let i = 0; i < totalItems; i++) {
      items += `<div class="game-item text-4xl cursor-pointer hover:scale-110 transition-all p-2 rounded-lg" 
                     onclick="selectItem(this)" data-selected="false">🍌</div>`;
    }
    
    const content = document.getElementById('numbers-content');
    content.innerHTML = `
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-6">
          <h3 class="text-3xl font-bold text-kid-blue mb-2">Counting Game!</h3>
          <p class="text-xl text-gray-600">Select exactly <span class="text-kid-purple font-bold">${targetNumber}</span> bananas</p>
          <div class="mt-4">
            <span class="text-2xl font-bold">Selected: <span id="selected-count" class="text-kid-green">0</span>/${targetNumber}</span>
          </div>
        </div>
        
        <div class="grid grid-cols-5 gap-4 mb-6 max-w-lg mx-auto" id="items-grid">
          ${items}
        </div>
        
        <div class="text-center">
          <button onclick="checkAnswer()" id="check-btn" class="bg-kid-purple text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:scale-105 transition-all">
            ✨ Check Answer
          </button>
          <button onclick="resetNumberGame()" class="bg-gray-500 text-white px-6 py-3 rounded-full font-bold shadow-lg ml-4">
            🔄 New Game
          </button>
        </div>
        
        <div id="game-result" class="text-center mt-6 text-2xl font-bold"></div>
      </div>
    `;
  }

  // Global functions for numbers module
  window.setNumberMode = setNumberMode;
  
  window.nextNumber = function() {
    if (currentIndex < numbersData.length - 1) {
      currentIndex++;
      showCounting();
      app.playSound('click');
    }
  };
  
  window.previousNumber = function() {
    if (currentIndex > 0) {
      currentIndex--;
      showCounting();
      app.playSound('click');
    }
  };
  
  window.pronounceNumber = function() {
    const item = numbersData[currentIndex];
    app.speak(`The number ${item.number}. ${item.word}. Count with me: ${item.number}.`);
    app.playSound('success');
  };
  
  window.countItem = function(count) {
    app.speak(`${count}. Count ${count}.`);
    app.awardStars('numbers', 1);
    app.playSound('click');
    
    // Highlight counted items
    document.querySelectorAll('.counting-item').forEach((item, index) => {
      if (index < count) {
        item.style.transform = 'scale(1.2)';
        item.style.filter = 'brightness(1.5)';
      } else {
        item.style.transform = 'scale(1)';
        item.style.filter = 'brightness(1)';
      }
    });
  };
  
  window.selectItem = function(element) {
    if (countingGame.completed) return;
    
    const isSelected = element.dataset.selected === 'true';
    
    if (isSelected) {
      element.dataset.selected = 'false';
      element.classList.remove('bg-kid-green', 'scale-110');
      element.style.filter = 'brightness(1)';
      countingGame.selected--;
    } else {
      if (countingGame.selected < countingGame.target) {
        element.dataset.selected = 'true';
        element.classList.add('bg-kid-green', 'scale-110');
        element.style.filter = 'brightness(1.2)';
        countingGame.selected++;
      }
    }
    
    document.getElementById('selected-count').textContent = countingGame.selected;
    app.playSound('click');
  };
  
  window.checkAnswer = function() {
    const result = document.getElementById('game-result');
    
    if (countingGame.selected === countingGame.target) {
      result.innerHTML = `<div class="text-green-600">🎉 Perfect! You selected exactly ${countingGame.target} bananas!</div>`;
      countingGame.completed = true;
      app.playSound('success');
      app.awardStars('numbers', 3);
      app.showConfetti();
      app.speak(`Perfect! You selected exactly ${countingGame.target} bananas! Great counting!`);
    } else {
      result.innerHTML = `<div class="text-red-500">Try again! You selected ${countingGame.selected}, but need ${countingGame.target}</div>`;
      app.playSound('error');
      app.speak(`Try again! You selected ${countingGame.selected}, but you need ${countingGame.target}.`);
    }
  };
  
  window.resetNumberGame = function() {
    showNumberGame();
    app.playSound('click');
  };

  // Initialize with counting
  setNumberMode('counting');
}