class Palo {
    static CORAZONES = 'corazones';
    static TREBOLES = 'treboles';
    static PICAS = 'picas'; 
    static DIAMANTES = 'diamantes'

    static getAll() {
        return [this.CORAZONES, this.DIAMANTES, this.PICAS, this.TREBOLES];
    }
}