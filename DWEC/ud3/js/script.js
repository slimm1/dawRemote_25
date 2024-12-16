// variable agenda accesible desde cualquier método de este script.
var agenda;

// evento onload de la ventana. Se inician todos los eventos de los botones, se inicializa
// la variable agenda y se setea el intervalo para actualizar la fecha cada segundo.
window.onload = function () {
    agenda = [];
    showTime();
    setInterval(showTime, 1000);
    document.getElementById('mostrar-eventos').addEventListener('click', mostrarEventos);
    document.getElementById('borrar-evento').addEventListener('click', removeEvent);
    document.getElementById('form-agregar-evento').addEventListener('submit', function(event) {
        event.preventDefault(); 
        agregarEvento();
    });
}

// agrega un evento a la lista recogiendo los valores del formulario.
function agregarEvento() {
    const title = document.getElementById('titulo').value;
    const description = document.getElementById('descripcion').value;
    const dateTime = document.getElementById('fecha-hora').value;
    const event = {
        'title' : title,
        'description' : description,
        'dateTime' : dateTime,
        'priority' : Math.floor(Math.random() * 100)
    };
    agenda.push(event);
    clearFormInputs();
    alert("Evento añadido");
}

// función para mostrar los eventos en el HTML. Recorre la lista y crea elementos con
// la información recogida en el array. Si no hay eventos muestra una alerta
function mostrarEventos() {
    if(agenda.length > 0){
        const eventsContainer = document.getElementById('eventos-container');
        eventsContainer.innerHTML = '';
        // orenar la lista
        agenda = ordenarEventosPorFecha();

        agenda.forEach( event => {
            const eventContainer = document.createElement('div');
            const title = document.createElement('h3');
            const description = document.createElement('p');
            const priority = document.createElement('p');
            const date = document.createElement('h5');
            eventContainer.classList.add('event-container');
            title.innerText = event.title;
            description.innerText = "Descripción: " + event.description;
            priority.innerText = "Prioridad: " + event.priority;
            date.innerText = "Fecha: " + event.dateTime.replace('T', ', ');
            eventContainer.append(title, date, description, priority);
            eventsContainer.append(eventContainer);
        });
    } else {
        alert("No existen eventos para mostrar");
    }    
}

// devuelve la lista ordenada por fecha descendente (más recientes primero)
function ordenarEventosPorFecha() {
    return agenda.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
}

// funcion para eliminar un evento. Se reasigna la variable agenda con el resultado
// de filtrar aquellas tareas que no se llamen como la recogida en el prompt
function removeEvent() {
    const title = prompt("Introduce el título del evento que deseas eliminar:");
    agenda = agenda.filter(event => event.title !== title);
    mostrarEventos();
}

// funcion para mostrar la fecha y hora actual.
function showTime() {
    const divFecha = document.getElementById('fecha-hora-actual');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hour = currentDate.getHours();
    const minutes = currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes();
    const seconds = currentDate.getSeconds() < 10 ? "0" + currentDate.getSeconds() : currentDate.getSeconds();

    divFecha.innerText = `${day}-${month}-${year}, ${hour}:${minutes}:${seconds}`;
    checkEventsAndAlert(currentDate);
}

// funcion para vaciar los inputs del formulario al enviar un evento
function clearFormInputs() {
    const form = document.getElementById('form-agregar-evento');
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });
}

// Función para alertar de un evento inmediato mediante parpadeo de la pantalla. Recorre
// los eventos de la lista y busca coincidencias con la fecha actual. Si encuentra una,
// dispara el intervalo, que se repite 10 veces cada 100 milisegundos
function checkEventsAndAlert(currentDate) {
    agenda.forEach(event => {
        const date = new Date(event.dateTime);
        // Para comprobar si las fechas son iguales, extraigo los milisegundos de la conversion a timestamp para compararlas,
        if(Math.floor(date.getTime()/1000) === Math.floor(currentDate.getTime()/1000)){
            const body = document.querySelector('body');
            var count = 0;
            const interval = setInterval(function(){
                count ++;
                body.style.backgroundColor = body.style.backgroundColor === 'red' ? 'white' : 'red';
                if(count == 10){
                    clearInterval(interval);
                    body.style.backgroundColor = 'white'
                }
            }, 100);                 
        }
    });
}