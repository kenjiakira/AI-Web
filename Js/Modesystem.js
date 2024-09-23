let isNightMode = false;

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isNightMode = true;
    toggleNightMode();
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    isNightMode = event.matches;
    toggleNightMode();
});

document.getElementById('toggle-night-mode').addEventListener('click', () => {
    isNightMode = !isNightMode;
    toggleNightMode();
});

function toggleNightMode() {
    const body = document.body;
    const chatContainer = document.querySelector('.chat-container');
    const chatBox = document.querySelector('.chat-box');
    const icon = document.getElementById('toggle-night-mode');

    body.classList.toggle('night-mode', isNightMode);
    chatContainer.classList.toggle('night-mode', isNightMode);
    chatBox.classList.toggle('night-mode', isNightMode);

    document.querySelectorAll('.message').forEach(msg => {
        msg.classList.toggle('night-mode', isNightMode);
    });

    if (isNightMode) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}
