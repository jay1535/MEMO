const express = require('express')
const router = express.Router()
const User= require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "ANY_JWT_SECRET";

//Create a user using post "/api/auth/createuser". Doesnt require auth # route 1


router.post('/createuser',[
     body('name','Enter a valid name').isLength({ min: 3 }),
     body('email','Enter a valid email').isEmail(),
     body('password','Password must be of atleast 5 characters').isLength({ min: 5 }),
],async (req,res)=>{
  let success = false;

     //If there are error return bad req and the errors 
const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    //user with same email
try{
    let user = await User.findOne({email:req.body.email})
    if(user){
     return res.status(400).json({success,error:"Sorry the user with this email already exists"})
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
   success=true;
    res.json({success,authToken})
  }

    catch(error){
     console.error(error.message);
     res.status(500).send("Some internal error occured");
    }
})



//Authentication  #Login Route 2

router.post('/login',[
 
  body('email','Enter a valid email').isEmail(),
  body('password','Password Cannot be blank').exists(),

],async (req,res)=>{
  let success = false
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error:"Please try to login with correct username or password"})
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      success = false;
      return res.status(400).json({success,error:"Please try to login with correct username or password"});
    }

    const data ={
      user:{
        id: user.id
      }
    }
    const authToken= jwt.sign(data, JWT_SECRET)
    success = true;
 
    res.json({success,authToken})
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Some internal error occured");
   }
  });



  // Logged in user Details # Route 3
  router.post('/getuser',fetchuser,async (req,res)=>{
try {
 const userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user)
}  catch(error){
  console.error(error.message);
  res.status(500).send("Some internal error occured");
 }
  });
module.exports = router