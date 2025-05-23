/**
 * @author Martín Ramonda
 * @version Convocatoria Ordinaria 2025
 * @pc 20
 */

class Animal {
    constructor(nombre, edad, tipo) {
        this.nombre = nombre;
        this.edad = edad;
        this.tipo = tipo;
    }

    printSelectorInfo() {
        return `${this.nombre} (${this.tipo})`;
    }
}

class Perro extends Animal {
    constructor(nombre, edad, tipo, raza) {
        super(nombre, edad, tipo);
        this.raza = raza;
    }
}

class Gato extends Animal {
    constructor(nombre, edad, tipo, color) {
        super(nombre, edad, tipo);
        this.color = color;
    }
}

class Veterinario {
    constructor(especialidad, nombre) {
        this.especialidad = especialidad;
        this.nombre = nombre;
    }

    printVetInfo() {
        return `${this.nombre} (${this.especialidad})`;
    }
}

class Consulta {
    constructor(veterinario, animal, descripcion, fecha) {
        this.veterinario = veterinario;
        this.animal = animal;
        this.descripcion = descripcion;
        this.fecha = fecha;
    }

    printInfo() {
        return `${this.fecha} - Veterinario: ${this.veterinario}, Animal: ${this.animal}, Descripción: ${this.descripcion}`;
    }
}

class Clinica {
    constructor() {
        this.veterinarios = [];
        this.animales = [];
        this.consultas = [];
    }

    addVeterinario(vet) {
        this.veterinarios.push(vet);
    }

    addAnimal(animal) {
        this.animales.push(animal);
    }

    addConsulta(consulta) {
        this.consultas.push(consulta);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // recuperar la clinica con los datos cargados
    const clinica = abrirClinica();

    // Elementos del formulario
    const form = document.getElementById('consultaForm');
    const button = form.querySelector('button');
    const animalSelector = document.getElementById('animal');
    const vetSelector = document.getElementById('veterinario');
    const descripcion = document.getElementById('descripcion');

    // cargar selector de animales
    clinica.animales.forEach(animal => {
        const option = document.createElement('option');
        option.value = animal.nombre;
        option.innerText = animal.printSelectorInfo();
        animalSelector.append(option);
    });

    // cargar selector de veterinarios
    clinica.veterinarios.forEach(vet => {
        const option = document.createElement('option');
        option.value = vet.nombre;
        option.innerText = vet.printVetInfo();
        vetSelector.append(option);
    });

    // Añadir eventos a los elementos del DOM
    button.addEventListener('click', (event) => {
        event.preventDefault();

        if(descripcion.value.length === 0){
            alert("Rellena la descripción de la consulta");
            return;
        }

        const time = new Date();
        const consulta = new Consulta(
            vetSelector[vetSelector.selectedIndex].value,
            animalSelector[animalSelector.selectedIndex].value,
            descripcion.value,
            time
        );

        clinica.addConsulta(consulta);

        descripcion.value = '';

        printInformation(clinica);
    });
});

function printInformation(clinica) {
    const list = document.getElementById('consultasList');
    list.innerHTML = '';

    clinica.consultas.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item.printInfo();
        list.append(li);
    });
}

function abrirClinica() {
    // Crear instancias de objetos estáticos
    const vet1 = new Veterinario("Perros", "Martín Ramonda");
    const vet2 = new Veterinario("Gatos", "Javier Rojas");
    const animal1 = new Perro("Rex", 4, "Perro", "Perro de agua");
    const animal2 = new Perro("Wallace", 8, "Perro", "Cazador");
    const animal3 = new Gato("Weasly", 4, "Gato", "Naranja");
    const animal4 = new Gato("Kobe", 3, "Gato", "Gris");

    const clinica = new Clinica();
    
    // añadir animales
    clinica.addAnimal(animal1);
    clinica.addAnimal(animal2);
    clinica.addAnimal(animal3);
    clinica.addAnimal(animal4);

    //añadir veterinarios
    clinica.addVeterinario(vet1);
    clinica.addVeterinario(vet2);

    return clinica;
}