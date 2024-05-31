const express = require('express');
const router = express.Router();
const {user}=require('../models/user')

router.post('/', async(req, res) => {
    try{
    const { Name, email, password, confirmpassword } = req.body;
    if(!Name ||!email||!password){
        res.status(400).send("all field are required");
    }
    if(password!=confirmpassword){
        res.status(400).send("password and confirmpassword must be same");
    }
    const check=await user.findOne({Email:email});
    // console.log("fjna")
    if(check){
        res.status(400).send("user already exists with this email");
    }
    const Users=new user({
        Email:email,
        Name:Name,
        Password:password
    })
    await Users.save();
    res.status(201).send("account is created succesfully");
}
catch(err){
  res.status(400).send("something wrong")
}

 
});

module.exports = router;
