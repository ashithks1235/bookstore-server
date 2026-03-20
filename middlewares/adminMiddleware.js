const jwt = require('jsonwebtoken')

const adminMiddleware = (req,res,next)=>{
    console.log("inside adminmiddleware");
    // get token
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    if(token){
            //verify token
            try{
                const jwtResponse = jwt.verify(token,process.env.JWTSECRET)
                console.log(jwtResponse);
                req.payload = jwtResponse.userMail
                const role = jwtResponse.role
                if(role=="admin"){
                    next()
                }else{
                    res.status(401).json("Authorisation failed !! unauthorised user")
                }
            }catch(err){
                res.status(401).json("Authorisation failed !! invalid token")
            }
        }else{
            res.status(401).json("authorisation failed!! token invalid")
        }
}

module.exports = adminMiddleware