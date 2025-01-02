const express = require('express')
const router = express.Router()
const User= require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "ANY_JWT_SECRET";
//Create a user using post "/api/auth/createuser". Doesnt require auth


router.post('/createuser',[
     body('name','Enter a valid name').isLength({ min: 3 }),
     body('email','Enter a valid email').isEmail(),
     body('password','Password must be of atleast 5 characters').isLength({ min: 5 }),
],async (req,res)=>{

     //If there are error return bad req and the errors 
const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //user with same email
try{
    let user = await User.findOne({email:req.body.email})
    if(user){
     return res.status(400).json({error:"Sorry the user with this email already exists"})
    }
    // hash password

    const salt =await  bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)

    //new user
    user = await  User.create({
     name: req.body.name,
     password: secPass,
     email: req.body.email,

   })
   const data = {
    user:{
      id:user.id  
      }
   }
 const authToken= jwt.sign(data, JWT_SECRET)
 
    res.json(authToken)
  }

    catch(error){
     console.error(error.message);
     res.status(500).send("Some error occured");
    }
})

module.exports = router