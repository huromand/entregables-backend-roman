const express = require("express");
const app = express();
const handlebars = require("express-handlebars");

const hbs = handlebars.create(
    {
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views/layout",
    }
)

app.use(express.static("public"));

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

const Contenedor = require("./utils/contenedor");
const contenedor1 = new Contenedor("productos.json", "utf-8");

const PORT = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("formulario")
});

// GET "/api/productos" -> devuelve todos los productos
app.get("/api/productos", (req, res) => {
    let comp = contenedor1.getAll();
    console.log(comp.productos)
    if(comp.productos[0]==null){
        res.send(`<h1>No hay productos </h1>`)
    } else{
        res.render("tabla", contenedor1.getAll() );
    }
});

//POST "/api/productos" -> agrega un producto 
app.post("/api/productos", (req, res) => {
    contenedor1.save(req.body);
    res.render("tabla", contenedor1.getAll() );
});

app.listen(PORT, () => {
   console.log(`Servidor escuchando en puerto ${PORT}`);
});

