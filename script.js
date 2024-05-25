document.getElementById('outreach-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const leadEmail = document.getElementById('lead-email').value;
    const personalMessage = document.getElementById('personal-message').value;

    // Simulate sending email
    sendEmail(leadEmail, personalMessage)
        .then(response => {
            document.getElementById('outreach-response').innerText = response;
        })
        .catch(error => {
            document.getElementById('outreach-response').innerText = error;
        });
});

function sendEmail(email, message) {
    // Replace with actual email sending logic (API call)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Email sent to ${email} with message: "${message}"`);
        }, 1000);
    });
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    addChatMessage("You", userInput);

    // Simulate chatbot response
    getChatbotResponse(userInput)
        .then(response => {
            addChatMessage("Chatbot", response);
        });

    document.getElementById('user-input').value = "";
}

function addChatMessage(sender, message) {
    const chatbox = document.getElementById('chatbox');
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function getChatbotResponse(message) {
    // Replace with actual chatbot response logic (API call)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`This is a simulated response to: "${message}"`);
        }, 1000);
    });
}
