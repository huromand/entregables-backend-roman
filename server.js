const express = require("express");
const app = express();
const fs = require("fs");

/*
cree un servidor con express y con la clase contenedor del desafío anterior recupero del archivo productos.json los datos que va entregar el servidor
*/

class Contenedor{
  constructor(archivo) {
      this.nombreDelArchivo = archivo;
  }

  save(obj){
      const data = fs.readFileSync(this.nombreDelArchivo, "utf-8");
      const items = JSON.parse(data);
      if(items.productos == ""){
          obj.id = 1;
          items.productos.push(obj);
      }else{
          obj.id = items.productos.length +1;
          items.productos.push(obj);
      }
      fs.writeFileSync("productos.json",JSON.stringify(items, null, 2))
  }

  getById(id){
      const data = fs.readFileSync(this.nombreDelArchivo, "utf-8");
      const items = JSON.parse(data);
      const { productos } = items;
      const producto = productos.find((item) => item.id == id);
      if( producto === undefined) return null;
      return producto;
  }

  getAll(){
      const data = fs.readFileSync(this.nombreDelArchivo, "utf-8");
      const items = JSON.parse(data);
      //console.log(items);
      return items;
  }

  deleteById(id){
      const data = fs.readFileSync(this.nombreDelArchivo, "utf-8");
      const items = JSON.parse(data);
      const { productos } = items;
      const newArray = productos.filter((item) => item.id !== id);
      items.productos = newArray;
      fs.writeFileSync("ejemplo.json",JSON.stringify(items, null, 2))
  }

  deleteAll() {
      const vacio = {"productos" : []}
      fs.writeFileSync(this.nombreDelArchivo, JSON.stringify(vacio));
      console.log(`Se eliminaron todos los productos del archivo: ${this.nombreDelArchivo}`);
  }
}

const contenedor1 = new Contenedor("productos.json", "utf-8");

let aleatorio = 1 + Math.floor(Math.random() * 3);

const PORT = 8080;

app.get("/", (req, res) => {
  res.send(`Bienvenidos a la ruta raiz, las rutas posibles son:\n
  \t/productos\n
  \t/productosRandom\n`);
});

app.get("/productos", (req, res) => {
   res.send(contenedor1.getAll());
});

app.get("/productoRandom", (req, res) => {
   res.send(contenedor1.getById(aleatorio));
});

app.listen(PORT, () => {
   console.log(`Servidor escuchando en puerto ${PORT}`);
});

//server.on("error", error => console.log(`Error: ${error}`));
