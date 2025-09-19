// Main App Logic
class KidsTutor {
  constructor() {
    this.soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
    this.progress = JSON.parse(localStorage.getItem('progress')) || {};
    this.totalStars = this.calculateTotalStars();
    this.currentModule = null;
    this.init();
  }

  init() {
    this.updateProgressDisplay();
    this.updateSoundToggle();
    
    // Add click animations to module cards
    document.querySelectorAll('.module-card').forEach(card => {
      card.addEventListener('click', (e) => {
        this.animateClick(e.target);
      });
    });
  }

  calculateTotalStars() {
    let total = 0;
    Object.values(this.progress).forEach(moduleData => {
      if (moduleData.stars) total += moduleData.stars;
    });
    return total;
  }

  updateProgressDisplay() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const maxStars = 80; // 8 modules × 10 stars each
    const percentage = Math.min((this.totalStars / maxStars) * 100, 100);
    
    progressBar.style.width = percentage + '%';
    progressText.textContent = this.totalStars + ' ⭐';
  }

  updateSoundToggle() {
    const soundToggle = document.getElementById('sound-toggle');
    const soundStatus = document.getElementById('sound-status');
    soundToggle.textContent = this.soundEnabled ? '🔊' : '🔇';
    soundToggle.title = this.soundEnabled ? 'Sound On' : 'Sound Off';
    if (soundStatus) {
      soundStatus.textContent = this.soundEnabled ? 'Sound On' : 'Sound Off';
      soundStatus.className = this.soundEnabled 
        ? 'text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full shadow-sm'
        : 'text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full shadow-sm';
    }
  }

  animateClick(element) {
    element.classList.add('animate-pulse');
    setTimeout(() => {
      element.classList.remove('animate-pulse');
    }, 200);
  }

  playSound(type) {
    if (!this.soundEnabled) return;
    
    try {
      // Create audio context for sound effects
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      const sounds = {
        click: { freq: 800, duration: 0.15, type: 'sine' },
        success: { freq: 1000, duration: 0.4, type: 'triangle' },
        error: { freq: 300, duration: 0.3, type: 'sawtooth' },
        reward: { freq: 1200, duration: 0.6, type: 'sine' }
      };
      
      const sound = sounds[type] || sounds.click;
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = sound.freq;
      oscillator.type = sound.type;
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + sound.duration);
      
      // Add visual feedback for sound
      this.showSoundFeedback(type);
    } catch (error) {
      console.log('Audio not available:', error);
    }
  }

  showSoundFeedback(type) {
    const feedback = document.createElement('div');
    const icons = {
      click: '🔊',
      success: '🎉',
      error: '❌',
      reward: '⭐'
    };
    
    feedback.innerHTML = icons[type] || '🔊';
    feedback.className = 'fixed top-4 left-4 text-2xl animate-bounce z-50 pointer-events-none';
    document.body.appendChild(feedback);
    
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.remove();
      }
    }, 1000);
  }

  showConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.zIndex = '9999';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          if (confetti.parentNode) {
            confetti.remove();
          }
        }, 3000);
      }, i * 50);
    }
  }

  awardStars(moduleId, stars) {
    if (!this.progress[moduleId]) {
      this.progress[moduleId] = { stars: 0, completed: [] };
    }
    
    this.progress[moduleId].stars += stars;
    this.totalStars += stars;
    
    localStorage.setItem('progress', JSON.stringify(this.progress));
    this.updateProgressDisplay();
    
    // Update module stars display
    const moduleStars = document.getElementById('module-stars');
    if (moduleStars) {
      moduleStars.textContent = `⭐ ${this.progress[moduleId].stars}`;
    }
    
    this.playSound('reward');
    this.showConfetti();
  }

  speak(text, language = 'en') {
    if (!this.soundEnabled) return;
    
    try {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        utterance.rate = 0.7;
        utterance.pitch = 1.3;
        utterance.volume = 0.8;
        
        // Add visual feedback for speech
        const speechIndicator = document.createElement('div');
        speechIndicator.innerHTML = '🗣️ Speaking...';
        speechIndicator.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse';
        document.body.appendChild(speechIndicator);
        
        utterance.onend = () => {
          if (speechIndicator.parentNode) {
            speechIndicator.remove();
          }
        };
        
        utterance.onerror = () => {
          if (speechIndicator.parentNode) {
            speechIndicator.remove();
          }
        };
        
        speechSynthesis.speak(utterance);
      }, 100);
    } catch (error) {
      console.log('Speech synthesis not available:', error);
    }
  }
}

