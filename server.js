const express = require("express");
const app = express();

const {Server : SocketServer} = require('socket.io');
const {Server : HTTPServer} = require('http');

const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);

app.use(express.static("public"));

const Contenedor = require("./utils/contenedor");
const managerProductos = new Contenedor("productos.json", "utf-8");
const managerMensajes = new Contenedor("mensajes.json", "utf-8");

const messages = [];

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

socketServer.on("connection", (socket)=>{
    
    socket.emit("INIT", managerMensajes.getAll());
  
  
    socket.emit("PRODUCTS", managerProductos.getAll())
   
    socket.on("PRODUCT_ADDED",(obj)=>{
        managerProductos.save(obj)
        socketServer.sockets.emit("PRODUCTS", managerProductos.getAll())
    })
  
    socket.on("POST_MESSAGE", (msg)=>{
        const dateTime = new Date();
        const fecha = dateTime.getDate() + '-' + ( dateTime.getMonth() + 1 ) + '-' + dateTime.getFullYear();
        const hora = dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();
        msg.dateTime=fecha+" "+hora;
        messages.push(msg);
        managerMensajes.save(msg);
        socketServer.sockets.emit("NEW_MESSAGE",msg)
    })
  
})

app.listen(PORT, () => {
   console.log(`Servidor escuchando en puerto ${PORT}`);
});

