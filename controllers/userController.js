const users = require('../model/userModel')
const jwt = require('jsonwebtoken')

// register
exports.registerController = async (req,res) =>{
    console.log("Inside registerController");
    const {username,email,password} = req.body
    // console.log(username,email,password);
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(409).json("User already existing... please login")
        }else{
            const newUser = await users.create({
                username,email,password
            })
            res.status(200).json(newUser)
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
    // res.status(200).json("Request Received")
    
}

// login
exports.loginController = async (req,res) => {
    console.log("inside logincontroller");
    const {email,password} = req.body
    // console.log(username,email,password);
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            if(password === existingUser.password){
                const token = jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.JWTSECRET)
                res.status(200).json({user:existingUser,token})
            }else{
                res.status(401).json("incorrect email / password")
            }
        }else{
            res.status(404).json("account does not exists")
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
    
}

// google login
exports.googleLoginController = async (req,res) => {
    console.log("inside googleLogincontroller");
    const {email,password,username,picture} = req.body
    // console.log(username,email,password,picture);
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            // login
            const token = jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.JWTSECRET)
            res.status(200).json({user:existingUser,token})
        }else{
            //register
            const newUser = await users.create({
                username,email,password,picture
            })
            const token = jwt.sign({userMail:newUser.email,role:newUser.role},process.env.JWTSECRET)
            res.status(200).json({user:newUser,token})
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
    
}

// user profile edit
// admin profile edit