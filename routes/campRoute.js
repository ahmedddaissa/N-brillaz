const exress = require('express');
const router = exress.Router() ; 
const Camp = require ('../models/camp');
 


const multer =require('multer');
filename= '';
const mystorage = multer.diskStorage({
   destination:'./assets', 
   filename: (req,file, redirect)=>{
      let date = Date.now();
      let fl = date + '.' + file.mimetype.split('/')[1];
      redirect(null , fl);
      filename = fl ;
   }
})

const upload = multer({storage : mystorage}) ;

router.post('/createC',upload.any('image'), async (req,res)=>{

    try{
       data= req.body ;
       camp = new Camp(data); 
       camp.image=filename();
       savedCamp = await camp.save();
       filename=''; 
       res.status(200).send(savedCamp) ;
       
        
 
    }catch(error){
       res.status(400).send(error)
       
    }
    
 
 })
 
 router.get('/allC', async (req,res)=>{
    try{
       // id = req.params.id 
       Camp = await Camp.find();
       res.status(200).send(Camp);
    }
    catch (error) {
        {
          res.status(400).send(error);
       }
 
    }
 })
 
 router.delete('/delet/:id', async(req,res)=>{
    try{
       id = req.params.id ;
       Camp= await Camp.findOneAndDelete({_id: id})
       res.status(200).send(Camp);
       console.log('deleted with success')
    }
    catch(error){
      {
       res.status(400).send(error);
      } 
    }
 });
 
//  router.put('/upt/:id', async (req,res)=>{
//     try{
//        id= req.params.id ; 
//        newDataa= req.body ;
//        Camp= await Camp.findByIdAndUpdate({_id:id}, newDataa)
//        res.status(200).send(Camp);
//     }
//     catch(error){
//        {
//           res.status(400).send(error);
//        }
//     }
//  })
 
router.put('/updateC/:id', async(req,res)=>{
   try{
      id=req.params.id ;
      newDatta= req.body;
      camp= await Camp.findByIdAndUpdate({_id:id},newDatta)
      res.status(200).send(camp);
   }
   catch(error){
      {
         res.status(400).send(error);
      }

   }
})
router.post('/creat',async (req,res)=>{
   try{
      data = req.body ;
      camp = new Camp(data)
      savedCamp= await camp.save();
      res.status(200).send(savedCamp);
      console.log('campp addedd');
   }
   catch(error){
      res.status(400).send(error);

   }
})


module.exports= router ;