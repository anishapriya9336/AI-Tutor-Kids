// Shapes Learning Module
function loadShapesModule() {
  const shapesData = [
    { 
      name: 'Circle', 
      emoji: '🔵', 
      color: 'bg-blue-400',
      description: 'Round like a ball',
      examples: ['Ball ⚽', 'Sun ☀️', 'Coin 🪙'],
      trace: 'M 150 75 A 75 75 0 1 1 149.9 75'
    },
    { 
      name: 'Square', 
      emoji: '🟦', 
      color: 'bg-green-400',
      description: 'Four equal sides',
      examples: ['Box 📦', 'Window 🪟', 'Dice 🎲'],
      trace: 'M 75 75 L 225 75 L 225 225 L 75 225 Z'
    },
    { 
      name: 'Triangle', 
      emoji: '🔺', 
      color: 'bg-red-400',
      description: 'Three sides',
      examples: ['Mountain ⛰️', 'Pizza slice 🍕', 'Roof 🏠'],
      trace: 'M 150 50 L 250 200 L 50 200 Z'
    },
    { 
      name: 'Rectangle', 
      emoji: '🟨', 
      color: 'bg-yellow-400',
      description: 'Four sides, longer than wide',
      examples: ['Door 🚪', 'Book 📚', 'Phone 📱'],
      trace: 'M 75 100 L 225 100 L 225 200 L 75 200 Z'
    },
    { 
      name: 'Star', 
      emoji: '⭐', 
      color: 'bg-purple-400',
      description: 'Five points',
      examples: ['Night sky 🌙', 'Sheriff badge ⭐', 'Award 🏆'],
      trace: 'M 150 50 L 165 100 L 220 100 L 180 135 L 195 190 L 150 160 L 105 190 L 120 135 L 80 100 L 135 100 Z'
    },
    { 
      name: 'Heart', 
      emoji: '❤️', 
      color: 'bg-pink-400',
      description: 'Love shape',
      examples: ['Valentine 💕', 'Love ❤️', 'Care 🤗'],
      trace: 'M 150 190 C 120 160, 90 130, 120 100 C 135 85, 150 85, 150 100 C 150 85, 165 85, 180 100 C 210 130, 180 160, 150 190 Z'
    }
  ];

  let currentIndex = 0;
  let gameMode = 'learning';
  let isTracing = false;
  let tracePath = [];

  const moduleBody = document.getElementById('module-body');
  
  moduleBody.innerHTML = `
    <div class="text-center mb-6">
      <div class="flex justify-center space-x-4 mb-6">
        <button onclick="setShapeMode('learning')" id="learning-btn" class="bg-kid-blue text-white px-6 py-3 rounded-full font-bold shadow-lg">
          📚 Learn Shapes
        </button>
        <button onclick="setShapeMode('tracing')" id="tracing-btn" class="bg-gray-400 text-white px-6 py-3 rounded-full font-bold shadow-lg">
          ✏️ Trace Shapes
        </button>
        <button onclick="setShapeMode('matching')" id="matching-btn" class="bg-gray-400 text-white px-6 py-3 rounded-full font-bold shadow-lg">
          🎯 Shape Hunt
        </button>
      </div>
    </div>
    
    <div id="shapes-content"></div>
  `;

  function setShapeMode(mode) {
    gameMode = mode;
    
    ['learning', 'tracing', 'matching'].forEach(m => {
      document.getElementById(`${m}-btn`).className = m === mode 
        ? 'bg-kid-blue text-white px-6 py-3 rounded-full font-bold shadow-lg'
        : 'bg-gray-400 text-white px-6 py-3 rounded-full font-bold shadow-lg';
    });
    
    switch(mode) {
      case 'learning':
        showShapeLearning();
        break;
      case 'tracing':
        showShapeTracing();
        break;
      case 'matching':
        showShapeMatching();
        break;
    }
  }

  function showShapeLearning() {
    const content = document.getElementById('shapes-content');
    const shape = shapesData[currentIndex];
    
    content.innerHTML = `
      <div class="max-w-md mx-auto">
        <div class="text-center mb-6">
          <div class="text-lg text-gray-600">${currentIndex + 1} of ${shapesData.length}</div>
          <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div class="bg-kid-blue h-2 rounded-full transition-all duration-300" style="width: ${((currentIndex + 1) / shapesData.length) * 100}%"></div>
          </div>
        </div>
        
        <div class="card-hover ${shape.color} rounded-3xl p-12 text-white text-center shadow-xl mb-6">
          <div class="text-8xl mb-4">${shape.emoji}</div>
          <div class="text-4xl font-bold mb-2">${shape.name}</div>
          <div class="text-lg opacity-90 mb-4">${shape.description}</div>
          
          <div class="bg-white bg-opacity-20 rounded-xl p-4 mb-4">
            <div class="text-sm font-semibold mb-2">You can find ${shape.name.toLowerCase()}s in:</div>
            <div class="flex justify-center space-x-2">
              ${shape.examples.map(example => `<span class="bg-white bg-opacity-30 px-2 py-1 rounded text-sm">${example}</span>`).join('')}
            </div>
          </div>
          
          <button onclick="pronounceShape()" class="bg-white text-gray-800 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-all">
            🔊 Listen
          </button>
        </div>
        
        <div class="flex justify-between">
          <button onclick="previousShape()" ${currentIndex === 0 ? 'disabled' : ''} 
                  class="bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-white px-6 py-3 rounded-full font-bold shadow-lg">
            ← Previous
          </button>
          <button onclick="nextShape()" ${currentIndex === shapesData.length - 1 ? 'disabled' : ''} 
                  class="bg-kid-green hover:bg-green-600 disabled:opacity-50 text-white px-6 py-3 rounded-full font-bold shadow-lg">
            Next →
          </button>
        </div>
      </div>
    `;
  }

  function showShapeTracing() {
    const content = document.getElementById('shapes-content');
    const shape = shapesData[currentIndex];
    
    content.innerHTML = `
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-6">
          <h3 class="text-3xl font-bold text-kid-blue mb-2">Trace the ${shape.name}!</h3>
          <p class="text-gray-600">Use your mouse or finger to trace along the dotted line</p>
        </div>
        
        <div class="bg-white rounded-3xl p-8 shadow-xl mb-6">
          <svg width="300" height="300" viewBox="0 0 300 300" class="mx-auto border-2 border-dashed border-gray-300 rounded-xl">
            <path d="${shape.trace}" 
                  stroke="#ddd" 
                  stroke-width="8" 
                  fill="none" 
                  stroke-dasharray="10,5"
                  id="trace-guide"/>
            <path d="" 
                  stroke="${shape.color.replace('bg-', '#')}" 
                  stroke-width="6" 
                  fill="none"
                  stroke-linecap="round"
                  id="user-trace"/>
          </svg>
          
          <div class="text-center mt-4">
            <div class="text-6xl mb-2">${shape.emoji}</div>
            <div class="text-2xl font-bold text-gray-700">${shape.name}</div>
          </div>
        </div>
        
        <div class="flex justify-center space-x-4">
          <button onclick="clearTrace()" class="bg-gray-500 text-white px-6 py-3 rounded-full font-bold shadow-lg">
            🗑️ Clear
          </button>
          <button onclick="nextTraceShape()" class="bg-kid-purple text-white px-6 py-3 rounded-full font-bold shadow-lg">
            ➡️ Next Shape
          </button>
        </div>
      </div>
    `;
    
    // Add tracing functionality
    const svg = content.querySelector('svg');
    const userTrace = content.querySelector('#user-trace');
    let isDrawing = false;
    let pathData = '';
    
    svg.addEventListener('mousedown', startTracing);
    svg.addEventListener('mousemove', trace);
    svg.addEventListener('mouseup', stopTracing);
    
    // Touch events for mobile
    svg.addEventListener('touchstart', startTracing);
    svg.addEventListener('touchmove', trace);
    svg.addEventListener('touchend', stopTracing);
    
    function startTracing(e) {
      isDrawing = true;
      const rect = svg.getBoundingClientRect();
      const scaleX = 300 / rect.width;
      const scaleY = 300 / rect.height;
      
      let clientX, clientY;
      if (e.type === 'touchstart') {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      
      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;
      
      pathData = `M ${x} ${y}`;
      userTrace.setAttribute('d', pathData);
    }
    
    function trace(e) {
      if (!isDrawing) return;
      
      e.preventDefault();
      const rect = svg.getBoundingClientRect();
      const scaleX = 300 / rect.width;
      const scaleY = 300 / rect.height;
      
      let clientX, clientY;
      if (e.type === 'touchmove') {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      
      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;
      
      pathData += ` L ${x} ${y}`;
      userTrace.setAttribute('d', pathData);
    }
    
    function stopTracing() {
      if (isDrawing) {
        isDrawing = false;
        app.playSound('success');
        app.awardStars('shapes', 2);
        app.speak('Great tracing! Well done!');
      }
    }
  }

  function showShapeMatching() {
    const content = document.getElementById('shapes-content');
    const targetShape = shapesData[Math.floor(Math.random() * shapesData.length)];
    
    // Create random objects that include the target shape
    const objects = [
      { emoji: '⚽', shape: 'Circle' },
      { emoji: '📦', shape: 'Square' },
      { emoji: '🍕', shape: 'Triangle' },
      { emoji: '📱', shape: 'Rectangle' },
      { emoji: '⭐', shape: 'Star' },
      { emoji: '💝', shape: 'Heart' },
      { emoji: '🪙', shape: 'Circle' },
      { emoji: '🎲', shape: 'Square' },
      { emoji: '⛰️', shape: 'Triangle' },
      { emoji: '📚', shape: 'Rectangle' }
    ];
    
    const shuffledObjects = objects.sort(() => Math.random() - 0.5).slice(0, 8);
    
    // Ensure target shape is included
    if (!shuffledObjects.find(obj => obj.shape === targetShape.name)) {
      const targetObjects = objects.filter(obj => obj.shape === targetShape.name);
      shuffledObjects[0] = targetObjects[Math.floor(Math.random() * targetObjects.length)];
    }
    
    content.innerHTML = `
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h3 class="text-3xl font-bold text-kid-blue mb-4">Shape Hunt! 🕵️</h3>
          <div class="bg-gradient-to-r ${targetShape.color} rounded-2xl p-6 text-white inline-block shadow-lg">
            <div class="text-6xl mb-2">${targetShape.emoji}</div>
            <div class="text-2xl font-bold">Find all ${targetShape.name}s!</div>
          </div>
        </div>
        
        <div class="grid grid-cols-4 gap-6 mb-8">
          ${shuffledObjects.map(obj => `
            <div class="object-card bg-white rounded-2xl p-6 text-center cursor-pointer shadow-lg hover:scale-105 transition-all" 
                 onclick="selectObject(this, '${obj.shape}')" 
                 data-shape="${obj.shape}">
              <div class="text-6xl mb-2">${obj.emoji}</div>
              <div class="text-sm text-gray-600">${obj.shape}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="text-center">
          <button onclick="checkShapeMatching()" class="bg-kid-green text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:scale-105 transition-all">
            ✨ Check Answers
          </button>
          <button onclick="newShapeHunt()" class="bg-gray-500 text-white px-6 py-3 rounded-full font-bold shadow-lg ml-4">
            🔄 New Hunt
          </button>
        </div>
        
        <div id="hunt-result" class="text-center mt-6 text-2xl font-bold"></div>
      </div>
    `;
    
    // Store target shape for checking
    content.dataset.targetShape = targetShape.name;
  }

  // Global functions for shapes module
  window.setShapeMode = setShapeMode;
  
  window.nextShape = function() {
    if (currentIndex < shapesData.length - 1) {
      currentIndex++;
      showShapeLearning();
      app.playSound('click');
    }
  };
  
  window.previousShape = function() {
    if (currentIndex > 0) {
      currentIndex--;
      showShapeLearning();
      app.playSound('click');
    }
  };
  
  window.pronounceShape = function() {
    const shape = shapesData[currentIndex];
    app.speak(`This is a ${shape.name}. ${shape.description}. A ${shape.name} has ${shape.name === 'Circle' ? 'no corners' : shape.name === 'Triangle' ? 'three sides' : shape.name === 'Square' ? 'four equal sides' : shape.name === 'Rectangle' ? 'four sides' : shape.name === 'Star' ? 'five points' : 'a special shape'}.`);
    app.playSound('success');
  };
  
  window.clearTrace = function() {
    document.getElementById('user-trace').setAttribute('d', '');
    app.playSound('click');
  };
  
  window.nextTraceShape = function() {
    currentIndex = (currentIndex + 1) % shapesData.length;
    showShapeTracing();
    app.playSound('click');
  };
  
  window.selectObject = function(element, shape) {
    element.classList.toggle('bg-kid-blue');
    element.classList.toggle('text-white');
    element.classList.toggle('scale-110');
    app.playSound('click');
  };
  
  window.checkShapeMatching = function() {
    const content = document.getElementById('shapes-content');
    const targetShape = content.dataset.targetShape;
    const selectedCards = content.querySelectorAll('.object-card.bg-kid-blue');
    const result = document.getElementById('hunt-result');
    
    let correctSelections = 0;
    let incorrectSelections = 0;
    
    selectedCards.forEach(card => {
      if (card.dataset.shape === targetShape) {
        correctSelections++;
        card.classList.add('bg-green-500');
        card.classList.remove('bg-kid-blue');
      } else {
        incorrectSelections++;
        card.classList.add('bg-red-500');
        card.classList.remove('bg-kid-blue');
      }
    });
    
    // Check for missed correct answers
    const allCorrectCards = content.querySelectorAll(`[data-shape="${targetShape}"]`);
    const missedCorrect = allCorrectCards.length - correctSelections;
    
    if (correctSelections > 0 && incorrectSelections === 0 && missedCorrect === 0) {
      result.innerHTML = `<div class="text-green-600">🎉 Perfect! You found all ${targetShape}s!</div>`;
      app.playSound('success');
      app.awardStars('shapes', 3);
      app.showConfetti();
      app.speak(`Perfect! You found all the ${targetShape}s! Excellent shape hunting!`);
    } else if (correctSelections > 0) {
      result.innerHTML = `<div class="text-yellow-600">Good job! You found ${correctSelections} ${targetShape}(s), but missed ${missedCorrect} and selected ${incorrectSelections} wrong shapes.</div>`;
      app.playSound('click');
      app.awardStars('shapes', 1);
      app.speak(`Good job! You found some ${targetShape}s. Keep trying!`);
    } else {
      result.innerHTML = `<div class="text-red-500">Try again! Look for shapes that are ${targetShape}s.</div>`;
      app.playSound('error');
      app.speak(`Try again! Look for shapes that are ${targetShape}s.`);
    }
  };
  
  window.newShapeHunt = function() {
    showShapeMatching();
    app.playSound('click');
  };

  // Initialize with learning mode
  setShapeMode('learning');
}