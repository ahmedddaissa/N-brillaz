const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); 
const router = express.Router();


router.post('/register', async(req,res)=>{
    data = req.body;
 
    usr = new User(data);
 
   salt=bcrypt.genSaltSync(10);
   cryptedPass= await bcrypt.hashSync(data.password, salt);
   usr.password= cryptedPass;
   usr.save()
   
    .then(
       (saved)=>{
          res.status(200).send(saved)
       }
    ).catch(
       (err)=>{
          res.status(400).send(err)
       }
       
    )
    
 })
 
 router.post('/login', async (req,res)=>{
    data = req.body;
    user =await User.findOne({email: data.email})
    if(!user){
       res.status(401).send('email or password invalid ! ')
    }
    else{
       validPass= bcrypt.compareSync(data.password, user.password)
       if(!validPass){
          res.status(401).send('email or password invalid!')
       }
       else{
          payload={
             _id: user._id,
             email: user.email,
             name :user.name
          }
          token=jwt.sign(payload,'1234567')
          res.status(200).send({mytoken:token})
       }
    }
 })


 
module.exports = router;
