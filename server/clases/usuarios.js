

class Usuarios {


    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(x => x.id === id)[0];
        return persona;
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(x => x.sala === sala);
        return personasEnSala;
    }

    getPersonas() {


        return this.personas;
    }

    


    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(x => x.id != id);
        return personaBorrada;
    }

}

module.exports = {
    Usuarios
}
