// Drawing Module
function loadDrawingModule() {
  let canvas, ctx;
  let isDrawing = false;
  let currentTool = {
    color: '#3B82F6',
    size: 10,
    tool: 'brush'
  };
  let shapes = [];
  let currentChallenge = null;

  const drawingChallenges = [
    { name: 'Draw a House', emoji: '🏠', hint: 'Draw a square with a triangle on top for the roof!' },
    { name: 'Draw a Sun', emoji: '☀️', hint: 'Draw a circle and add lines around it for rays!' },
    { name: 'Draw a Tree', emoji: '🌳', hint: 'Draw a brown trunk with a green circle on top!' },
    { name: 'Draw a Cat', emoji: '🐱', hint: 'Draw a circle for the head and add triangle ears!' },
    { name: 'Draw a Car', emoji: '🚗', hint: 'Draw a rectangle with two circles for wheels!' },
    { name: 'Draw a Flower', emoji: '🌸', hint: 'Draw a circle center with petals around it!' }
  ];

  const colors = [
    { name: 'Blue', hex: '#3B82F6' },
    { name: 'Red', hex: '#EF4444' },
    { name: 'Green', hex: '#10B981' },
    { name: 'Yellow', hex: '#F59E0B' },
    { name: 'Purple', hex: '#8B5CF6' },
    { name: 'Orange', hex: '#F97316' },
    { name: 'Pink', hex: '#EC4899' },
    { name: 'Brown', hex: '#8B4513' },
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' }
  ];

  const moduleBody = document.getElementById('module-body');
  
  moduleBody.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Tools Panel -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Drawing Challenge -->
        <div class="bg-white rounded-2xl p-4 shadow-lg">
          <h4 class="text-lg font-bold mb-4 text-center text-kid-purple">🎯 Challenge</h4>
          <div id="current-challenge" class="text-center mb-4">
            <div class="text-4xl mb-2">🎨</div>
            <div class="text-sm text-gray-600">Click "New Challenge" to start!</div>
          </div>
          <button onclick="newChallenge()" class="w-full bg-kid-green text-white py-2 rounded-lg font-bold text-sm">
            🎲 New Challenge
          </button>
        </div>
        
        <!-- Color Palette -->
        <div class="bg-white rounded-2xl p-4 shadow-lg">
          <h4 class="text-lg font-bold mb-4 text-center text-kid-purple">🎨 Colors</h4>
          <div class="grid grid-cols-5 gap-2">
            ${colors.map(color => `
              <button class="color-picker w-8 h-8 rounded-full border-2 border-gray-300 hover:scale-110 transition-all" 
                      style="background-color: ${color.hex}" 
                      onclick="selectDrawingColor('${color.hex}')"
                      title="${color.name}">
              </button>
            `).join('')}
          </div>
          
          <div class="mt-4 text-center">
            <div class="inline-flex items-center space-x-2">
              <div class="w-6 h-6 rounded-full border-2 border-gray-300" 
                   style="background-color: ${currentTool.color}" 
                   id="current-draw-color"></div>
              <span class="text-xs font-medium">Current</span>
            </div>
          </div>
        </div>
        
        <!-- Brush Settings -->
        <div class="bg-white rounded-2xl p-4 shadow-lg">
          <h4 class="text-lg font-bold mb-4 text-center text-kid-purple">🖌️ Brush</h4>
          
          <div class="mb-4">
            <label class="text-sm font-medium">Size: <span id="brush-display">${currentTool.size}</span>px</label>
            <input type="range" min="2" max="50" value="${currentTool.size}" 
                   onchange="setBrushSizeDrawing(this.value)" 
                   class="w-full mt-1">
          </div>
          
          <div class="grid grid-cols-2 gap-2">
            <button onclick="setDrawingTool('brush')" 
                    id="brush-tool"
                    class="bg-kid-blue text-white py-2 px-3 rounded-lg font-bold text-sm">
              🖌️ Brush
            </button>
            <button onclick="setDrawingTool('eraser')" 
                    id="eraser-tool"
                    class="bg-gray-400 text-white py-2 px-3 rounded-lg font-bold text-sm">
              🧹 Eraser
            </button>
          </div>
        </div>
        
        <!-- Shape Tools -->
        <div class="bg-white rounded-2xl p-4 shadow-lg">
          <h4 class="text-lg font-bold mb-4 text-center text-kid-purple">📐 Shapes</h4>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <button onclick="drawShape('circle')" class="bg-green-400 text-white py-2 rounded-lg font-bold">
              ⭕ Circle
            </button>
            <button onclick="drawShape('rectangle')" class="bg-blue-400 text-white py-2 rounded-lg font-bold">
              ⬜ Square
            </button>
            <button onclick="drawShape('triangle')" class="bg-red-400 text-white py-2 rounded-lg font-bold">
              🔺 Triangle
            </button>
            <button onclick="drawShape('star')" class="bg-yellow-400 text-white py-2 rounded-lg font-bold">
              ⭐ Star
            </button>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="bg-white rounded-2xl p-4 shadow-lg">
          <h4 class="text-lg font-bold mb-4 text-center text-kid-purple">💾 Actions</h4>
          <div class="space-y-2">
            <button onclick="clearDrawingCanvas()" class="w-full bg-gray-500 text-white py-2 rounded-lg font-bold">
              🗑️ Clear
            </button>
            <button onclick="saveDrawing()" class="w-full bg-kid-orange text-white py-2 rounded-lg font-bold">
              💾 Save Art
            </button>
            <button onclick="shareDrawing()" class="w-full bg-kid-pink text-white py-2 rounded-lg font-bold">
              📤 Share
            </button>
          </div>
        </div>
      </div>
      
      <!-- Canvas Area -->
      <div class="lg:col-span-3">
        <div class="bg-white rounded-2xl p-6 shadow-xl">
          <div class="text-center mb-4">
            <h3 class="text-2xl font-bold text-kid-blue">✏️ Drawing Canvas</h3>
            <p class="text-gray-600">Let your creativity flow!</p>
          </div>
          
          <div class="border-4 border-dashed border-gray-200 rounded-xl p-4 bg-gray-50">
            <canvas id="drawing-canvas" 
                    width="800" 
                    height="600" 
                    class="bg-white rounded-lg shadow-inner mx-auto block cursor-crosshair"
                    style="max-width: 100%; height: auto;">
            </canvas>
          </div>
          
          <div class="text-center mt-4">
            <div class="inline-flex items-center space-x-4 bg-gray-100 rounded-full px-6 py-3">
              <div class="flex items-center space-x-2">
                <div class="w-4 h-4 rounded-full border border-gray-400" 
                     style="background-color: ${currentTool.color}"></div>
                <span class="text-sm font-medium">${currentTool.tool}</span>
              </div>
              <div class="text-sm text-gray-500">Size: ${currentTool.size}px</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize canvas
  setTimeout(() => {
    initializeDrawingCanvas();
    newChallenge(); // Start with a random challenge
  }, 100);

  function initializeDrawingCanvas() {
    canvas = document.getElementById('drawing-canvas');
    ctx = canvas.getContext('2d');
    
    // Set up canvas
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Event listeners
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
  }

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
    
    ctx.lineWidth = currentTool.size;
    
    if (currentTool.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentTool.color;
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function stopDrawing() {
    if (isDrawing) {
      isDrawing = false;
      ctx.beginPath();
      app.playSound('click');
      app.awardStars('drawing', 1);
    }
  }

  function newChallenge() {
    currentChallenge = drawingChallenges[Math.floor(Math.random() * drawingChallenges.length)];
    
    document.getElementById('current-challenge').innerHTML = `
      <div class="text-4xl mb-2">${currentChallenge.emoji}</div>
      <div class="text-sm font-bold text-kid-blue">${currentChallenge.name}</div>
      <div class="text-xs text-gray-500 mt-1">${currentChallenge.hint}</div>
    `;
    
    app.playSound('success');
    app.awardStars('drawing', 1);
    app.speak(`New challenge: ${currentChallenge.name}. ${currentChallenge.hint}`);
  }

  function selectDrawingColor(color) {
    currentTool.color = color;
    document.getElementById('current-draw-color').style.backgroundColor = color;
    
    // Update color picker selection
    document.querySelectorAll('.color-picker').forEach(picker => {
      picker.classList.remove('ring-4', 'ring-kid-blue');
    });
    event.target.classList.add('ring-4', 'ring-kid-blue');
    
    app.playSound('click');
  }

  function setBrushSizeDrawing(size) {
    currentTool.size = parseInt(size);
    document.getElementById('brush-display').textContent = size;
  }

  function setDrawingTool(tool) {
    currentTool.tool = tool;
    
    // Update tool buttons
    document.getElementById('brush-tool').className = tool === 'brush'
      ? 'bg-kid-blue text-white py-2 px-3 rounded-lg font-bold text-sm'
      : 'bg-gray-400 text-white py-2 px-3 rounded-lg font-bold text-sm';
    
    document.getElementById('eraser-tool').className = tool === 'eraser'
      ? 'bg-kid-blue text-white py-2 px-3 rounded-lg font-bold text-sm'
      : 'bg-gray-400 text-white py-2 px-3 rounded-lg font-bold text-sm';
    
    // Update cursor
    canvas.style.cursor = tool === 'eraser' ? 'grab' : 'crosshair';
    
    app.playSound('click');
  }

  function drawShape(shapeType) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = 50;
    
    ctx.fillStyle = currentTool.color;
    ctx.strokeStyle = currentTool.color;
    ctx.lineWidth = 3;
    
    switch(shapeType) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(centerX, centerY, size, 0, Math.PI * 2);
        ctx.fill();
        break;
        
      case 'rectangle':
        ctx.fillRect(centerX - size, centerY - size, size * 2, size * 2);
        break;
        
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - size);
        ctx.lineTo(centerX - size, centerY + size);
        ctx.lineTo(centerX + size, centerY + size);
        ctx.closePath();
        ctx.fill();
        break;
        
      case 'star':
        drawStar(centerX, centerY, 5, size, size * 0.5);
        break;
    }
    
    app.playSound('success');
    app.awardStars('drawing', 2);
  }

  function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }

  function clearDrawingCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    app.playSound('click');
  }

  function saveDrawing() {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `my-artwork-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
    
    app.playSound('success');
    app.awardStars('drawing', 3);
    app.showConfetti();
  }

  function shareDrawing() {
    // Create a simple share message
    const message = `I just created amazing artwork in AI Kids Tutor! 🎨✨`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Artwork',
        text: message,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(message).then(() => {
        const notification = document.createElement('div');
        notification.innerHTML = '✨ Share message copied to clipboard!';
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.remove();
        }, 3000);
      });
    }
    
    app.playSound('success');
    app.awardStars('drawing', 2);
  }

  // Global functions for drawing module
  window.newChallenge = newChallenge;
  window.selectDrawingColor = selectDrawingColor;
  window.setBrushSizeDrawing = setBrushSizeDrawing;
  window.setDrawingTool = setDrawingTool;
  window.drawShape = drawShape;
  window.clearDrawingCanvas = clearDrawingCanvas;
  window.saveDrawing = saveDrawing;
  window.shareDrawing = shareDrawing;
}