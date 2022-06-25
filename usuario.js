/*      Desafío Clase 2 Clases
        Comissión 31030
        Hugo Román Diyarian
*/
class Usuario{
    constructor( n, p ){
        this.nombre = n;
        this.apellido = p;
        this.libros = [];
        this.mascotas = [];
    }

    get fullName(){
        return `${this.nombre} ${this.apellido}`; 
    }

    addMascota(pet){
        this.mascotas.push(pet);
    }

    get countMascota(){
        return this.mascotas.length;
    }

    addBook(t, a){
        this.libros.push({ titulo:t , autor:a })
    }

    get bookNames(){
        let arrayLibros=[];
        this.libros.map(e=>{
            arrayLibros.push(e.titulo)
        })
        return arrayLibros;
    }
}

function imprimir(user){        //imprime usuario
    console.log(`\n\tNombre de usuario: ${user.fullName} \n
    Cantidad de mascotas: ${user.countMascota} \n
    Libros del usuario: ${user.bookNames}\n`);
}

const user1 = new Usuario( 'Natalia', 'Natalia' );      //creo objetos de la clase Usuario

const user2 = new Usuario( 'Jane', 'Doe' );

user1.addMascota('Firulais');   // setteo usuario1
user1.addMascota('Michi')
user1.addBook(' El tunel','Sabato');
user1.addBook(' La araña negra','Gotthelf');

user2.addMascota('Doradito')    // setteo usuario2
user2.addBook(' La pregunta de sus ojos','Sacheri');

imprimir(user1);

imprimir(user2);