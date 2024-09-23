const conversationHistory = [];
const userStyles = [];
document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const inputArea = document.querySelector('.input-area');
    sendButton.addEventListener("click", sendMessage);


    userInput.addEventListener('input', function() {
        if (userInput.value.trim() !== '') {
            sendButton.style.display = 'inline-block'; 
            sendButton.classList.add('fade-in'); 
            inputArea.classList.remove('input-inactive');
            inputArea.classList.add('input-active'); 
        } else {
            sendButton.style.display = 'none'; 
            inputArea.classList.add('input-inactive'); 
            inputArea.classList.remove('input-active');
        }
    });

    userInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const background = document.querySelector('.parallax-background');
        background.style.transform = 'translateY(' + (scrolled * 0.5) + 'px);'; 
    });
});

let isSending = false;
function changeTheme(theme) {
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.classList.remove('default', 'blue', 'green', 'pink', 'sunset', 'retro', 'pastel');
    chatContainer.classList.add(theme);
}

async function sendMessage() {
    if (isSending) return;

    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;
    const sendButton = document.querySelector('.input-area button'); 
    sendButton.disabled = true; 

    if (userInput === conversationHistory[conversationHistory.length - 1]) {
        alert("Vui lòng không gửi tin nhắn trùng lặp.");
        return;
    }

    updateChatBox(userInput, 'user-message');
    conversationHistory.push(`User: ${userInput}`);
    document.getElementById("user-input").value = "";

    const words = userInput.split(" ");
    userStyles.push(...words);

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

    sendButton.disabled = false; 

    if (response.ok) {
        const data = await response.json();
        if (data.text) {
            simulateTyping(data.text, 50, () => {
                conversationHistory.push(`Bot: ${data.text}`);
            });
        } else {
            updateChatBox("Lỗi khi kết nối với AI. Vui lòng thử lại sau!", 'bot-message');
        }
    } else {
        updateChatBox("Lỗi khi kết nối với AI. Vui lòng thử lại sau!", 'bot-message');
    }
}

function updateChatBox(message, className) {
    const chatBox = document.getElementById("chat-box");
    const newMessage = document.createElement("div");
    newMessage.classList.add('message', className);
    newMessage.innerText = message;
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight; 
}

function simulateTyping(text, delay, callback) {
    const chatBox = document.getElementById("chat-box");
    
    const newMessage = document.createElement("div");
    newMessage.classList.add('message', 'bot-message');
    chatBox.appendChild(newMessage);

    const typingIndicator = document.createElement("span");
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.innerText = "Đang gõ..."; 
    chatBox.appendChild(typingIndicator);

    let index = 0;

    const typingInterval = setInterval(() => {
        if (index < text.length) {
            newMessage.innerText = text.slice(0, index + 1);
            chatBox.scrollTop = chatBox.scrollHeight; 
            index++;
        } else {
            clearInterval(typingInterval);
            chatBox.removeChild(typingIndicator); 
            if (callback) callback();
        }
    }, delay);
}
