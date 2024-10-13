// HTML Elements
const chatOutput = document.querySelector('.output');
const userInput = document.querySelector('input');
const micButton = document.getElementById('mic-btn');

// Simulated AI responses for demo purposes
const assistantResponses = {
  "hello": "Hi! How can I assist you today?",
  "how are you": "I'm doing great, thanks for asking! How about you?",
  "what is your name": "I'm your AI-powered assistant. Nice to meet you!",
  "open google": "Sure! Here's the link to Google: <a href='https://www.google.com' target='_blank'>Google</a>",
  "search for something": "You can search for anything on Google: <a href='https://www.google.com' target='_blank'>Google Search</a>"
};

// Speech recognition setup (Web Speech API)
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = false; // We want only final results, not partial

// Listen for user input via text (Enter key)
userInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    handleUserMessage(userInput.value);
  }
});

// Handle mic button click for voice input
micButton.addEventListener('click', function() {
  recognition.start();  // Start listening for voice input
});

// Handle speech recognition results
recognition.addEventListener('result', function(event) {
  const transcript = event.results[0][0].transcript.toLowerCase();
  handleUserMessage(transcript);  // Treat voice input as a message
});

// Handle user input message (Text or Voice)
function handleUserMessage(message) {
  // Append the user message to the chatbox
  appendMessage('user', message);
  
  // Clean the user input field
  userInput.value = '';

  // Generate assistant response
  setTimeout(() => {
    generateAssistantResponse(message.toLowerCase());
  }, 1000);
}

// Append user or assistant message to the output
function appendMessage(sender, message) {
  const messageElement = document.createElement('p');
  messageElement.classList.add(sender);
  messageElement.innerHTML = message;
  chatOutput.appendChild(messageElement);
  chatOutput.scrollTop = chatOutput.scrollHeight;  // Scroll down to latest message
}

// Generate assistant response
function generateAssistantResponse(userMessage) {
  let response = assistantResponses[userMessage];

  if (response) {
    appendMessage('assistant', response);
  } else {
    // If the assistant doesn't know the answer, provide a Google search link
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(userMessage)}`;
    appendMessage('assistant', `I'm not sure about that. You can search for more information <a href='${searchUrl}' target='_blank'>here</a>.`);
  }
}

// Error handling for speech recognition
recognition.addEventListener('error', (e) => {
  appendMessage('assistant', 'Sorry, I couldn\'t understand that. Please try again.');
});