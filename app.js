function sendMessage() {
    var inputField = document.getElementById('userInput');
    var chatArea = document.getElementById('chatArea');
    var userMessage = inputField.value.trim();

    // Check if input is empty
    if (userMessage === '') {
        return;
    }

    // Display user message
    var userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user';
    userMessageDiv.innerHTML = '<p>' + userMessage + '</p>';
    chatArea.appendChild(userMessageDiv);

    // Generate bot response
    var botResponse = getBotResponse(userMessage);
    if (botResponse) {
        var botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'message bot';
        botMessageDiv.innerHTML = '<p>' + botResponse + '</p>';
        chatArea.appendChild(botMessageDiv);
    }

    // Clear input field
    inputField.value = '';

    // Scroll to bottom
    chatArea.scrollTop = chatArea.scrollHeight;
}

function getBotResponse(userMessage) {
    var chatArea = document.getElementById('chatArea');

    // Clear previous buttons if any
    var existingButtonContainer = document.querySelector('.button-container');
    if (existingButtonContainer) {
        existingButtonContainer.remove();
    }

    // If user says "hello" or similar, show buttons for options
    if (userMessage.includes('hello') || userMessage.includes('hey') || userMessage.includes('hi')) {
        var response = 'Hello! How can I help you today? Please select an option:';

        // Create a button container
        var buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        // Create buttons
        var timingButton = createButton('Check Timing', function() {
            displayBotMessage('We are open from 9 AM to 5 PM every day.');
        });

        var ticketPriceButton = createButton('Ticket Prices', function() {
            displayBotMessage('Tickets are 150 for adults, 70 for seniors, and 50 for children.');
        });

        var exhibitButton = createButton('Current Exhibit', function() {
            displayBotMessage('Our current exhibit is "Impressionism: A New Perspective".');
        });

        var bookingButton = createButton('Book Tickets', function() {
            displayBotMessage('To book tickets, click here: <a href="ticket-booking.html">tickets</a>');
        });

        // Append buttons to the container
        buttonContainer.appendChild(timingButton);
        buttonContainer.appendChild(ticketPriceButton);
        buttonContainer.appendChild(exhibitButton);
        buttonContainer.appendChild(bookingButton);

        // Add button container to chat area
        chatArea.appendChild(buttonContainer);

        return response;
    } else {
        // Handle other user messages
        return getGeneralResponse(userMessage);
    }
}

function createButton(label, callback) {
    var button = document.createElement('button');
    button.className = 'floating-button';
    button.innerHTML = label;
    button.onclick = callback;
    return button;
}

function displayBotMessage(message) {
    var chatArea = document.getElementById('chatArea');
    var botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'message bot';
    botMessageDiv.innerHTML = '<p>' + message + '</p>';
    chatArea.appendChild(botMessageDiv);

    // Scroll to bottom after adding the message
    chatArea.scrollTop = chatArea.scrollHeight;
}

function getGeneralResponse(userMessage) {
    // Provide a general response or handle unknown input
    return 'I am not sure how to respond to that. Can you please rephrase?';
}

// Function to handle 'Enter' key press
function handleKeydown(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
}