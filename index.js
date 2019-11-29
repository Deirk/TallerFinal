//-----------Importar modulos e instancias-----//
// importar express
const express = require('express');
//Intanciar bodyparser despues de instalarlo en git bash
const bodyParser = require('body-parser');

//Instanciar mongo
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
//llamar las rutas
const createRoutes = require('./routes.js');
//linea de handle
var exphbs  = require('express-handlebars');

//Instanciar app
const app=express();

//Establecer la carpeta public como estatica
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

//lineas de handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



//-----------Vamos a usar Mongo-----//


//Para usar Mongo: crear variables (Paso 1)
const url = 'mongodb://localhost:27017';
const dbName = 'store';
const client = new MongoClient(url, { useNewUrlParser: true });


//Para usar Mongo: conectar (Paso 2)

  client.connect(function(err) {
    // asegurarnos de que no existe un error
    assert.equal(null, err);

    console.log('conexión');

    // conectamos el cliente a la base de datos que necesitamos
    const db = client.db(dbName);

    createRoutes(app, db);


// inicar servidor en el puerto definido anteriormente
app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
});

});