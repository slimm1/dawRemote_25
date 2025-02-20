document.addEventListener('DOMContentLoaded', () => {
    initializeEvents();
});

function initializeEvents() {
    // Recojo los elementos que necesitan un evento:
    const nameInput = document.getElementById('nombre');
    const surnameInput = document.getElementById('apellidos');
    const submitButton = document.getElementById('enviar');

    // añado el evento al boton de enviar
    submitButton.addEventListener('click', (event) => submitForm(event));

    // añado evento focusout al campo del Nombre
    nameInput.addEventListener('focusout', (event) => {
        const currentText = event.target.value;
        event.target.value = currentText.toUpperCase();
    });

    // añado evento focusout al campo del Apellido
    surnameInput.addEventListener('focusout', (event) => {
        const currentText = event.target.value;
        event.target.value = currentText.toUpperCase();
    });
}

// FUncion para validar la edad
function validateAge() {
    const ageInput = document.getElementById('edad');
    const intVal = parseInt(ageInput.value);
    if(isNaN(intVal)){
        ageInput.focus();
        printError('No se ha adjuntado un valor numérico');
        return;
    }
    if(intVal < 0 || intVal > 105){
        ageInput.focus();
        printError('El valor numérico no está ne rango de 0 a 105');
    }

}

// Funcion para validar el NIF
function validateNif() {
    const nifInput = document.getElementById('nif');
    // d{8} ocho dígitos. "-" guión requerido y una letra de la a a la z mayuscula o minuscula
    const regex = /^\d{8}-[A-Za-z]$/;
    if(!regex.test(nifInput.value)){
        nifInput.focus();
        printError('Formato NIF incorrecto');
    }
}

// FUncion para validar el email
function validateEmail() {
    const emailInput = document.getElementById('email');
    // minimo un caracter de la a la z numeors del 1 al 9 y caracteres especiales. arroba obligatoria. dominio, punto y tld
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!regex.test(emailInput.value)){
        emailInput.focus();
        printError('Formato email incorrecto');
    }
}

// Funcion para validar la provincia
function validateState() {
    const stateSelector = document.getElementById('provincia');
    const selectedOption = stateSelector[stateSelector.selectedIndex];
    if(selectedOption.value === "0"){
        stateSelector.focus();
        printError('Debes seleccionar una provincia');
    }
}

// Fecha de nacimiento
function validateBirthDate() {
    const dateInput = document.getElementById('fecha');
    // primero valida dias del 0 al 9, del 10 al 19 y del 20 al 31. Sepradares establecidos (- o /), mes del 1 al 12, mismo separador usado antes y año de cuatro digitos 
    const regex = /^(0[1-9]|[12][0-9]|3[01])([\/\-])(0[1-9]|1[0-2])\2\d{4}$/;
    if(!regex.test(dateInput.value)){
        dateInput.focus();
        printError('Formato de fecha incorrecto');
    }
}

// Teléfono
function validatePhone() {
    const phoneInput = document.getElementById('telefono');
    // 9 digitos
    const regex = /^\d{9}$/;
    if(!regex.test(phoneInput.value)){
        phoneInput.focus();
        printError('Formato de teléfono incorrecto');
    }
}

// Hora
function validateTime() {
    const timeInput = document.getElementById('hora');
    // horas de 0 a 9, de 10 a 19 y de 20 a 23. dos puntos y minutos: primer dígito de 0 a 5 y segundo de 0 a nueve
    const regex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
    if(!regex.test(timeInput.value)){
        timeInput.focus();
        printError('Formato de hora incorrecto');
    }
}

// Gestiona el envio de formulario
function submitForm(event) {
    event.preventDefault();
    const confirmation = confirm('¿Estás seguro?');
    if(confirmation){
        // Limpiar la pila de errores anterior
        const errorsDiv = document.getElementById('errores');
        errorsDiv.innerHTML = '';
        // validaciones
        validateAge();
        validateBirthDate();
        validateEmail();
        validateNif();
        validatePhone();
        validateState();
        validateTime();
        setCookie();
    }
}

// PInta el error correspondiente en el contenedor de erorres
function printError(errorMessage){
    const errorsDiv = document.getElementById('errores');
    const newError = document.createElement('p'); 
    newError.innerText = errorMessage;           
    errorsDiv.appendChild(newError);    
}

// Crea la cookie si no existe y pinta el numero de intentos en el panel
function setCookie() {
    const attempsPanel = document.getElementById('intentos');
    const totalAttemps = getCookieValue() ?? 0;
    let intVal = parseInt(totalAttemps);
    document.cookie = `intentos=${intVal + 1}; path=/`;
    attempsPanel.innerText = `Número de intentos totales = ${intVal + 1}`;
}

// recoje el valor de la cookie si existe
function getCookieValue() {
    const firstIndex = document.cookie.indexOf('=') + 1;
    if(firstIndex === -1){
        return null;
    }
    const value = document.cookie.substring(firstIndex);
    return value ?? null;
}