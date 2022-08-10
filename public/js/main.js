const socket = io();

let btnProducto = document.getElementById('enviarProducto');
let usuario = document.getElementById('usuario');
let mensaje = document.getElementById('texto');
let btnMensaje = document.getElementById('enviarMensaje');
let output = document.getElementById('mensajes');


btnMensaje.addEventListener('click', function(){
    socket.emit('mensajeChat', {
        usuario: usuario.value,
        mensaje: mensaje.value
    })
})

socket.on("mensajeChat", (obj) => {
    console.log(obj);
    output.innerHTML +=`<div class="d-flex"><p style="color:#405EF7">${obj.usuario}</p><p style="color:#906840">[${obj.dateTime}]: </p><p style="color:#71EB7A">${obj.mensaje}</p></div>`
})

socket.on("init",(obj)=>{
    for(let msj of obj.mensajes){
        output.innerHTML +=`<div class="d-flex"><p style="color:#405EF7">${msj.usuario}</p><p style="color:#906840">[${msj.dateTime}]: </p><p style="color:#71EB7A">${msj.mensaje}</p></div>`
    }
})

 socket.on("cargarProductos", (productos) => {
    const url = "http://localhost:8080/tabla.hbs";
    fetch(url).then((resp) => {
        return resp.text();
    }).then((text) => {
        const template = Handlebars.compile(text);
        const html = template(productos); //aaaaaaaaahjkfhsdkj lpm los corchetes
        //const html = template({productos}); 
        document.getElementById("items").innerHTML = html;
    });
})

btnProducto.addEventListener('click',(e)=>{
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const imagen = document.getElementById("imagen").value;

    const prod = {
        "nombre": nombre,
        "precio": precio,
        "imagen":imagen
    }

    socket.emit("productoAgregado",prod)
})