
function sendMessage() {
    const input = document.getElementById("user-input");
    const messageText = input.value.trim();

    if (messageText !== "") {
        const chatBox = document.getElementById("chat-box");
        
        const message = document.createElement("div");
        message.className = "message user-message";
        message.innerHTML = `
            ${messageText}
            <span class="message-time">${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
        `;
        
        chatBox.appendChild(message);
        
        chatBox.scrollTop = chatBox.scrollHeight;

        input.value = "";
    }
}

function receiveMessage(botText) {
    const chatBox = document.getElementById("chat-box");

    const message = document.createElement("div");
    message.className = "message bot-message";
    message.innerHTML = `
        ${botText}
        <span class="message-time">${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
    `;
    
    chatBox.appendChild(message);
    
    chatBox.scrollTop = chatBox.scrollHeight;
}
