const express = require('express');
const router = express.Router() ; 
const User = require('../models/user') ;
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');


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


router.post('/add', (req , res )=>{
    data= req.body ;
 
    usr = new User (data); 
    usr.save()
    
       .then(
          (savedUser)=>{
             res.status(200).send(savedUser)
          }
 
       )
       .catch(
          (err)=>{
             res.status(400).send(err)
          }
       )
       console.log('user added to the database');
 });
 
 router.post('/create', async (req,res)=>{
 
    try{
       data= req.body ;
       usr = new User(data); 
       savedUser = await usr.save();
       res.send(savedUser) ; 
 
    }catch(error){
       res.send(error)
       
    }
    
 
 })
 
 
 
 router.get('/getall', (req, res)=>{
 
    User.find()
    .then(
       (users)=>{
          res.send(users);
       }
 
    )
    .catch(
       (err)=>{
          res.send(err)
       }
    )
 
    // console.log('get work')
 });
 
 router.get('/all',async(req, res)=>{
 
 
    try{
       users = await User.find(); 
       res.send(users);
 
    }
    catch (error) {
       res.send(error)
 
    }
 });
 
 router.get('/getbyid/:id',(req, res)=>{
    myid= req.params.id ;
 
    User.findOne({_id: myid})
       .then(
          (user)=>{
             res.send(user)
          }   
       )
       .catch(
          (err)=>{
             res.send(err)
          }
       )
 })
 
 router.get('/getid/:id', async (req,res)=>{
    try{
       id = req.params.id ;
       users = await User.findById({_id :  id});
       res.send(users);
    }
    catch (error) {
        {
          res.send(error);
       }
 
    }
 })
 
 router.delete('/dele/:id', async(req,res)=>{
    try{
       id = req.params.id ;
       users= await User.findOneAndDelete({_id: id})
       res.send(users);
    }
    catch(error){
      {
       res.send(error);
      } 
    }
    console.log('user deleted from DB')
 });
 
 router.put('/update/:id', (req, res)=>{
    id = req.params.id ;
    newData= req.body;
    User.findByIdAndUpdate({_id: id }, newData)
    .then(
       (updateUser)=>{
          res.send(updateUser);
       }
    )
    .catch(
       (err)=>{
          res.send(err);
       }
    )
 });
 router.put('/up/:id' , async (req,res)=>{
    try{
       id =req.params.id; 
       newData= req.body ; 
       
       updatedUser= await User.findByIdAndUpdate({_id: id }, newData);
       res.send(updateUser);
 
    }
    catch(error){
       {
          res.send(error);
       }
 
 
    }
 })

 
module.exports= router ;