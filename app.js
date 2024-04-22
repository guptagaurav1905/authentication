require('dotenv').config();

const express = require("express")
const route = require('./router')


const app = express()

app.use(express.json());
app.use('/' , route)




const port = 8080
app.listen(port , ()=> console.log(`App listening on port ${port} `))

module.exports = app
