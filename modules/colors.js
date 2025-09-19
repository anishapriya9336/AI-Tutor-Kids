// Colors Learning Module
function loadColorsModule() {
  const colorsData = [
    { name: 'Red', hex: '#EF4444', emoji: '🔴', items: ['Apple 🍎', 'Fire 🔥', 'Heart ❤️'] },
    { name: 'Blue', hex: '#3B82F6', emoji: '🔵', items: ['Sky ☀️', 'Ocean 🌊', 'Blueberry 🫐'] },
    { name: 'Yellow', hex: '#F59E0B', emoji: '🟡', items: ['Sun ☀️', 'Banana 🍌', 'Lemon 🍋'] },
    { name: 'Green', hex: '#10B981', emoji: '🟢', items: ['Grass 🌱', 'Tree 🌳', 'Frog 🐸'] },
    { name: 'Purple', hex: '#8B5CF6', emoji: '🟣', items: ['Grapes 🍇', 'Eggplant 🍆', 'Crown 👑'] },
    { name: 'Orange', hex: '#F97316', emoji: '🟠', items: ['Orange 🍊', 'Pumpkin 🎃', 'Tiger 🐅'] },
    { name: 'Pink', hex: '#EC4899', emoji: '🩷', items: ['Flower 🌸', 'Flamingo 🦩', 'Pig 🐷'] },
    { name: 'Brown', hex: '#8B4513', emoji: '🤎', items: ['Tree 🌳', 'Bear 🐻', 'Chocolate 🍫'] }
  ];

  let currentIndex = 0;
  let gameMode = 'learning';
  let coloringCanvas = null;
  let currentTool = { color: '#EF4444', size: 20 };

  const moduleBody = document.getElementById('module-body');
  
  moduleBody.innerHTML = `
    <div class="text-center mb-6">
      <div class="flex justify-center space-x-4 mb-6">
        <button onclick="setColorMode('learning')" id="color-learning-btn" class="bg-kid-blue text-white px-6 py-3 rounded-full font-bold shadow-lg">
          🎨 Learn Colors
        </button>
        <button onclick="setColorMode('coloring')" id="coloring-btn" class="bg-gray-400 text-white px-6 py-3 rounded-full font-bold shadow-lg">
          ✏️ Color & Paint
        </button>
        <button onclick="setColorMode('quiz')" id="color-quiz-btn" class="bg-gray-400 text-white px-6 py-3 rounded-full font-bold shadow-lg">
          🎯 Color Quiz
        </button>
      </div>
    </div>
    
    <div id="colors-content"></div>
  `;

  function setColorMode(mode) {
    gameMode = mode;
    
    ['learning', 'coloring', 'quiz'].forEach(m => {
      const btnId = m === 'learning' ? 'color-learning-btn' : m === 'coloring' ? 'coloring-btn' : 'color-quiz-btn';
      document.getElementById(btnId).className = m === mode 
        ? 'bg-kid-blue text-white px-6 py-3 rounded-full font-bold shadow-lg'
        : 'bg-gray-400 text-white px-6 py-3 rounded-full font-bold shadow-lg';
    });
    
    switch(mode) {
      case 'learning':
        showColorLearning();
        break;
      case 'coloring':
        showColoringGame();
        break;
      case 'quiz':
        showColorQuiz();
        break;
    }
  }

  function showColorLearning() {
    const content = document.getElementById('colors-content');
    const color = colorsData[currentIndex];
    
    content.innerHTML = `
      <div class="max-w-md mx-auto">
        <div class="text-center mb-6">
          <div class="text-lg text-gray-600">${currentIndex + 1} of ${colorsData.length}</div>
          <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div class="bg-kid-blue h-2 rounded-full transition-all duration-300" style="width: ${((currentIndex + 1) / colorsData.length) * 100}%"></div>
          </div>
        </div>
        
        <div class="card-hover rounded-3xl p-12 text-white text-center shadow-xl mb-6" style="background: linear-gradient(135deg, ${color.hex}, ${color.hex}dd)">
          <div class="text-8xl mb-4">${color.emoji}</div>
          <div class="text-4xl font-bold mb-4">${color.name}</div>
          
          <div class="bg-white bg-opacity-20 rounded-xl p-4 mb-4">
            <div class="text-lg font-semibold mb-3">Things that are ${color.name.toLowerCase()}:</div>
            <div class="grid grid-cols-3 gap-2">
              ${color.items.map(item => `
                <div class="bg-white bg-opacity-30 rounded-lg p-2 text-sm font-medium">
                  ${item}
                </div>
              `).join('')}
            </div>
          </div>
          
          <button onclick="pronounceColor()" class="bg-white text-gray-800 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all text-lg">
            🔊 Say Color
          </button>
        </div>
        
        <div class="flex justify-between">
          <button onclick="previousColor()" ${currentIndex === 0 ? 'disabled' : ''} 
                  class="bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-white px-6 py-3 rounded-full font-bold shadow-lg">
            ← Previous
          </button>
          <button onclick="nextColor()" ${currentIndex === colorsData.length - 1 ? 'disabled' : ''} 
                  class="bg-kid-green hover:bg-green-600 disabled:opacity-50 text-white px-6 py-3 rounded-full font-bold shadow-lg">
            Next →
          </button>
        </div>
      </div>
    `;
  }

  function showColoringGame() {
    const content = document.getElementById('colors-content');
    
    content.innerHTML = `
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-6">
          <h3 class="text-3xl font-bold text-kid-blue mb-2">Color & Paint! 🎨</h3>
          <p class="text-gray-600">Choose a color and paint the picture!</p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Color Palette -->
          <div class="lg:col-span-1">
            <h4 class="text-xl font-bold text-center mb-4">🎨 Colors</h4>
            <div class="grid grid-cols-4 lg:grid-cols-2 gap-3">
              ${colorsData.map(color => `
                <button class="color-btn w-12 h-12 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-all" 
                        style="background-color: ${color.hex}" 
                        onclick="selectColor('${color.hex}')"
                        title="${color.name}">
                </button>
              `).join('')}
              <button class="color-btn w-12 h-12 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-all bg-black" 
                      onclick="selectColor('#000000')" title="Black">
              </button>
              <button class="color-btn w-12 h-12 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-all bg-white border-gray-300" 
                      onclick="selectColor('#FFFFFF')" title="White">
              </button>
            </div>
            
            <div class="mt-6">
              <h4 class="text-lg font-bold mb-2">🖌️ Brush Size</h4>
              <input type="range" min="5" max="50" value="20" 
                     onchange="setBrushSize(this.value)" 
                     class="w-full">
              <div class="text-center mt-2">Size: <span id="brush-size">20</span>px</div>
            </div>
            
            <div class="mt-6 space-y-2">
              <button onclick="clearCanvas()" class="w-full bg-gray-500 text-white py-2 rounded-lg font-bold">
                🗑️ Clear
              </button>
              <button onclick="saveArt()" class="w-full bg-kid-green text-white py-2 rounded-lg font-bold">
                💾 Save Art
              </button>
            </div>
          </div>
          
          <!-- Canvas -->
          <div class="lg:col-span-3">
            <div class="bg-white rounded-2xl p-4 shadow-xl">
              <canvas id="coloring-canvas" 
                      width="600" 
                      height="400" 
                      class="border-2 border-gray-200 rounded-xl cursor-crosshair mx-auto block"
                      style="max-width: 100%; height: auto;">
              </canvas>
            </div>
            
            <div class="text-center mt-4">
              <div class="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                <div class="w-6 h-6 rounded-full border-2 border-gray-300" 
                     style="background-color: ${currentTool.color}" 
                     id="current-color"></div>
                <span class="text-sm font-medium">Current Color</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    initializeCanvas();
  }

  function initializeCanvas() {
    const canvas = document.getElementById('coloring-canvas');
    const ctx = canvas.getContext('2d');
    
    // Draw initial coloring template
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, 600, 400);
    
    // Draw simple shapes to color
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    
    // House outline
    ctx.beginPath();
    // House base
    ctx.rect(150, 250, 200, 120);
    // Roof
    ctx.moveTo(130, 250);
    ctx.lineTo(250, 180);
    ctx.lineTo(370, 250);
    ctx.closePath();
    // Door
    ctx.rect(220, 310, 60, 60);
    // Windows
    ctx.rect(170, 280, 40, 40);
    ctx.rect(290, 280, 40, 40);
    ctx.stroke();
    
    // Sun
    ctx.beginPath();
    ctx.arc(500, 80, 40, 0, Math.PI * 2);
    ctx.stroke();
    
    // Tree
    ctx.beginPath();
    ctx.arc(80, 200, 50, 0, Math.PI * 2); // leaves
    ctx.rect(70, 250, 20, 80); // trunk
    ctx.stroke();
    
    let isDrawing = false;
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
    
    function preventScroll(e) {
      e.preventDefault();
    }
    
    canvas.addEventListener('touchmove', preventScroll, { passive: false });
    
    function startDrawing(e) {
      isDrawing = true;
      draw(e);
    }
    
    function draw(e) {
      if (!isDrawing) return;
      
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      let clientX, clientY;
      if (e.type.includes('touch')) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      
      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = currentTool.color;
      ctx.beginPath();
      ctx.arc(x, y, currentTool.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    function stopDrawing() {
      if (isDrawing) {
        isDrawing = false;
        app.playSound('click');
        app.awardStars('colors', 1);
      }
    }
  }

  function showColorQuiz() {
    const content = document.getElementById('colors-content');
    const quizItems = [
      { question: 'What color is the sun?', options: ['Red', 'Yellow', 'Blue', 'Green'], correct: 'Yellow', emoji: '☀️' },
      { question: 'What color is grass?', options: ['Purple', 'Yellow', 'Green', 'Red'], correct: 'Green', emoji: '🌱' },
      { question: 'What color is the sky?', options: ['Green', 'Blue', 'Red', 'Purple'], correct: 'Blue', emoji: '☁️' },
      { question: 'What color is an apple?', options: ['Blue', 'Green', 'Red', 'Yellow'], correct: 'Red', emoji: '🍎' },
      { question: 'What color are grapes?', options: ['Purple', 'Blue', 'Yellow', 'Green'], correct: 'Purple', emoji: '🍇' }
    ];
    
    const currentQuiz = quizItems[Math.floor(Math.random() * quizItems.length)];
    
    content.innerHTML = `
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-8">
          <h3 class="text-3xl font-bold text-kid-blue mb-4">Color Quiz! 🧠</h3>
          <div class="bg-white rounded-3xl p-8 shadow-xl">
            <div class="text-8xl mb-4">${currentQuiz.emoji}</div>
            <div class="text-2xl font-bold text-gray-800 mb-6">${currentQuiz.question}</div>
            
            <div class="grid grid-cols-2 gap-4">
              ${currentQuiz.options.map(option => {
                const colorData = colorsData.find(c => c.name === option);
                return `
                  <button class="quiz-option bg-white border-4 border-gray-200 rounded-2xl p-6 hover:scale-105 transition-all shadow-lg" 
                          onclick="selectQuizAnswer('${option}', '${currentQuiz.correct}')"
                          style="border-color: ${colorData ? colorData.hex : '#gray'}">
                    <div class="w-12 h-12 rounded-full mx-auto mb-2" 
                         style="background-color: ${colorData ? colorData.hex : '#gray'}"></div>
                    <div class="text-lg font-bold">${option}</div>
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        </div>
        
        <div id="quiz-result" class="text-center text-2xl font-bold mb-6"></div>
        
        <div class="text-center">
          <button onclick="newColorQuiz()" class="bg-kid-purple text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:scale-105 transition-all">
            🔄 New Question
          </button>
        </div>
      </div>
    `;
  }

  // Global functions for colors module
  window.setColorMode = setColorMode;
  
  window.nextColor = function() {
    if (currentIndex < colorsData.length - 1) {
      currentIndex++;
      showColorLearning();
      app.playSound('click');
    }
  };
  
  window.previousColor = function() {
    if (currentIndex > 0) {
      currentIndex--;
      showColorLearning();
      app.playSound('click');
    }
  };
  
  window.pronounceColor = function() {
    const color = colorsData[currentIndex];
    app.speak(`This is the color ${color.name}. ${color.name} like ${color.items[0].split(' ')[0]}. Beautiful ${color.name}!`);
    app.playSound('success');
  };
  
  window.selectColor = function(hexColor) {
    currentTool.color = hexColor;
    document.getElementById('current-color').style.backgroundColor = hexColor;
    
    // Update color button selection
    document.querySelectorAll('.color-btn').forEach(btn => {
      btn.classList.remove('ring-4', 'ring-kid-blue');
    });
    event.target.classList.add('ring-4', 'ring-kid-blue');
    
    app.playSound('click');
  };
  
  window.setBrushSize = function(size) {
    currentTool.size = parseInt(size);
    document.getElementById('brush-size').textContent = size;
  };
  
  window.clearCanvas = function() {
    const canvas = document.getElementById('coloring-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initializeCanvas();
    app.playSound('click');
  };
  
  window.saveArt = function() {
    const canvas = document.getElementById('coloring-canvas');
    const dataURL = canvas.toDataURL();
    const link = document.createElement('a');
    link.download = 'my-artwork.png';
    link.href = dataURL;
    link.click();
    
    app.playSound('success');
    app.awardStars('colors', 3);
    app.showConfetti();
  };
  
  window.selectQuizAnswer = function(selected, correct) {
    const result = document.getElementById('quiz-result');
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach(option => {
      option.style.pointerEvents = 'none';
      if (option.textContent.trim().includes(correct)) {
        option.classList.add('bg-green-100', 'border-green-500');
      } else if (option.textContent.trim().includes(selected) && selected !== correct) {
        option.classList.add('bg-red-100', 'border-red-500');
      }
    });
    
    if (selected === correct) {
      result.innerHTML = `<div class="text-green-600">🎉 Correct! Great job!</div>`;
      app.playSound('success');
      app.awardStars('colors', 2);
      app.showConfetti();
      app.speak(`Correct! The answer is ${correct}. Great job!`);
    } else {
      result.innerHTML = `<div class="text-red-500">Try again! The correct answer is ${correct}.</div>`;
      app.playSound('error');
      app.speak(`Try again! The correct answer is ${correct}.`);
    }
  };
  
  window.newColorQuiz = function() {
    showColorQuiz();
    app.playSound('click');
  };

  // Initialize with learning mode
  setColorMode('learning');
}