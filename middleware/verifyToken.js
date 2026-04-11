const jwt = require('jsonwebtoken');
const verifyToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'] 

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.decodedToken = decodedToken
    // console.log(req.decodedToken.phone)
    if(decodedToken){
        next()
    }
    
}
module.exports = verifyToken