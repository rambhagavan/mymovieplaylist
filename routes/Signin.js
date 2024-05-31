const router=require('express').Router();
const {v4:uuid}=require('uuid');
const cookieParser = require('cookie-parser');
const {user}=require('../models/user')
const {setuser,getuser}=require('../middleware/authentication')

router.post('/',async(req,res)=>{
  try{
     const {Email,Password}=req.body;
     if(!Email ||!Password){
        return res.status(400).send("all field are required")
     }
     const check=await user.findOne({Email:Email,Password:Password});
     if(!check){
       return res.status(400).send("user does not exist");
     }
     const sessionId=uuid();
     setuser(sessionId,Email);
     res.cookie("uid",sessionId);
    return res.status(200).redirect('/Home')
  }
  catch(err){
   return res.send(400).send("something went wrong");
  }
})

module.exports=router;