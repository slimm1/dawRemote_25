/**
 * 1. Escribe una función JavaScript que diga si una cadena de caracteres es un palíndromo. 
 * 
 * He encontrado el método para eliminar acentos a través de este recurso: https://www.amitmerchant.com/replace-accented-characters-with-plain-english/
 * Primero preparo el parámetro "cadena" para que no tenga acentos, mayúsculas ni espacios en blanco. 
 * Reasigno una nueva variable a través de un bucle for recorriendo la cadena entrante a la inversa.
 * Evalúo el resultado y retorno la comparación.
 * 
 * @param {string} input 
 * @returns true si es palíndromo false de lo contrario.
 */
function esPalindromo(input) {
    input = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replaceAll(' ', '');
    let buffer = '';
    for(let i = input.length - 1; i >= 0; i--){
        buffer += input[i];
    }
    return input === buffer;
}

/**
 * 2. Escribe una función llamada obtenerIniciales que tome un nombre completo como parámetro y devuelva las iniciales de cada palabra en el nombre. 
 * 
 * Debes combinar las funciones split y substr para lograr esto.
 * Inicialmente lo había resuelto con charAt. Por cierto, substr parece deprecated.
 * @param {string} name 
 * @returns 
 */
function getInitials(name) {
    let splittedName = name.split(' ');
    let buffer = '';
    splittedName.forEach(element => {
        buffer += element.substring(0,1);
        //buffer += element.charAt(0);
    });
    return buffer;
}


/**
 * 3. Escribe una función llamada revertirPalabras que tome una oración como parámetro y devuelva la oración con las palabras en orden inverso.
 * 
 * Primero he creado un array con las palabras que existan en la frase proporcionada separadas con espacios. 
 * Seguidamente, invierto el orden del array y lo imprimo, remplazando las comas con espacios para obtener el resultado esperado.
 * @param {string} sentence 
 * @returns la frase con las palabras invertidas.
 */
function revertWordsOrder(sentence) {
    let words = sentence.split(' ');
    return words.reverse().toString().replaceAll(',', ' ');
}

/**
 * 4. Escribe una función JavaScript que tome una cadena y desplace cada letra un lugar en el alfabeto (a -> b, b -> c, ..., z -> a).
 * 
 * El método empleado para desplazar las letras devuelve '{' después de la 'z'. Esto se debe a que el método incrementa los caracteres según el código ASCII, no según el alfabeto.
 * Para controlar la letra 'Z' he creado un condicional simple. 
 * @param {string} sentence 
 * @returns la cadena con cada letra desplazada en el código ASCII.
 */
function incrementCharValue(sentence) {
    let buffer = '';
    for(let i = 0; i < sentence.length; i++) {
        if(sentence[i].toLowerCase() === 'z'){
            buffer += 'a';
        } else{
            buffer += String.fromCharCode(sentence.charCodeAt(i) + 1);
        }
    }
    return buffer;
}

/**
 * 5. Escribe una función de JavaScript que acepte una cadena como parámetro y cuente el número de vocales dentro de la cadena. 
 * 
 * Primero me aseguro de que la frase introducida no contenga mayúsculas ni vocales con acentos. 
 * Seguidamente, recorro la cadena a través de un bucle for y pregunto si alguno de los caracteres coincide con los incluidos en el array "vowels". De ser así, se incrementa el contador.
 * @param {string} sentence 
 * @returns la cuenta de vocales en la frase dada.
 */
function countVowles(sentence) {
    sentence = sentence.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let count = 0;
    for(let i = 0; i < sentence.length; i++) {
        if(vowels.includes(sentence[i])){
            count++;
        }
    }
    return count;
}

/**
 * 6. Escribe una función JavaScript que acepte un argumento y devuelva el tipo.
 * @param {any} variable 
 * @returns el tipo de dato de la variable proporcionada.
 */
function getType(variable) {
    return typeof variable;
}

/**
 * 7. Escribe una función de JavaScript para convertir una cantidad X de dinero en monedas. A la función se le deben pasar los valores de las monedas en las que queremos cambiar mediante un array
 * 
 * En primer lugar recorro el array de las monedas y redondeo el resultado de la division entre la cantidad y el valor de la moneda. Se va a añadir ese valor tantas veces como el resultado de esa operación.
 * Luego reasigno la cantidad al resto de la división anterior y sigue a la siguiente moneda. 
 * @param {Number} amount 
 * @param {Array} coins 
 * @returns las monedas cambiadas.
 */
