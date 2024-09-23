window.onload = function() {
    document.getElementById('policy-popup').style.display = 'flex'; 
};

function closePopup() {
    document.getElementById('policy-popup').style.display = 'none'; 
}

function acceptPolicy() {
    const popup = document.getElementById('policy-popup');
    popup.classList.add('fade-out');

    setTimeout(() => {
        popup.style.display = 'none'; 
        
    }, 300); 
}
