const app =  require('express')()
const db = require('./config/db')
const consign = require ('consign')
const mongoose = require('mongoose')


app.db = db
mongoose.connect('mongodb+srv://ongbr:4ivAF8Ho9dqKD0er@cluster0.giejo.mongodb.net/postgresql?retryWrites=true&w=majority', 
{useNewUrlParser: true , useUnifiedTopology: true}).then(() => {
    console.log('Mongodb Conectado....')
})

consign()
    .then('./config/middlewares.js')
    .then('./api/validator.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)
        

app.listen(3000, () =>{
    console.log('Backend Executando....')
})