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
        fs.writeFileSync(this.nombreDelArchivo,JSON.stringify(items, null, 2))
        return obj.id;
    }

    mod(obj){
        const data = fs.readFileSync(this.nombreDelArchivo, "utf-8");
        const items = JSON.parse(data);
        const { productos } = items;
        const newArray = productos.filter((item) => item.id !== obj.id);
        items.productos = newArray;
        items.productos.push(obj);
        fs.writeFileSync(this.nombreDelArchivo,JSON.stringify(items, null, 2))
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
        fs.writeFileSync(this.nombreDelArchivo,JSON.stringify(items, null, 2))
    }
  
    deleteAll() {
        const vacio = {"productos" : []}
        fs.writeFileSync(this.nombreDelArchivo, JSON.stringify(vacio));
        console.log(`Se eliminaron todos los productos del archivo: ${this.nombreDelArchivo}`);
    }
  }

module.exports = Contenedor;