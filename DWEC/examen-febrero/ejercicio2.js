document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector("input[type='submit']");
    submitButton.addEventListener('click', () => handleClick(event));
});

function handleClick(event) {
    event.preventDefault();
    const form = document.querySelector("form[name='f1']");
    const textInput = form.querySelector("textarea[name='original']");
    const encodedInput = form.querySelector("textarea[name='cifrado']");
    const text = textInput.value;
    if(text.length > 0){
        encodedInput.value = desorganiza(text);
    }
}

function desorganiza(text) {
    let words = text.split(' ');
    let buffer = [];
    words.forEach(word => {
        // reinstancio la variable word con su valor en array
        wordArray = Array.from(word);
        if(word.length > 3){
            let firstIndex = 1;
            let lastIndex = wordArray.length - 1;
            if(word.startsWith("\"")){
                firstIndex ++;
            }
            if(word.endsWith(",") || word.endsWith(".") || word.endsWith(":") || word.endsWith("\"") || word.endsWith(";")){
                lastIndex--;
            }
            // declaro un nuevo array con los caracteres que se pueden randomizar
            let randomChars = wordArray.slice(firstIndex, lastIndex);
            // recorro el array word, desde el segundo hasta el penúltimo caracter
            for(let i = firstIndex; i < lastIndex; i++){
                // declaro un numero random de 0 al tamaño de la lista de numeros random menos uno
                let random = Math.floor(Math.random() * (randomChars.length));
                // asigno el valor del array word en la iteración al valor de la lisa de numeros random que se encuentra en la posicion random.
                wordArray[i] = randomChars[random];
                // elimino el valor de la lista de numeros random.
                randomChars.splice(random, 1);
            }
        }
        buffer.push(wordArray.join(''));
    });
    return buffer.join(' ');
}