// import mongoose
const mongoose = require('mongoose')

//define schema
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    pages:{
        type:Number,
        required:true
    },
    imageURL:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number,
        required:true
    },
    abstract:{
        type:String,
        required:true
    },
    publisher:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    isbn:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    uploadIMG:{
        type:Array,
        required:true
    },
    sellerMail:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    buyerMail:{
        type:String,
        default:''
    }
})

// create model
const books = mongoose.model("books",bookSchema)

// export model
module.exports = books