// Initialize app
const app = new KidsTutor();

// Global functions
function showModule(moduleId) {
  app.playSound('click');
  app.currentModule = moduleId;
  
  document.getElementById('main-menu').classList.add('hidden');
  document.getElementById('module-content').classList.remove('hidden');
  
  const title = document.getElementById('module-title');
  const moduleBody = document.getElementById('module-body');
  const moduleStars = document.getElementById('module-stars');
  
  // Get current stars for this module
  const currentStars = app.progress[moduleId]?.stars || 0;
  moduleStars.textContent = `⭐ ${currentStars}`;
  
  // Announce module entry
  const moduleNames = {
    'alphabet': 'Alphabet Learning',
    'numbers': 'Numbers and Counting',
    'shapes': 'Shapes Learning',
    'colors': 'Colors Learning',
    'language': 'Language Learning',
    'quiz': 'Fun Quiz Time',
    'stories': 'Story Time',
    'drawing': 'Drawing Canvas'
  };
  
  setTimeout(() => {
    app.speak(`Welcome to ${moduleNames[moduleId]}! Let's learn and have fun!`);
  }, 500);
  
  // Load module content
  switch(moduleId) {
    case 'alphabet':
      title.textContent = 'Alphabet Learning 🔤';
      loadAlphabetModule();
      break;
    case 'numbers':
      title.textContent = 'Numbers & Counting 🔢';
      loadNumbersModule();
      break;
    case 'shapes':
      title.textContent = 'Shapes Learning 🔺';
      loadShapesModule();
      break;
    case 'colors':
      title.textContent = 'Colors Learning 🎨';
      loadColorsModule();
      break;
    case 'language':
      title.textContent = 'Language Learning 🌍';
      loadLanguageModule();
      break;
    case 'quiz':
      title.textContent = 'Fun Quiz Time 🧩';
      loadQuizModule();
      break;
    case 'stories':
      title.textContent = 'Story Time 📚';
      loadStoriesModule();
      break;
    case 'drawing':
      title.textContent = 'Drawing Canvas ✏️';
      loadDrawingModule();
      break;
  }
}

function backToMenu() {
  app.playSound('click');
  document.getElementById('main-menu').classList.remove('hidden');
  document.getElementById('module-content').classList.add('hidden');
  app.currentModule = null;
}

function toggleSound() {
  app.soundEnabled = !app.soundEnabled;
  localStorage.setItem('soundEnabled', app.soundEnabled);
  app.updateSoundToggle();
  app.playSound('click');
  
  // Announce sound status
  setTimeout(() => {
    app.speak(app.soundEnabled ? 'Sound is now on' : 'Sound is now off');
  }, 200);
}

// Utility function for drag and drop
function makeDraggable(element) {
  let isDragging = false;
  let startX, startY, initialX, initialY;
  
  element.style.cursor = 'grab';
  element.style.userSelect = 'none';
  
  element.addEventListener('mousedown', dragStart);
  element.addEventListener('touchstart', dragStart);
  
  function dragStart(e) {
    isDragging = true;
    element.style.cursor = 'grabbing';
    element.style.zIndex = '1000';
    
    if (e.type === 'mousedown') {
      startX = e.clientX;
      startY = e.clientY;
    } else {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }
    
    const rect = element.getBoundingClientRect();
    initialX = rect.left;
    initialY = rect.top;
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);
  }
  
  function drag(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    
    let currentX, currentY;
    if (e.type === 'mousemove') {
      currentX = e.clientX;
      currentY = e.clientY;
    } else {
      currentX = e.touches[0].clientX;
      currentY = e.touches[0].clientY;
    }
    
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    
    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  }
  
  function dragEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    element.style.cursor = 'grab';
    element.style.zIndex = 'auto';
    
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('touchend', dragEnd);
  }
}