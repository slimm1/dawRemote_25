// función principal que llama a las demás
function robot() {
    const body = document.querySelectorAll('body');
    const thumbCaptions = document.querySelectorAll('.thumbcaption');
    const galleryText = document.querySelectorAll('.gallerytext');
    const headers = document.querySelectorAll('h2, h3');
    const bold = document.querySelectorAll('b');
    const links = document.querySelectorAll('a');

    printGenericAnswer('los encabezados', countMostUsedWords(headers), true);
    printGenericAnswer('negrita', countMostUsedWords(bold));
    printGenericAnswer('pie de imágenes', countMostUsedWords(thumbCaptions, galleryText));
    printGenericAnswer('toda la web', countMostUsedWords(body));
    printGenericAnswer('enlaces', countMostUsedWords(links));
    printImagesTable();
    analyzeWebsite();
}

// función genérica para printar los resultados de los 5 primeros puntos del ejercicio 
function printGenericAnswer(listTitle, list, isFirst = false) {
    const rightPanel = document.getElementById('derecha');
    if(isFirst){
        const header = document.createElement('h2');
        header.innerText = 'Conteo de palabras';
        rightPanel.appendChild(header);
    }
    const infoElement = document.createElement('p');
    infoElement.innerText = "Palabras que más apariciones tienen en " + listTitle + ":";
    rightPanel.appendChild(infoElement);
    list.forEach((item, index) => {
        const word = item[0];
        const number = item[1];
        const element = document.createElement('p');
        element.innerHTML = `${index+1}.- <b>${word}</b>: ${number} apariciones`;
        rightPanel.appendChild(element);
    });
    const whiteSpace = document.createElement('br');
    rightPanel.appendChild(whiteSpace);
}

function printImagesTable() {
    // recupero la lista de imágenes y el panel de la derecha
    const images = document.querySelectorAll('img');
    const rightPanel = document.getElementById('derecha');

    // creao los elementos título y tabla
    const table = document.createElement('table');
    const header = document.createElement('h2');
    header.innerText = 'Galería con todas las imágenes';
    rightPanel.appendChild(header);
    
    let row = table.insertRow();
    images.forEach((img, index) => {
        // insertar una celda en la fila
        const cell = row.insertCell();
        // creo una copia de la imagen y la asigno un nuevo tamaño para igualar los elementos de la tabla
        const clonedImg = img.cloneNode();
        clonedImg.style.width = '150px'; 
        clonedImg.style.height = '170px';
        clonedImg.style.objectFit = 'cover';
        // incluyo la celda en la fila, y si se reinstancia la fila si el indice del array es múltiplo de 3
        cell.appendChild(clonedImg); 
        if ((index + 1) % 3 === 0 && index !== images.length - 1) {
            row = table.insertRow();
        }
    });

    rightPanel.appendChild(table);
}

function countMostUsedWords(...elementsList) {
    var mostUsedWords = {};

    elementsList.forEach(list => fillMap(list, mostUsedWords));

    mostUsedWords = Object.entries(mostUsedWords);
    mostUsedWords = mostUsedWords.sort((a, b) => b[1] - a[1]).slice(0, 10);

    return mostUsedWords;
}

// funcion para rellenar el mapa de datos, si el mapa no contiene la clave se le asigna, y si no contiene valor se inicia en 0 y se le suma uno.
function fillMap(elements, map) {
    elements.forEach(element => {
        const words = cleanSentence(element.innerText);
        words.forEach(word => {
            if(word.length > 0){
                map[word] = (map[word] ?? 0) + 1
            }
        });
    });
}

/**
 * Limpia la frase y la convierte en un array de palabras
 * @param {string} sentence 
 * @returns array de palabras despues de pasar los filtros
 */
function cleanSentence(sentence) {
    // Solo se deben tener en cuenta "palabras representativas" del texto, es decir, no se deben tener en cuenta preposiciones, adverbios, artículos...
    // declaro un array con advervios, artículos y preposiciones para limpiar las frases que entren a este método. 
    const forbiddenWords = [
        "el", "la", "los", "las", "un", "una", "unos", "unas",  "y", "o", "al",
        "a", "ante", "bajo", "cabe", "con", "contra", "de", "del", "desde", 
        "en", "entre", "hacia", "hasta", "para", "por", "según", "su", "sus", "se",
        "sin", "so", "sobre", "tras", "muy", "tan", "más", "menos", "que",
        "siempre", "nunca", "ya", "aquí", "allí", "ahí", "entonces", "como",
        "también", "tampoco", "quizás", "tal vez", "bastante", "demasiado", "lo"
    ];

    // Primero pasa este filtro para eliminar signos de puntuacion y texto entre corchetes. las palabras se pasan a minúsucula
    sentence = sentence.toLowerCase().replace(',', '').replace('.', '').replace(/\[.*?\]/g, '');
    // Se devuleve un array de palabras filtradas con el array anterior a partir de la frase pasada en los parámetros.
    return sentence.split(' ').filter(word => !forbiddenWords.includes(word));
}

function analyzeWebsite() {
    const rightPanel = document.getElementById('derecha');
    const header = document.createElement('h2');
    header.innerText = 'Resultados algoritmo';
    rightPanel.appendChild(header);

    const bodyText = document.body.innerText;

    const words = cleanSentence(bodyText);

    const wordFrequency = {};
    words.forEach(word => {
        if (wordFrequency[word]) {
            wordFrequency[word] += 1;
        } else {
            wordFrequency[word] = 1;
        }
    });

    const sortedWords = Object.entries(wordFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);


    console.log("Palabras más frecuentes:");
    sortedWords.forEach(([word, count]) => {
        console.log(`${word}: ${count}`);
    });

    const topicKeywords = ["compras", "productos", "tienda", "noticias", "recetas", "información", "cocina", "historia", "mitología", "dioses"];
    const foundKeywords = sortedWords.filter(([word]) => topicKeywords.includes(word));
    var phar = document.createElement('p');
    if (foundKeywords.length > 0) {
        phar.innerText = 'Las palabras clave de la web son:';
        rightPanel.appendChild(phar);
        foundKeywords.forEach(([word]) => {
            phar = document.createElement('p');
            phar.innerText = word;
            rightPanel.appendChild(phar);
        });
    } else {
        phar.innerText = 'No se pudo determinar el tema basado en las palabras clave.';
        rightPanel.appendChild(phar);
    }
}