function getCoins(amount, coins) {
    var result = [];
    coins.forEach( value => {
        var count = Math.floor(amount/value);
        for(let i = 0; i < count; i++){
            result.push(value);
        }
        amount = amount % value;
    });
    return result.toString();
}

/**
 * 8. Escribe una función llamada extraerDominio que tome una dirección de correo electrónico como parámetro y devuelva solo el dominio (sin el @).
 * @param {string} email 
 * @returns el dominio del email a partir de la '@'.
 */
function getEmailDomain(email) {
    return email.substring(email.indexOf('@')+1);
}

/**
 * 9. Escribe una función de JavaScript que genere una cadena (de longitud especificada) de caracteres aleatorios.
 * 
 * Para no complicarme la vida, he seleccionado el rango de caracteres de la tabla ASCII del 97 al 122, que equivale a las letras de la 'a' a la 'z' en minúsculas.
 * @param {Number} length 
 * @returns una cadena de la longitud establecida con caracteres aleatorios entre la 'a' y la 'z'.
 */
function generateRandomString(length) {
    var result = '';
    for(let i = 0; i<length; i++){
        var randomIndex = Math.random() * (122-97) + 97;
        result += String.fromCharCode(randomIndex);
    }
    return result;
}

/**
 * 10. Escribe archivo principal (index.html) que llame tres veces (con parámetros diferentes) a cada una de las funciones que has creado. 
 * En cada una de las llamadas debe escribir con document.write() la función a la que se llama, los parámetros que se le pasa y los resultados que devuelve. 
 * 
 * He creado esta función para imprimir de forma sencilla pero elegante lo pedido en el fichero index.html
 * Esta funcion se llama una vez por cada ejercicio a través del evento DOMContentLoaded del documento.
 * 
 * @param {string} functionName 
 * @param {Array} inputs 
 * @param {Number} exerciseNumber 
 * @param {function} callback 
 */
function printFunctionInformation(functionName, inputs, exerciseNumber, callback) {
    const body = document.querySelector('body');
    var title = document.createElement('h3');
    title.innerText = 'Ejercicio ' + exerciseNumber;
    body.append(title);
    var fText = document.createElement('p');
    fText.innerHTML = '<u>Función</u>: "' + functionName + '"';
    body.append(fText);
    body.append(document.createElement('br'));
    inputs.forEach( input => {
        var pText = document.createElement('p');
        pText.innerText = 'Parámetro: ' + (Array.isArray(input) ? input.join(', ') : input);
        body.append(pText);
        var rText = document.createElement('p');
        rText.innerText = 'Resultado: ' + (Array.isArray(input) ? callback(...input) : callback(input));
        body.append(rText);
        body.append(document.createElement('br'));
    });
    body.append(document.createElement('hr'));
}

document.addEventListener('DOMContentLoaded', () => {

    printFunctionInformation('esPalindromo', ['Allí ves a Sevilla', 'Radar', 'Madagascar'], 1, esPalindromo);

    printFunctionInformation('getInitials', ['Martín Ramonda Sáenz', 'Esto es Una prueba', 'Organización Tratado Atlántico Norte'], 2, getInitials);

    printFunctionInformation('revertWordsOrder', ['Hola me llamo Martín','Probando cosas en Javascript','Me gusta hablar como el maestro Yoda'], 3, revertWordsOrder);

    printFunctionInformation('incrementCharValue', ['test','Desarrollo','Sí señor'], 4, incrementCharValue);

    printFunctionInformation('countVowels', ['El rápido zorro marrón','En esta frase hay bastantes vocales','nfgtrsqw'], 5, countVowles);

    printFunctionInformation('getType', [1, {}, ':)'], 6, getType);

    printFunctionInformation('getCoins', [[46, [25, 10, 5, 2, 1]],[88, [25, 10, 5, 2, 1]],[1587, [50, 25, 10, 5, 2, 1]]], 7, getCoins);

    printFunctionInformation('getEmailDomain', ['mramonda@gmail.com','mramonda018l@fpdrioja.es','mramonda@orbitas.es'], 8, getEmailDomain);

    printFunctionInformation('generateRandomString', [12, 5, 51], 9, generateRandomString);
});
