const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const errorMessage = document.getElementById('errorMessage');

// AWS Lambda Function URL
const GATEWAY_URL = 'https://vdc8sf6h7c.execute-api.us-east-2.amazonaws.com/default/StycoBot';

// Clear command keywords
const CLEAR_COMMANDS = ['clear', 'reset', 'start over', 'new chat', 'clear chat', 'clear all'];

// Original welcome message
const WELCOME_MESSAGE = "Hello! I'm StycoBot. Ask me about Ruzan's age, favorite food or favorite quote.";

function isClearCommand(message) {
    return CLEAR_COMMANDS.some(cmd => message.toLowerCase().includes(cmd));
}

function clearChat() {
    // Remove all messages
    while (chatMessages.children.length > 0) {
        chatMessages.removeChild(chatMessages.lastChild);
    }
    // Add clear confirmation
    addMessage("Chat cleared!", false);
    // Reprint welcome message
    addMessage(WELCOME_MESSAGE, false);
}

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'chatbot-bubble';
    bubble.textContent = message;
    
    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'chatbot-message bot';
    indicator.innerHTML = `
        <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    indicator.id = 'typingIndicator';
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

async function sendMessage(message) {
    try {
        showTypingIndicator();
        
        const response = await fetch(GATEWAY_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'origin': 'https://ruzansasuri.com'
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error('Failed to get response');
        }

        const data = await response.json();
        removeTypingIndicator();
        addMessage(data.response);
    } catch (error) {
        removeTypingIndicator();
        errorMessage.textContent = 'Sorry, there was an error processing your message. Please try again.';
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }
}

async function handleSubmit(e) {
    if (e) e.preventDefault(); // Prevent form submission
    const message = userInput.value.trim();
    
    if (!message) return;
    
    addMessage(message, true);
    userInput.value = '';

    // Check if the message is a clear command
    if (isClearCommand(message)) {
        clearChat();
    } else {
        await sendMessage(message);
    }
}

// Add form submit handler
chatForm.addEventListener('submit', handleSubmit);

// Handle Enter key
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(); // Call handleSubmit directly instead of dispatching an event
    }
}); 