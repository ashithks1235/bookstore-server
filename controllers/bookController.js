const books = require('../model/bookModel')

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
            res.status(401).json("Book already existing!!! request failed")
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