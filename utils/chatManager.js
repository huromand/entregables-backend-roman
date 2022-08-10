const fs = require("fs");

class ChatManager{
    constructor(archivo) {
        this.nombreDelArchivo = archivo;
    }

    save(obj){
        const data = fs.readFileSync(this.nombreDelArchivo, "utf-8");
        const items = JSON.parse(data);
        if(items.mensajes == ""){
            obj.id = 1;
            items.mensajes.push(obj);
        }else{
            obj.id = items.mensajes.length +1;
            items.mensajes.push(obj);
        }
        fs.writeFileSync(this.nombreDelArchivo,JSON.stringify(items, null, 2))
        return obj.id;
    }

    getAll(){
        const data = fs.readFileSync(this.nombreDelArchivo, "utf-8");
        const items = JSON.parse(data);
        //console.log(items);
        return items;
    }
}

module.exports = ChatManager;