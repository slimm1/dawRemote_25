document.addEventListener('DOMContentLoaded', () => {
    initializeEvents();
});

function initializeEvents() {
    const nameInput = document.getElementById('nombre');
    const surnameInput = document.getElementById('apellidos');

    nameInput.addEventListener('focusout', (event) => {
        const currentText = event.target.value;
        event.target.value = currentText.toUpperCase();
    });

    surnameInput.addEventListener('focusout', (event) => {
        const currentText = event.target.value;
        event.target.value = currentText.toUpperCase();
    });
}

function validateAge() {
    const ageInput = document.getElementById('edad');
    try {
        let intVal = parseInt(ageInput.value);
        if(intVal < 0 || intVal > 105){
            throw new Error('El valor numérico no está ne rango de 0 a 105');
        }
    } catch(error){
        const errorsDiv = document.getElementById('errores');
        errorsDiv.innerText = error;
    }
}