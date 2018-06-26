var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has("nombre") || !params.has("sala")) {
    window.location = "index.html";
    throw new Error('El nombre y sala es necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')

};
socket.on('connect', function () {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function (resp) {
        console.log('Usuarios conectados', resp);

        renderizarUsuarios(resp);
    });

});

// escuchar
socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');

});

//Mensajes Privados


socket.on('mensajePrivado', function (mensaje) {

    console.log('Mensaje privado:', mensaje);

});




// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Varela',
//     mensaje: 'Hola Mundo'
// }, function (resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function (mensaje) {
    console.log('Servidor:', mensaje);
    renderizarMensajes(mensaje,false);

});
//Escuchando cambios de usuarios
//Cuando un usuario entra o sale del chat
socket.on('listarPersonas', function (personas) {

    console.log('Servidor:', personas);
    renderizarUsuarios(personas);

});