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

MongoClient.connect(`mongodb+srv://cluster0-szzo5.mongodb.net/store?retryWrites=true&w=majority`,

{
  auth: {
    user: 'majo_derik',
    password: '03132000'

  }
},

function (err, client) {
  if (err) throw err;
  const db = client.db(dbName);

  createRoutes(app, db);

  //Iniciar servidor
  app.listen(process.env.PORT || 3000);}
);