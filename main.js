const fs = require("fs");

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
        fs.writeFileSync("ejemplo.json",JSON.stringify(items, null, 2))
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
        console.log(items);
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

const contenedor1 = new Contenedor("ejemplo.json", "utf-8");

const producto1 = {
    nombre: "ROBOT 1",
    precio: 49000,
    imagen: "https://robohash.org/1",
};
const producto2 = {
    nombre: "ROBOT 2",
    precio: 71000,
    imagen: "https://robohash.org/2",
};
const producto3 = {
    nombre: "ROBOT 3",
    precio: 54000,
    imagen: "https://robohash.org/3",
};

contenedor1.save(producto1);
contenedor1.save(producto2);
contenedor1.save(producto3);

console.log(contenedor1.getById(3));

contenedor1.getAll();

contenedor1.deleteById(1)

contenedor1.getAll();

contenedor1.deleteAll();

