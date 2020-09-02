const app =  require('express')()
// const db = require('./config/db')
const consign = require ('consign')
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
var uri = "mongodb+srv://ongbr:4ivAF8Ho9dqKD0er@cluster0.giejo.mongodb.net/postgresql?retryWrites=true&w=majority"

app.db = MongoClient
app.uri = uri
app.dbName = "queroajudar"
// mongoose.connect('mongodb+srv://ongbr:4ivAF8Ho9dqKD0er@cluster0.giejo.mongodb.net/postgresql?retryWrites=true&w=majority', 
// {useNewUrlParser: true , useUnifiedTopology: true}).then(() => {
//     console.log('Mongodb Conectado....')
// })

consign()
    .then('./config/middlewares.js')
    .then('./api/validator.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)
        

app.listen(3000, () =>{
    console.log('Backend Executando....')
})

// var express = require('express')
// const bodyParser = require('body-parser')
// const mongo = require('mongodb').MongoClient

// const port = 3000
// var app = express()

// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )

// var MongoClient = require('mongodb').MongoClient
// var uri = "mongodb+srv://ongbr:4ivAF8Ho9dqKD0er@cluster0.giejo.mongodb.net/postgresql?retryWrites=true&w=majority"

// const getDefault = (request, response) => {
//     response.status(200).send('API no ar');
// }

// const userInsert = (request, response) => {
//     const { userName, password } = request.body
  
//     MongoClient.connect(uri, function(err, client) {
//       const collection = client.db("login").collection("user");
  
//       collection.find({"userName": userName}).toArray(function (err, result) {
//         if (result.length > 0) {
//           response.status(400).send('Já existe um usuário com esse nome');
//         } else {
//           var document = {userName:userName, password:password};
//           collection.insertOne(document, {w: 1}, function(err, records){
//             if (err) {
//               response.status(400).send(err);
//             } else {
//               response.status(200).send('Usuário inserido com sucesso');
//             }
//           });
//         }
//       })
//     });
//   }

//   const userGet = (request, response) => {
//     MongoClient.connect(uri, function(err, client) {
//       const collection = client.db("login").collection("user");
  
//       collection.find().toArray(function (err, result) {
//         console.log(result)
//         response.status(200).send(result);
//       })
//     });
// }

// app.get('/', getDefault)
// app.post('/user', userInsert)
// app.get('/user', userGet)

// app.listen(port, () => {
//     console.log(`App running on port ${port}.`)
//   })
  
// module.exports = app