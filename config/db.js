const mongoose = require('mongoose')

const connectionString = process.env.databaseURL

mongoose.connect(connectionString).then(res=>{
    console.log("Mongodb Atlas Database connected sucessfully");
}).catch(error=>{
    console.log("Database connection failed");
    console.log(error);
})