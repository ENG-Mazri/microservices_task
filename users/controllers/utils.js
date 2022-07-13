const jwt = require("jsonwebtoken");
require('dotenv').config()

const isValidUser = (user)=>{
    const isValidEmail = typeof user.email == 'string' &&
                                user.email.trim() != '';
    const isValidPassword = typeof user.password == 'string' &&
                                user.password.trim() != '' &&
                                user.password.trim().length >=6;
    return isValidEmail && isValidPassword;
}

const tokenValidator = (req,res, next) => {
    try {
        const token = req.header("jwt");
        if(token){
            jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken)=>{
                if(err){
                    console.log(err.message)
                    res.json({isValidToken:false})
                }else{
                    next()
                }
            })
    
        }else{
            res.json("Can not find JWT")
      
        }
        
    } catch (error) {
        console.log(error.message)
        res.json("Try to login first")
    }
}

module.exports = {isValidUser,tokenValidator}