// EN ESTE ARCHIVO REALIZARÁS EL EJERCICIO: DEFINIR LAS CLASES Material, Libro, Revista Y Biblioteca     
/**
 * @author Martín Ramonda
 * @version Convocatoria Ordinaria 2025
 * @pc 20
 */
		// Clase base: Material
        class Material {
            constructor(titulo, autor, anio) {
                this.titulo = titulo;
                this.autor = autor;
                this.anio = anio;
            }

            mostrarInformacion() {
                return "Título: " + this.titulo + ". Autor: " + this.autor + ". Año: " + this.anio + ".";
            }
        }

        // Clase derivada: Libro (hereda de Material)
        class Libro extends Material {

        }

        // Clase derivada: Revista (hereda de Material)
        class Revista extends Material {
            constructor(titulo, autor, anio, number) {
                super(titulo, autor, anio);
                this.number = number;
            }

            mostrarInformacion() {
                return "Título: " + this.titulo + ". Autor: " + this.autor + ". Año: " + this.anio + ". Edición: " + this.number + ".";
            }
        }

        // Clase Biblioteca
        class Biblioteca {
            constructor() {
                this.materiales = [];
            }

            agregarMaterial(material) {
                this.materiales.push(material);
                console.log("Material añadido: " + material.titulo);
            }

            listarMateriales() {
                console.log("Materiales en la biblioteca:");
                this.materiales.forEach(item => console.log(item.mostrarInformacion() + "\n"));
            }
        }  

      