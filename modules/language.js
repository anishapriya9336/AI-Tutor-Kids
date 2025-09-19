// Language Learning Module
function loadLanguageModule() {
  const languageData = {
    'Spanish': {
      flag: '🇪🇸',
      code: 'es',
      words: [
        { english: 'Hello', translation: 'Hola', emoji: '👋' },
        { english: 'Cat', translation: 'Gato', emoji: '🐱' },
        { english: 'Dog', translation: 'Perro', emoji: '🐶' },
        { english: 'Apple', translation: 'Manzana', emoji: '🍎' },
        { english: 'Water', translation: 'Agua', emoji: '💧' },
        { english: 'House', translation: 'Casa', emoji: '🏠' },
        { english: 'Sun', translation: 'Sol', emoji: '☀️' },
        { english: 'Moon', translation: 'Luna', emoji: '🌙' }
      ]
    },
    'French': {
      flag: '🇫🇷',
      code: 'fr',
      words: [
        { english: 'Hello', translation: 'Bonjour', emoji: '👋' },
        { english: 'Cat', translation: 'Chat', emoji: '🐱' },
        { english: 'Dog', translation: 'Chien', emoji: '🐶' },
        { english: 'Apple', translation: 'Pomme', emoji: '🍎' },
        { english: 'Water', translation: 'Eau', emoji: '💧' },
        { english: 'House', translation: 'Maison', emoji: '🏠' },
        { english: 'Sun', translation: 'Soleil', emoji: '☀️' },
        { english: 'Moon', translation: 'Lune', emoji: '🌙' }
      ]
    },
    'German': {
      flag: '🇩🇪',
      code: 'de',
      words: [
        { english: 'Hello', translation: 'Hallo', emoji: '👋' },
        { english: 'Cat', translation: 'Katze', emoji: '🐱' },
        { english: 'Dog', translation: 'Hund', emoji: '🐶' },
        { english: 'Apple', translation: 'Apfel', emoji: '🍎' },
        { english: 'Water', translation: 'Wasser', emoji: '💧' },
        { english: 'House', translation: 'Haus', emoji: '🏠' },
        { english: 'Sun', translation: 'Sonne', emoji: '☀️' },
        { english: 'Moon', translation: 'Mond', emoji: '🌙' }
      ]
    },
    'Italian': {
      flag: '🇮🇹',
      code: 'it',
      words: [
        { english: 'Hello', translation: 'Ciao', emoji: '👋' },
        { english: 'Cat', translation: 'Gatto', emoji: '🐱' },
        { english: 'Dog', translation: 'Cane', emoji: '🐶' },
        { english: 'Apple', translation: 'Mela', emoji: '🍎' },
        { english: 'Water', translation: 'Acqua', emoji: '💧' },
        { english: 'House', translation: 'Casa', emoji: '🏠' },
        { english: 'Sun', translation: 'Sole', emoji: '☀️' },
        { english: 'Moon', translation: 'Luna', emoji: '🌙' }
      ]
    }
  };

  let currentLanguage = 'Spanish';
  let currentIndex = 0;
  let gameMode = 'flashcards';

  const moduleBody = document.getElementById('module-body');
  
  moduleBody.innerHTML = `
    <div class="text-center mb-6">
      <!-- Language Selection -->
      <div class="flex justify-center space-x-4 mb-4">
        ${Object.keys(languageData).map(lang => `
          <button onclick="selectLanguage('${lang}')" 
                  id="lang-${lang}" 
                  class="${lang === currentLanguage ? 'bg-kid-blue text-white' : 'bg-gray-200 text-gray-700'} px-4 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-all">
            ${languageData[lang].flag} ${lang}
          </button>
        `).join('')}
      </div>
      
      <!-- Mode Selection -->
      <div class="flex justify-center space-x-4 mb-6">
        <button onclick="setLanguageMode('flashcards')" id="lang-flashcards-btn" class="bg-kid-blue text-white px-6 py-3 rounded-full font-bold shadow-lg">
          📚 Flashcards
        </button>
        <button onclick="setLanguageMode('matching')" id="lang-matching-btn" class="bg-gray-400 text-white px-6 py-3 rounded-full font-bold shadow-lg">
          🔗 Word Match
        </button>
        <button onclick="setLanguageMode('listening')" id-lang-listening-btn" class="bg-gray-400 text-white px-6 py-3 rounded-full font-bold shadow-lg">
          👂 Listen & Learn
        </button>
      </div>
    </div>
    
    <div id="language-content"></div>
  `;

  function selectLanguage(language) {
    currentLanguage = language;
    currentIndex = 0;
    
    // Update language buttons
    Object.keys(languageData).forEach(lang => {
      const btn = document.getElementById(`lang-${lang}`);
      btn.className = lang === language 
        ? 'bg-kid-blue text-white px-4 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-all'
        : 'bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-all';
    });
    
    // Reload current mode with new language
    if (gameMode === 'flashcards') {
      showLanguageFlashcards();
    } else if (gameMode === 'matching') {
      showWordMatching();
    } else {
      showListeningGame();
    }
    
    app.playSound('click');
  }

  function setLanguageMode(mode) {
    gameMode = mode;
    
    ['flashcards', 'matching', 'listening'].forEach(m => {
      const btnId = `lang-${m}-btn`;
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.className = m === mode 
          ? 'bg-kid-blue text-white px-6 py-3 rounded-full font-bold shadow-lg'
          : 'bg-gray-400 text-white px-6 py-3 rounded-full font-bold shadow-lg';
      }
    });
    
    switch(mode) {
      case 'flashcards':
        showLanguageFlashcards();
        break;
      case 'matching':
        showWordMatching();
        break;
      case 'listening':
        showListeningGame();
        break;
    }
  }

  function showLanguageFlashcards() {
    const content = document.getElementById('language-content');
    const words = languageData[currentLanguage].words;
    const word = words[currentIndex];
    
    content.innerHTML = `
      <div class="max-w-md mx-auto">
        <div class="text-center mb-6">
          <div class="text-lg text-gray-600">${currentIndex + 1} of ${words.length}</div>
          <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div class="bg-kid-blue h-2 rounded-full transition-all duration-300" style="width: ${((currentIndex + 1) / words.length) * 100}%"></div>
          </div>
        </div>
        
        <div class="card-hover bg-gradient-to-br from-kid-purple to-pink-500 rounded-3xl p-12 text-white text-center shadow-xl mb-6">
          <div class="text-6xl mb-4">${languageData[currentLanguage].flag}</div>
          <div class="text-8xl mb-4">${word.emoji}</div>
          <div class="text-3xl font-bold mb-2">${word.english}</div>
          <div class="text-4xl font-bold text-yellow-200 mb-4">${word.translation}</div>
          
          <div class="flex justify-center space-x-4">
            <button onclick="pronounceEnglish()" class="bg-white bg-opacity-20 px-4 py-2 rounded-full font-bold hover:bg-opacity-30 transition-all">
              🇺🇸 English
            </button>
            <button onclick="pronounceTranslation()" class="bg-white bg-opacity-20 px-4 py-2 rounded-full font-bold hover:bg-opacity-30 transition-all">
              ${languageData[currentLanguage].flag} ${currentLanguage}
            </button>
          </div>
        </div>
        
        <div class="flex justify-between">
          <button onclick="previousWord()" ${currentIndex === 0 ? 'disabled' : ''} 
                  class="bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-white px-6 py-3 rounded-full font-bold shadow-lg">
            ← Previous
          </button>
          <button onclick="nextWord()" ${currentIndex === words.length - 1 ? 'disabled' : ''} 
                  class="bg-kid-green hover:bg-green-600 disabled:opacity-50 text-white px-6 py-3 rounded-full font-bold shadow-lg">
            Next →
          </button>
        </div>
      </div>
    `;
  }

  function showWordMatching() {
    const content = document.getElementById('language-content');
    const words = languageData[currentLanguage].words.slice(0, 4); // Use first 4 words
    const shuffledTranslations = [...words].sort(() => Math.random() - 0.5);
    
    content.innerHTML = `
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-8">
          <h3 class="text-3xl font-bold text-kid-blue mb-2">Word Matching! ${languageData[currentLanguage].flag}</h3>
          <p class="text-gray-600">Drag the English words to their ${currentLanguage} translations</p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- English Words -->
          <div class="space-y-4">
            <h4 class="text-2xl font-bold text-center text-kid-purple">English 🇺🇸</h4>
            ${words.map(word => `
              <div class="english-word bg-blue-100 border-2 border-blue-300 rounded-2xl p-6 text-center cursor-move shadow-lg hover:scale-105 transition-all" 
                   data-english="${word.english}" 
                   data-translation="${word.translation}">
                <div class="text-4xl mb-2">${word.emoji}</div>
                <div class="text-xl font-bold text-blue-800">${word.english}</div>
              </div>
            `).join('')}
          </div>
          
          <!-- Translation Drop Zones -->
          <div class="space-y-4">
            <h4 class="text-2xl font-bold text-center text-kid-purple">${currentLanguage} ${languageData[currentLanguage].flag}</h4>
            ${shuffledTranslations.map(word => `
              <div class="translation-drop border-4 border-dashed border-gray-300 rounded-2xl p-6 text-center min-h-24 transition-all duration-200" 
                   data-translation="${word.translation}"
                   data-english="${word.english}"
                   ondragover="allowDrop(event)" 
                   ondrop="dropWord(event)">
                <div class="text-xl font-bold text-gray-600">${word.translation}</div>
                <div class="text-sm text-gray-500 mt-2">Drop English word here</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="text-center mt-8">
          <button onclick="resetWordMatching()" class="bg-kid-orange text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:scale-105 transition-all">
            🔄 New Game
          </button>
        </div>
      </div>
    `;
    
    // Make English words draggable
    document.querySelectorAll('.english-word').forEach(word => {
      makeDraggable(word);
    });
  }

  function showListeningGame() {
    const content = document.getElementById('language-content');
    const words = languageData[currentLanguage].words;
    const currentWord = words[Math.floor(Math.random() * words.length)];
    const options = [currentWord];
    
    // Add 3 random wrong options
    while (options.length < 4) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      if (!options.includes(randomWord)) {
        options.push(randomWord);
      }
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    content.innerHTML = `
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-8">
          <h3 class="text-3xl font-bold text-kid-blue mb-4">Listen & Learn! ${languageData[currentLanguage].flag}</h3>
          <p class="text-gray-600">Listen to the word and choose the correct English translation</p>
        </div>
        
        <div class="bg-white rounded-3xl p-8 shadow-xl mb-8">
          <div class="text-center mb-8">
            <div class="text-8xl mb-4">${currentWord.emoji}</div>
            <button onclick="playListeningWord()" class="bg-kid-blue text-white px-12 py-6 rounded-full font-bold text-2xl shadow-lg hover:scale-110 transition-all">
              🔊 Listen
            </button>
            <div class="mt-4 text-lg text-gray-600">Click to hear the word in ${currentLanguage}</div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            ${options.map(option => `
              <button class="listening-option bg-gray-50 border-4 border-gray-200 rounded-2xl p-4 text-center hover:scale-105 transition-all shadow-md" 
                      onclick="selectListeningAnswer('${option.english}', '${currentWord.english}')">
                <div class="text-3xl mb-2">${option.emoji}</div>
                <div class="text-lg font-bold">${option.english}</div>
              </button>
            `).join('')}
          </div>
        </div>
        
        <div id="listening-result" class="text-center text-2xl font-bold mb-6"></div>
        
        <div class="text-center">
          <button onclick="newListeningGame()" class="bg-kid-purple text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:scale-105 transition-all">
            🔄 New Word
          </button>
        </div>
      </div>
    `;
    
    // Store current word for checking
    content.dataset.currentWord = currentWord.english;
    content.dataset.currentTranslation = currentWord.translation;
  }

  // Global functions for language module
  window.selectLanguage = selectLanguage;
  window.setLanguageMode = setLanguageMode;
  
  window.nextWord = function() {
    const words = languageData[currentLanguage].words;
    if (currentIndex < words.length - 1) {
      currentIndex++;
      showLanguageFlashcards();
      app.playSound('click');
    }
  };
  
  window.previousWord = function() {
    if (currentIndex > 0) {
      currentIndex--;
      showLanguageFlashcards();
      app.playSound('click');
    }
  };
  
  window.pronounceEnglish = function() {
    const word = languageData[currentLanguage].words[currentIndex];
    app.speak(word.english, 'en');
    app.playSound('click');
  };
  
  window.pronounceTranslation = function() {
    const word = languageData[currentLanguage].words[currentIndex];
    app.speak(word.translation, languageData[currentLanguage].code);
    app.awardStars('language', 1);
    app.playSound('success');
  };
  
  window.dropWord = function(ev) {
    ev.preventDefault();
    const dropZone = ev.currentTarget;
    const draggedElements = document.querySelectorAll('.english-word[style*="translate"]');
    const draggedElement = draggedElements[draggedElements.length - 1]; // Get the most recently dragged element
    
    if (draggedElement && draggedElement.dataset.translation === dropZone.dataset.translation) {
      dropZone.innerHTML = `
        <div class="text-4xl mb-2">${draggedElement.querySelector('.text-4xl').textContent}</div>
        <div class="text-lg font-bold text-green-600">✅ ${draggedElement.dataset.english} = ${dropZone.dataset.translation}</div>
      `;
      dropZone.classList.add('bg-green-100', 'border-green-500');
      draggedElement.style.display = 'none';
      
      app.playSound('success');
      app.awardStars('language', 2);
      
      // Check if all matches are complete
      const remainingWords = document.querySelectorAll('.english-word[style="display: none;"]');
      if (remainingWords.length === 4) {
        setTimeout(() => {
          app.showConfetti();
          app.awardStars('language', 3);
        }, 500);
      }
    } else {
      app.playSound('error');
      // Reset word position
      if (draggedElement) {
        draggedElement.style.transform = '';
      }
    }
  };
  
  window.resetWordMatching = function() {
    showWordMatching();
    app.playSound('click');
  };
  
  window.playListeningWord = function() {
    const content = document.getElementById('language-content');
    const translation = content.dataset.currentTranslation;
    app.speak(translation, languageData[currentLanguage].code);
  };
  
  window.selectListeningAnswer = function(selected, correct) {
    const result = document.getElementById('listening-result');
    const options = document.querySelectorAll('.listening-option');
    
    options.forEach(option => {
      option.style.pointerEvents = 'none';
      if (option.textContent.includes(correct)) {
        option.classList.add('bg-green-100', 'border-green-500');
      } else if (option.textContent.includes(selected) && selected !== correct) {
        option.classList.add('bg-red-100', 'border-red-500');
      }
    });
    
    if (selected === correct) {
      result.innerHTML = `<div class="text-green-600">🎉 Correct! Great listening!</div>`;
      app.playSound('success');
      app.awardStars('language', 3);
      app.showConfetti();
      app.speak('Correct! Great listening skills!');
    } else {
      result.innerHTML = `<div class="text-red-500">Try again! The correct answer was "${correct}"</div>`;
      app.playSound('error');
      app.speak(`Try again! The correct answer was ${correct}`);
    }
  };
  
  window.newListeningGame = function() {
    showListeningGame();
    app.playSound('click');
  };

  // Initialize with flashcards
  setLanguageMode('flashcards');
}