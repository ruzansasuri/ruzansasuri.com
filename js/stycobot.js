let chatMessages, chatForm, userInput, errorMessage;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    chatMessages = document.getElementById('chatMessages');
    chatForm = document.getElementById('chatForm');
    userInput = document.getElementById('userInput');
    errorMessage = document.getElementById('errorMessage');

    // Check if all required elements exist
    if (!chatMessages || !chatForm || !userInput || !errorMessage) {
        console.error('One or more required elements are missing from the DOM');
        return;
    }

    // Clear any existing messages
    while (chatMessages.firstChild) {
        chatMessages.removeChild(chatMessages.firstChild);
    }

    // Initialize the chat with welcome message
    addMessage(WELCOME_MESSAGE, false);

    // Set up event handlers
    chatForm.addEventListener('submit', (e) => handleSubmit(e));
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    });
});

// AWS Lambda Function URL
const GATEWAY_URL = 'https://vdc8sf6h7c.execute-api.us-east-2.amazonaws.com/Prod/StycoBot';

// Clear command keywords
const CLEAR_COMMANDS = ['clear', 'reset', 'start over', 'new chat', 'clear chat', 'clear all'];

// Original welcome message
const WELCOME_MESSAGE = "Hello! I'm StycoBot. I can tell you all about Ruzan's skills and professional experiences. Please note that I can only answer questions based on Ruzan's resume, cover letter and (later)Linkedin Profile. How can I assist you today?";

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
    if (!chatMessages) {
        console.error('chatMessages element not found');
        return;
    }
    
    // Create the message element
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
        
        // Debug logging to see the response structure
        console.log('Response data:', data);
        
        removeTypingIndicator();
        
        // Handle different response structures
        if (data && typeof data === 'object') {
            // If response is an object with a response property
            if (data.response) {
                addMessage(data.response);
            } 
            // If response is an object with a message property
            else if (data.message) {
                addMessage(data.message);
            }
            // If response is just a string
            else if (typeof data === 'string') {
                addMessage(data);
            }
            // If response is an array of messages
            else if (Array.isArray(data)) {
                data.forEach(msg => addMessage(msg));
            }
        }
    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator();
        errorMessage.textContent = 'Sorry, there was an error processing your message. Please try again.';
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }
}

async function handleSubmit(e) {
    // Prevent form submission in all cases
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    
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