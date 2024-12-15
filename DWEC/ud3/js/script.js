var events;

window.onload = function () {
    mostrarFechaHoraActual();
    setInterval(mostrarFechaHoraActual, 1000);
    anularBotonSubmit();
    document.getElementById('mostrar-eventos').addEventListener('click', showEvents);
    document.getElementById('borrar-evento').addEventListener('click', removeEvent);
    events = [];
}

function anularBotonSubmit() {
    document.getElementById('form-agregar-evento').addEventListener('submit', function(event) {
        event.preventDefault(); 
        addEvent();
    });
}

function addEvent() {
    const title = document.getElementById('titulo').value;
    const description = document.getElementById('descripcion').value;
    const dateTime = document.getElementById('fecha-hora').value;
    const event = {
        'title' : title,
        'description' : description,
        'dateTime' : dateTime,
        'priority' : Math.floor(Math.random() * 100) + 1
    };
    events.push(event);
    clearFormInputs();
    alert("Evento añadido");
}

function showEvents() {
    if(events.length > 0){
        const eventsContainer = document.getElementById('eventos-container');
        eventsContainer.innerHTML = '';
        events.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
        events.forEach( event => {
            const eventContainer = document.createElement('div');
            const title = document.createElement('h3');
            const description = document.createElement('p');
            const priority = document.createElement('p');
            const date = document.createElement('h5');
            eventContainer.classList.add('event-container');
            title.innerText = event.title;
            description.innerText = event.description;
            priority.innerText = "Prioridad: " + event.priority;
            date.innerText = event.dateTime.replace('T', ', ');
            eventContainer.append(title, date, description, priority);
            eventsContainer.append(eventContainer);
        });
    } else {
        alert("No existen eventos para mostrar");
    }    
}

function removeEvent() {
    const title = prompt("Introduce el título del evento que deseas eliminar:");
    events = events.filter(event => event.title !== title);
    showEvents();
}

function mostrarFechaHoraActual() {
    const divFecha = document.getElementById('fecha-hora-actual');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hour = currentDate.getHours();
    const minutes = currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
     
    divFecha.innerText = `${day}-${month}-${year}, ${hour}:${minutes}:${seconds}`;
}

function clearFormInputs() {
    const form = document.getElementById('form-agregar-evento');
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });
}