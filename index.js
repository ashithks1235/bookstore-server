// import express,cors,dotenv into index.js file

// Loads .env file contents into process.env by default
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./config/db')

// create express server using express
const bookstoreServer = express()
// enable cors in server
bookstoreServer.use(cors())
// use json parser in server app
bookstoreServer.use(express.json())
// use router in server app
bookstoreServer.use(router)
//to enable static file in server
bookstoreServer.use('/uploads',express.static('./uploads'))
// create a port for server app to view in web
const PORT = 3000
// server start to listen port for client requset
bookstoreServer.listen(PORT,()=>{
    console.log("Bookstore Server Started...And waiting for client request");
    
})

bookstoreServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>Bookstore server started... And waiting for client request!!!</h1>`)
})