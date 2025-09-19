// Stories Module
function loadStoriesModule() {
  const storyThemes = [
    { name: 'Adventure', emoji: '🗺️', color: 'from-green-400 to-blue-500' },
    { name: 'Animals', emoji: '🦁', color: 'from-yellow-400 to-orange-500' },
    { name: 'Magic', emoji: '✨', color: 'from-purple-400 to-pink-500' },
    { name: 'Space', emoji: '🚀', color: 'from-indigo-400 to-purple-600' },
    { name: 'Underwater', emoji: '🐠', color: 'from-blue-400 to-cyan-500' },
    { name: 'Forest', emoji: '🌲', color: 'from-green-500 to-emerald-600' }
  ];

  const characters = [
    { name: 'Brave Lion', emoji: '🦁' },
    { name: 'Friendly Robot', emoji: '🤖' },
    { name: 'Magic Unicorn', emoji: '🦄' },
    { name: 'Wise Owl', emoji: '🦉' },
    { name: 'Happy Dolphin', emoji: '🐬' },
    { name: 'Clever Fox', emoji: '🦊' },
    { name: 'Kind Dragon', emoji: '🐉' },
    { name: 'Funny Monkey', emoji: '🐵' }
  ];

  let selectedTheme = null;
  let selectedCharacters = [];
  let currentStory = null;
  let isReading = false;

  const moduleBody = document.getElementById('module-body');
  
  moduleBody.innerHTML = `
    <div id="stories-content">
      <div class="text-center mb-8">
        <h3 class="text-3xl font-bold text-kid-blue mb-2">Create Your Story! 📚</h3>
        <p class="text-gray-600">Choose a theme and characters for your magical story</p>
      </div>
      
      <!-- Step 1: Theme Selection -->
      <div class="mb-8">
        <h4 class="text-2xl font-bold text-center mb-6 text-kid-purple">Step 1: Pick a Theme</h4>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          ${storyThemes.map(theme => `
            <button class="theme-card bg-gradient-to-br ${theme.color} text-white p-6 rounded-2xl text-center cursor-pointer shadow-lg hover:scale-105 transition-all" 
                    onclick="selectTheme('${theme.name}')">
              <div class="text-4xl mb-2">${theme.emoji}</div>
              <div class="text-lg font-bold">${theme.name}</div>
            </button>
          `).join('')}
        </div>
        <div id="selected-theme" class="text-center mt-4 text-xl font-bold text-green-600"></div>
      </div>
      
      <!-- Step 2: Character Selection -->
      <div class="mb-8">
        <h4 class="text-2xl font-bold text-center mb-6 text-kid-purple">Step 2: Choose Characters (Pick 2-3)</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          ${characters.map(character => `
            <button class="character-card bg-white border-4 border-gray-200 p-4 rounded-2xl text-center cursor-pointer shadow-lg hover:scale-105 transition-all" 
                    onclick="selectCharacter('${character.name}', '${character.emoji}')"
                    data-character="${character.name}">
              <div class="text-3xl mb-2">${character.emoji}</div>
              <div class="text-sm font-bold">${character.name}</div>
            </button>
          `).join('')}
        </div>
        <div id="selected-characters" class="text-center mt-4 text-lg"></div>
      </div>
      
      <!-- Step 3: Generate Story -->
      <div class="text-center mb-8">
        <button onclick="generateStory()" id="generate-btn" 
                class="bg-kid-green text-white px-12 py-6 rounded-full font-bold text-2xl shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled>
          ✨ Create My Story!
        </button>
      </div>
    </div>
    
    <!-- Story Display -->
    <div id="story-display" class="hidden"></div>
  `;

  function selectTheme(themeName) {
    selectedTheme = themeName;
    const theme = storyThemes.find(t => t.name === themeName);
    
    // Update theme cards
    document.querySelectorAll('.theme-card').forEach(card => {
      card.classList.remove('ring-4', 'ring-white');
    });
    event.target.closest('.theme-card').classList.add('ring-4', 'ring-white');
    
    document.getElementById('selected-theme').innerHTML = `${theme.emoji} Selected: ${themeName}`;
    updateGenerateButton();
    app.playSound('click');
  }

  function selectCharacter(characterName, emoji) {
    const card = event.target.closest('.character-card');
    
    if (selectedCharacters.find(c => c.name === characterName)) {
      // Remove character
      selectedCharacters = selectedCharacters.filter(c => c.name !== characterName);
      card.classList.remove('bg-kid-blue', 'text-white', 'border-kid-blue');
      card.classList.add('bg-white', 'text-gray-800', 'border-gray-200');
    } else if (selectedCharacters.length < 3) {
      // Add character
      selectedCharacters.push({ name: characterName, emoji: emoji });
      card.classList.add('bg-kid-blue', 'text-white', 'border-kid-blue');
      card.classList.remove('bg-white', 'text-gray-800', 'border-gray-200');
    }
    
    const display = document.getElementById('selected-characters');
    if (selectedCharacters.length > 0) {
      display.innerHTML = `Selected: ${selectedCharacters.map(c => `${c.emoji} ${c.name}`).join(', ')}`;
    } else {
      display.innerHTML = '';
    }
    
    updateGenerateButton();
    app.playSound('click');
  }

  function updateGenerateButton() {
    const generateBtn = document.getElementById('generate-btn');
    generateBtn.disabled = !selectedTheme || selectedCharacters.length < 2;
  }

  function generateStory() {
    if (!selectedTheme || selectedCharacters.length < 2) return;
    
    // Generate a simple story based on selections
    const stories = generateStoryContent();
    currentStory = stories[Math.floor(Math.random() * stories.length)];
    
    displayStory();
    app.playSound('success');
    app.awardStars('stories', 3);
  }

  function generateStoryContent() {
    const theme = selectedTheme;
    const chars = selectedCharacters;
    const mainChar = chars[0];
    const friend = chars[1];
    const helper = chars[2] || chars[0];
    
    const storyTemplates = {
      'Adventure': [
        `Once upon a time, ${mainChar.name} ${mainChar.emoji} wanted to explore the world. ${mainChar.name} met ${friend.name} ${friend.emoji} and together they discovered a hidden treasure! With the help of ${helper.name} ${helper.emoji}, they learned that the real treasure was their friendship. The end! 🌟`,
        
        `${mainChar.name} ${mainChar.emoji} was looking for an adventure when they heard about a mysterious mountain. ${friend.name} ${friend.emoji} joined the journey, and they climbed higher and higher! At the top, ${helper.name} ${helper.emoji} showed them the most beautiful view in the world. They celebrated their amazing adventure! 🏔️`
      ],
      
      'Animals': [
        `In a peaceful meadow, ${mainChar.name} ${mainChar.emoji} lived happily with all the forest animals. One day, ${friend.name} ${friend.emoji} got lost in the woods! ${mainChar.name} and ${helper.name} ${helper.emoji} worked together to find their friend. They followed the sounds and found ${friend.name} safe and sound. All the animals celebrated with a big party! 🎉`,
        
        `${mainChar.name} ${mainChar.emoji} loved to help other animals in the forest. When ${friend.name} ${friend.emoji} couldn't find food for winter, ${mainChar.name} knew just what to do! With ${helper.name} ${helper.emoji}, they gathered lots of delicious food. Everyone shared and had a wonderful feast together! 🍎`
      ],
      
      'Magic': [
        `${mainChar.name} ${mainChar.emoji} found a magical wand that could make wishes come true! When ${friend.name} ${friend.emoji} wished to fly, sparkles filled the air! ${helper.name} ${helper.emoji} taught them that the most powerful magic is kindness. Together, they used their magic to help everyone in their village! ✨`,
        
        `In an enchanted castle, ${mainChar.name} ${mainChar.emoji} discovered a magic book. The book told ${friend.name} ${friend.emoji} about a spell to make flowers bloom everywhere! With ${helper.name} ${helper.emoji}'s wisdom, they learned the spell and filled the world with beautiful colors and sweet smells! 🌸`
      ],
      
      'Space': [
        `${mainChar.name} ${mainChar.emoji} built a rocket ship and flew to the moon! There, they met ${friend.name} ${friend.emoji} who lived on a star. Together with ${helper.name} ${helper.emoji}, they explored the galaxy and discovered planets made of candy! They had the sweetest adventure in space! 🪐`,
        
        `Astronaut ${mainChar.name} ${mainChar.emoji} was floating in space when they saw ${friend.name} ${friend.emoji} waving from Mars! They flew over in their spaceship and met ${helper.name} ${helper.emoji}, who showed them how to jump really high in low gravity! They bounced and played among the stars! 🌟`
      ],
      
      'Underwater': [
        `Deep in the ocean, ${mainChar.name} ${mainChar.emoji} loved swimming with sea creatures. ${friend.name} ${friend.emoji} showed them a coral reef full of colorful fish! ${helper.name} ${helper.emoji} taught them how to speak with whales. They sang beautiful songs together underwater! 🐋`,
        
        `${mainChar.name} ${mainChar.emoji} found a message in a bottle while swimming. ${friend.name} ${friend.emoji} helped decode the message - it was a treasure map! With ${helper.name} ${helper.emoji} as their guide, they found a chest full of pearls and shared them with all their ocean friends! 🏴‍☠️`
      ],
      
      'Forest': [
        `In a magical forest, ${mainChar.name} ${mainChar.emoji} was the guardian of all the trees. When ${friend.name} ${friend.emoji} got scared during a storm, ${mainChar.name} showed them that trees protect everyone! ${helper.name} ${helper.emoji} taught them how trees talk to each other through their roots. The forest felt like home! 🌳`,
        
        `${mainChar.name} ${mainChar.emoji} discovered a secret path in the forest that led to a clearing full of friendly woodland creatures. ${friend.name} ${friend.emoji} was amazed by all the different animals! ${helper.name} ${helper.emoji} organized a forest dance party, and everyone danced until the stars came out! 💃`
      ]
    };
    
    return storyTemplates[theme] || storyTemplates['Adventure'];
  }

  function displayStory() {
    const content = document.getElementById('stories-content');
    const storyDisplay = document.getElementById('story-display');
    
    content.classList.add('hidden');
    storyDisplay.classList.remove('hidden');
    
    storyDisplay.innerHTML = `
      <div class="max-w-3xl mx-auto">
        <div class="bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl p-8 text-white text-center shadow-xl mb-8">
          <div class="text-6xl mb-4">📖</div>
          <div class="text-3xl font-bold mb-4">Your Magical Story!</div>
          <div class="text-lg opacity-90">Theme: ${selectedTheme} | Characters: ${selectedCharacters.map(c => c.emoji).join(' ')}</div>
        </div>
        
        <div class="bg-white rounded-3xl p-8 shadow-xl mb-8">
          <div class="text-2xl leading-relaxed text-gray-800" id="story-text">
            ${currentStory}
          </div>
        </div>
        
        <div class="flex justify-center space-x-4 mb-8">
          <button onclick="readStoryAloud()" id="read-btn" 
                  class="bg-kid-blue text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:scale-105 transition-all">
            ${isReading ? '⏸️ Pause' : '🔊 Read Aloud'}
          </button>
          <button onclick="createNewStory()" 
                  class="bg-kid-green text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:scale-105 transition-all">
            ✨ New Story
          </button>
          <button onclick="backToStoryCreator()" 
                  class="bg-gray-500 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:scale-105 transition-all">
            ← Back
          </button>
        </div>
        
        <div class="text-center">
          <div class="bg-yellow-100 border-2 border-yellow-300 rounded-2xl p-6 inline-block">
            <div class="text-2xl mb-2">🌟 Story Complete! 🌟</div>
            <div class="text-lg font-bold text-yellow-800">You've earned story stars!</div>
          </div>
        </div>
      </div>
    `;
  }

  function readStoryAloud() {
    if (isReading) {
      speechSynthesis.cancel();
      isReading = false;
      document.getElementById('read-btn').innerHTML = '🔊 Read Aloud';
      app.playSound('click');
    } else {
      if (!app.soundEnabled) {
        const notification = document.createElement('div');
        notification.innerHTML = '🔇 Please enable sound to hear the story!';
        notification.className = 'fixed top-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.remove();
        }, 3000);
        app.playSound('error');
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(currentStory);
      utterance.rate = 0.6;
      utterance.pitch = 1.2;
      utterance.volume = 0.8;
      
      utterance.onstart = () => {
        isReading = true;
        document.getElementById('read-btn').innerHTML = '⏸️ Pause Reading';
        app.playSound('success');
      };
      
      utterance.onend = () => {
        isReading = false;
        document.getElementById('read-btn').innerHTML = '🔊 Read Aloud';
        app.awardStars('stories', 1);
        app.playSound('reward');
      };
      
      speechSynthesis.speak(utterance);
    }
  }

  function createNewStory() {
    selectedTheme = null;
    selectedCharacters = [];
    currentStory = null;
    
    const content = document.getElementById('stories-content');
    const storyDisplay = document.getElementById('story-display');
    
    // Reset selections
    document.querySelectorAll('.theme-card').forEach(card => {
      card.classList.remove('ring-4', 'ring-white');
    });
    
    document.querySelectorAll('.character-card').forEach(card => {
      card.classList.remove('bg-kid-blue', 'text-white', 'border-kid-blue');
      card.classList.add('bg-white', 'text-gray-800', 'border-gray-200');
    });
    
    document.getElementById('selected-theme').innerHTML = '';
    document.getElementById('selected-characters').innerHTML = '';
    updateGenerateButton();
    
    content.classList.remove('hidden');
    storyDisplay.classList.add('hidden');
    
    app.playSound('click');
  }

  function backToStoryCreator() {
    createNewStory();
  }

  // Global functions for stories module
  window.selectTheme = selectTheme;
  window.selectCharacter = selectCharacter;
  window.generateStory = generateStory;
  window.readStoryAloud = readStoryAloud;
  window.createNewStory = createNewStory;
  window.backToStoryCreator = backToStoryCreator;
}