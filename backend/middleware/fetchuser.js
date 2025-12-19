const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "ANY_JWT_SECRET";


const fetchuser = (req, res, next)=>{
    const token = req.header('auth-token')
    if(!token) {
        res.status(401).send({message: "Please authenticate."})  
    }
    try  {
    const data = jwt.verify(token, JWT_SECRET)
    req.user = data.user;
    next();
}
    catch(error){
        res.status(401).send({message: "Please authenticate."})  
    }
}

module.exports=fetchuser;