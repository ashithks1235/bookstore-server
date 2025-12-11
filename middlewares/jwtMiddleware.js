const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("inside middleware");
    // get token
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    if(token){
        //verify token
        try{
            const jwtResponse = jwt.verify(token,process.env.JWTSECRET)
            console.log(jwtResponse);
            req.payload = jwtResponse.userMail
            next()
        }catch(err){
            res.status(401).json("Authorisation failed !! invalid token")
        }
    }else{
        res.status(401).json("authorisation failed!! token invalid")
    }
}

module.exports = jwtMiddleware