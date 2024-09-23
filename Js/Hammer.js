const chatContainer = document.querySelector('.chat-container');
const hammer = new Hammer(chatContainer);
const userInput = document.getElementById('user-input');

hammer.on('swipeleft', function() {
   
});

hammer.on('swiperight', function() {
   
});

userInput.addEventListener('focus', () => {
    setTimeout(() => {
        userInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300); 
});
