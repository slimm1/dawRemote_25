 // ESTE CÓDIGO NO SE PUEDE TOCAR //////////////////////////////////////////////////////////
 // DEBES USAR ESTOS OBJEROS Y MÉTODOS /////////////////////////////////////////////////////
 
        // Crear una instancia de la biblioteca
        const biblioteca = new Biblioteca();

        // Crear algunos libros y revistas
        const libro1 = new Libro("Cien Años de Soledad", "Gabriel García Márquez", 1967);
        const libro2 = new Libro("1984", "George Orwell", 1949);
        const revista1 = new Revista("National Geographic", "Varios Autores", 2023, 12);

        // Agregar los materiales a la biblioteca
        biblioteca.agregarMaterial(libro1);
        biblioteca.agregarMaterial(libro2);
        biblioteca.agregarMaterial(revista1);

        // Listar los materiales en la biblioteca
        biblioteca.listarMateriales();
		
 // ESTE CÓDIGO NO SE PUEDE TOCAR //////////////////////////////////////////////////////////