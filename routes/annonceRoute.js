const exress = require('express');
const router = exress.Router() ; 
const Annonce = require ('../models/annonce');
 


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

router.post('/createp',upload.any('image'), async (req,res)=>{

    try{
       data= req.body ;
       ann = new Annonce(data); 
       ann.image=filename();
       savedAnnonce = await ann.save();
       filename=''; 
       res.status(200).send(savedAnnonce) ;
        
 
    }catch(error){
       res.status(400).send(error)
       
    }
    
 
 })
 
 router.get('/allano', async (req,res)=>{
    try{
       // id = req.params.id 
       annonce = await Annonce.find();
       res.status(200).send(annonce);
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
       annonce= await Annonce.findOneAndDelete({_id: id})
       res.status(200).send(annonce);
    }
    catch(error){
      {
       res.status(400).send(error);
      } 
    }
 });
 
 router.put('/upt/:id', async (req,res)=>{
    try{
       id= req.params.id ; 
       newDataa= req.body ;
       annonce= await Annonce.findByIdAndUpdate({_id:id}, newDataa)
       res.status(200).send(annonce);
    }
    catch(error){
       {
          res.status(400).send(error);
       }
    }
 })
 
// router.put('/f/:id', async(req,res)=>{
//    try{
//       id=req.params.id ;
//       newDatta= req.body;
//       annonce= await Annonce.findByIdAndUpdate({_id:id},newDatta)
//       res.status(200).send(annonce);
//    }
//    catch(error){
//       {
//          res.status(400).send(error);
//       }

//    }
// })
router.post('/new',async (req,res)=>{
   try{
      data = req.body ;
      ann = new Annonce(data)
      saveAn= await ann.save();
      res.status(200).send(saveAn);
   }
   catch(error){
      res.status(400).send(error);

   }
})


module.exports= router ;