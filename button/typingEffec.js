function simulateTyping(text, delay, callback) {
    const chatBox = document.getElementById("chat-box");

    const newMessage = document.createElement("div");
    newMessage.classList.add('message', 'bot-message');
    chatBox.appendChild(newMessage);

    let index = 0;
    const typingInterval = setInterval(() => {
        if (index < text.length) {
            newMessage.innerText = text.slice(0, index + 1);
            chatBox.scrollTop = chatBox.scrollHeight; 
            index++;
        } else {
            clearInterval(typingInterval);
            if (callback) callback();
        }
    }, delay);
}

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    updateChatBox(userInput, 'user-message');
    conversationHistory.push(`User: ${userInput}`);
    document.getElementById("user-input").value = "";

    const chatBox = document.getElementById("chat-box");
    const typingIndicator = document.createElement("span");
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.innerText = "Đang gõ...";

    const loadingCircle = document.createElement("div");
    loadingCircle.classList.add('loading-circle');
    typingIndicator.appendChild(loadingCircle);

    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight; 

    const response = await fetch('http://localhost:3000/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: userInput,
            userStyle: userStyles.join(", "),
            conversationHistory: conversationHistory
        })
    });

    const data = await response.json();

    chatBox.removeChild(typingIndicator);

    if (data.text) {
        simulateTyping(data.text, 50, () => {
            conversationHistory.push(`Bot: ${data.text}`);
        });
    } else {
        updateChatBox("Lỗi khi kết nối với AI. Vui lòng thử lại sau!", 'bot-message');
    }
}
