/*
cree un servidor con express y con la clase contenedor del desafío anterior recupero del archivo productos.json los datos que va entregar el servidor
*/

const express = require("express");
const app = express();

const Contenedor = require("./utils/contenedor");
const contenedor1 = new Contenedor("productos.json", "utf-8");
//const upload = require("./storage");

const PORT = 8080;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
//   res.send(`<h1>Bienvenidos a la ruta raiz</h1>`);
});

// GET "/api/productos" -> devuelve todos los productos
app.get("/api/productos", (req, res) => {
    res.send(contenedor1.getAll());
});

// GET "/api/productos/:id" -> devuelve el producto segun parametro id
app.get("/api/productos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if(contenedor1.getById(id)==null){
        res.send("Producto no encontrado")
    } else {
    res.send(contenedor1.getById(id));
    }
});

//POST "/api/productos" -> agrega un producto 
app.post("/api/productos", (req, res) => {
    contenedor1.save(req.body);
    res.send(contenedor1.getAll());
});

//PUT "/api/productos/:id" -> modifico un prodroducto 
app.put("/api/productos/:id", (req, res) => {
    contenedor1.mod(req.body);
    res.send(contenedor1.getById(parseInt(req.params.id)));
});

// DELETE "/api/productos/:id" -> devuelve el producto segun parametro id
app.delete("/api/productos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    res.send(contenedor1.deleteById(id));
});

app.listen(PORT, () => {
   console.log(`Servidor escuchando en puerto ${PORT}`);
});

//server.on("error", error => console.log(`Error: ${error}`));
