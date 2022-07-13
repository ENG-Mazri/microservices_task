const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const User = db.User;

exports.login = async (req, res)=>{
    try {
        const {email} = req.body;
        const {password} = req.body;
        const data = await User.findOne({where:{email}})
        // res.send(data)
        if(data){
            bcrypt.compare(password, data.password, (err,result)=>{
                if(result){
                    const token = jwt.sign({email}, process.env.SECRET_KEY);
                    res.cookie('jwt', token, {httpOnly:true, maxAge: 24*60*60* 1000})
                    res.json({email, token})
                }else if(!result){
                    res.json("incorrect password")
                }else{
                    res.json("there is an error")
                }
            })
        }else{
            res.json("please register first")
        }
        
    } catch (error) {
        console.log(error)
    }
}