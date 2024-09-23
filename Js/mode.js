let isNightMode = false;

document.getElementById('toggle-night-mode').addEventListener('click', () => {
    isNightMode = !isNightMode;
    toggleNightMode();
});

function toggleNightMode() {
    const body = document.body;
    const chatContainer = document.querySelector('.chat-container');
    const chatBox = document.querySelector('.chat-box');
    const icon = document.getElementById('toggle-night-mode');

    if (isNightMode) {

        body.classList.add('night-mode');
        chatContainer.classList.add('night-mode');
        chatBox.classList.add('night-mode');
        document.querySelectorAll('.message').forEach(msg => {
            msg.classList.add('night-mode');
        });
        icon.innerHTML = '<i class="fas fa-sun"></i>';
        document.querySelector('h2').style.color = '#fff'; 
    } else {
      
        body.classList.remove('night-mode');
        chatContainer.classList.remove('night-mode');
        chatBox.classList.remove('night-mode');
        document.querySelectorAll('.message').forEach(msg => {
            msg.classList.remove('night-mode');
        });
        icon.innerHTML = '<i class="fas fa-moon"></i>'; 
        document.querySelector('h2').style.color = '#000'; 
    }
}

function toggleNightMode() {
    const body = document.body;
    const chatContainer = document.querySelector('.chat-container');
    const chatBox = document.querySelector('.chat-box');

    body.classList.toggle('night-mode', !isNightMode);
    chatContainer.classList.toggle('night-mode', !isNightMode);
    chatBox.classList.toggle('night-mode', !isNightMode);

}
