const books = require('../model/bookModel')
const stripe = require('stripe')(process.env.STRIPESECRET);

// add book
exports.addBookController = async (req,res)=>{
    console.log("Inside addBookController");
    // get data from req body
    const {title,author,page,imageURL,price,discountPrice,abstract,publisher,language,isbn,category} = req.body
    const uploadIMG = req.files.map(item=>item.filename)
    const sellerMail = req.payload
    console.log(title,author,page,imageURL,price,discountPrice,abstract,publisher,language,isbn,category,uploadIMG,sellerMail);
    
    try{
        const existingBook = await books.findOne({title,sellerMail})
        if(existingBook){
            res.status(409).json("Book already existing!!! request failed")
        }else{
            const newBook = await books.create({
                title,author,pages:page,imageURL,price,discountPrice,abstract,publisher,language,isbn,category,uploadIMG,sellerMail
            })
            res.status(200).json(newBook)
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }
}

//get homepage books - guest user
exports.getHomeBookController = async (req,res)=>{
    console.log("inside getHomeBookController");
    try{
        const homeBooks = await books.find().sort({_id:-1}).limit(4)
        res.status(200).json(homeBooks)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

//get user allbooks page - authorised user

exports.getUserAllBooksController = async (req,res)=>{
    console.log("inside getuserallbookscontroller");
    const searchKey = req.query.search
    console.log(searchKey);
    
    const loginUserMail = req.payload
    try{
        const allBooks = await books.find({sellerMail:{$ne:loginUserMail},title:{$regex:searchKey,$options:'i'}})
        res.status(200).json(allBooks)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

//get user uploads books - authorised user
exports.getUserProfileBooksController = async (req,res)=>{
    console.log("inside getuserprofilebookscontroller");
    const loginUserMail = req.payload
    try{
        const userBooks = await books.find({sellerMail:loginUserMail})
        res.status(200).json(userBooks)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}


//get user bought books - authorised user
exports.getUserBoughtBooksController = async (req,res)=>{
    console.log("inside getuserboughtbookscontroller");
    const loginUserMail = req.payload
    try{
        const userBooks = await books.find({buyerMail:loginUserMail})
        res.status(200).json(userBooks)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

// get a single book details
exports.viewBookController = async (req,res)=>{
    console.log("inside viewBookController");
    const {id} = req.params
    try{
        const userBook = await books.findById({_id:id})
        res.status(200).json(userBook)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

//get all books
exports.getAllBooksController = async (req,res)=>{
    console.log("inside getallbookscontroller");
    try{
        const allBooks = await books.find()
        res.status(200).json(allBooks)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

//update book status
exports.updateBookStatusController = async (req,res)=>{
    console.log("inside updatebookstatuscontroller");
    //get id of book from url
    const {id} = req.params
    try{
        const updateBook = await books.findById({_id:id})
        updateBook.status = "approved"
        await updateBook.save()
        res.status(200).json(updateBook)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

//delete book
exports.deleteBookController = async (req,res)=>{
    console.log("inside deletebookcontroller");
    //get id of book from url
    const {id} = req.params
    try{
        const bookDetails = await books.findByIdAndDelete({_id:id})
        res.status(200).json(bookDetails)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

// book payment
exports.bookPaymentController = async (req,res)=>{
    console.log("inside bookpaymentcontroller");
    // get book details from id from url
    const {id} = req.params
    // from email from payload
    const email = req.payload
    try{
        const bookDetails = await books.findById({_id:id})
        bookDetails.status = "sold"
        bookDetails.buyerMail = email
        await bookDetails.save()
        const line_items = [{
            price_data:{
                currency:'usd',
                product_data : {
                    name:bookDetails.title,
                    description:`${bookDetails.author} | ${bookDetails.publisher}`,
                    images:bookDetails.uploadIMG,
                    metadata:{
                        title:bookDetails.title,
                        author:bookDetails.author,
                        imageURL:bookDetails.imageURL,
                        price:bookDetails.price
                    }
                },
                unit_amount:Math.round(bookDetails.discountPrice*100)
            },
            quantity:1
        }]
            const session = await stripe.checkout.sessions.create({
                payment_method_types:['card'],
                line_items,
                mode: 'payment',
                success_url: 'http://localhost:5173/payment-success',
                cancel_url: 'http://localhost:5173/payment-failure'
                });
            console.log(session);
            res.status(200).json({checkOutURL:session.url})
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
    
}