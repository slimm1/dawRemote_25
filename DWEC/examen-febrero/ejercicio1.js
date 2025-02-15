// Puedes usar este código que te doy
function eliminaNumerosRepetidos(arr) {
    // Tu código se inicia aquí
        let bufferList = [];
        arr.forEach(element => {
            if(!bufferList.includes(element)){
                bufferList.push(element);
            }
        });
      return bufferList;  
    // Tu código termina aquí
    }
    
    // Casos de prueba
    console.log(eliminaNumerosRepetidos([1, 2, 3, 4, 5])); // Caso 1: [1, 2, 3, 4, 5]
    console.log(eliminaNumerosRepetidos([1, 1, 2, 2, 3, 3])); // Caso 2: [1, 2, 3]
    console.log(eliminaNumerosRepetidos([4, 5, 4, 6, 5, 7])); // Caso 3: [4, 5, 6, 7]
    console.log(eliminaNumerosRepetidos([])); // Caso 4: []