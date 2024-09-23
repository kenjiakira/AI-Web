    const conversationHistory = [];
    const userStyles = [];

    document.getElementById("user-input").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    async function sendMessage() {
        const userInput = document.getElementById("user-input").value;
        if (!userInput.trim()) return;

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

        const data = await response.json();
        if (data.text) {
            conversationHistory.push(`Bot: ${data.text}`);
            updateChatBox(data.text, 'bot-message');
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
