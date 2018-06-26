//Renderizado de usuarios
var params = new URLSearchParams(window.location.search);
var nombre = params.get("nombre");
var sala = params.get('sala');
var divUsuarios = $("#divUsuarios");
var formEnviar = $("#formEnviar");
var txtMensaje = $("#txtMensaje");
var divChatBox = $("#divChatbox");
function scrollBottom() {

    // selectors
    var newMessage = divChatBox.children('li:last-child');

    // heights
    var clientHeight = divChatBox.prop('clientHeight');
    var scrollTop = divChatBox.prop('scrollTop');
    var scrollHeight = divChatBox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatBox.scrollTop(scrollHeight);
    }
}
function renderizarUsuarios(personas) {

    console.log(personas);

    var html = '';

    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    personas.forEach(persona => {
        html += '<li>'
        html += '<a data-id=' + persona.id + ' href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + persona.nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';

    });

    divUsuarios.html(html);
}


//Listeners

divUsuarios.on('click', 'a', function () {

    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }

});

function renderizarMensajes(mensaje, yo) {
    console.log("en la funcion", mensaje);
    var html = '';
    var htmlyo = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ":" + fecha.getMinutes();
    var adminClass = "info";

    if (mensaje.nombre === 'Administrador') {
        adminClass = "danger";

    }
    if (yo) {
        html += '<li class="reverse">';
        html += ' <div class="chat-content">';
        html += ' <h5>' + mensaje.nombre + '</h5>';
        html += '<div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '</div>';
        html += '<div class="chat-img">';
        html += '<img src="assets/images/users/5.jpg" alt="user" />';
        html += '</div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn">';
        html += '   <div class="chat-img">';
        if (mensaje.nombre !== 'Administrador') {
            html += '         <img src="assets/images/users/1.jpg" alt="user" />';
        }
        html += '    </div>';
        html += '   <div class="chat-content">';
        html += '       <h5>' + mensaje.nombre + '</h5>';
        html += '       <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';
    }
    divChatBox.append(html);
   scrollBottom() ;

}
formEnviar.on('submit', function (e) {
    e.preventDefault();
    if (txtMensaje.val().trim().length === 0) {
        return;
    }
    socket.emit('crearMensaje', {
        usuario: nombre,
        mensaje: txtMensaje.val()
    }, function (mensaje) {
        txtMensaje.val("").focus();
        console.log('respuesta server: ', mensaje);
        renderizarMensajes(mensaje, true);
       scrollBottom() ;
    });
});


