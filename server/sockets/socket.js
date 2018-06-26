const { io } = require('../server');

const { Usuarios } = require("../clases/usuarios");
const { crearMensaje } = require("../utils/utilidades");

const usuarios = new Usuarios();
io.on('connection', (client) => {


    client.on('entrarChat', (usuario, callback) => {
        console.log(usuario);
        if (!usuario.nombre || !usuario.sala) {
            return callback({
                error: true,
                mensaje: "El nombre/sala es necesario"
            });
        }

        client.join(usuario.sala);
        //  console.log('1'+ usuario.sala);
        // console.log(usuarios.getPersonas());


        let personas = usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);
        client.broadcast.to(usuario.sala).emit('listarPersonas', usuarios.getPersonasPorSala(usuario.sala));
        client.broadcast.to(usuario.sala).emit('crearMensaje', crearMensaje('Administrador', `${usuario.nombre}  entro a la sala`))
        callback(usuarios.getPersonasPorSala(usuario.sala));


    });

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('listarPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre}  salió`))
    });

    client.on('crearMensaje', (data, callback) => {
    
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
        
        callback(mensaje);
    });

    client.on('mensajePrivado', (data) => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });


});