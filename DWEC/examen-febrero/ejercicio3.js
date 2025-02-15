document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    const firstButton = buttons[0];
    firstButton.addEventListener('click', () => createImage());
});

function createImage() {
    let imgElement = document.getElementById('saludo');
    if(!imgElement){
        const brElement = document.querySelector('br');
        imgElement = document.createElement('img');
        imgElement.id = 'saludo';
        imgElement.src = 'img/saludo.gif';
        brElement.insertAdjacentElement('afterend', imgElement);
        setTimeout(function() {
            imgElement.remove();
        }, 5000);
    } else {
        imgElement.remove();
    }
}