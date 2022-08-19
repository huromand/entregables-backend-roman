const express = require('express');
const app = express();

const PORT = 8080;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Ruta estatica
app.use(express.static(__dirname + '/public'));

//Rutas de la api
app.use('/api', require('./router/Rutas'))

app.use((req, res,next) => {
    res.status(404).render("404");
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})