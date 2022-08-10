const express = require("express");
const app = express();
const path = require ('path');

const {Server : SocketServer} = require('socket.io');
const {Server : HTTPServer} = require('http');

const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);

app.use(express.static(path.join(__dirname,"public")));

const Contenedor = require("./utils/contenedor");
const ChatManager = require("./utils/chatManager");
const managerProductos = new Contenedor("productos.json", "utf-8");
const managerMensajes = new ChatManager("mensajes.json", "utf-8");

const mensajes = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

socketServer.on("connection", (socket)=>{
    
    console.log("Nueva conexion");

    socket.emit("cargarProductos", managerProductos.getAll())

    socket.emit("init", managerMensajes.getAll());

    socket.on("mensajeChat", (obj) => {
        console.log(obj)
        const dateTime = new Date();
        const fecha = dateTime.getDate() + '-' + ( dateTime.getMonth() + 1 ) + '-' + dateTime.getFullYear();
        const hora = dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();
        obj.dateTime=fecha+" "+hora;
        mensajes.push(obj);
        managerMensajes.save(obj);
        socketServer.sockets.emit('mensajeChat', obj );
    })

    socket.on("productoAgregado",(obj)=>{
        managerProductos.save(obj)
        socketServer.sockets.emit("cargarProductos", managerProductos.getAll())
    })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})