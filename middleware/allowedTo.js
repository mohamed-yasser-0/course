const appError = require("../utils/appError")

module.exports = (...roles) => {
    return(req,res,next)=>{
        console.log(req.decodedToken.role)
            if(!roles.includes(req.decodedToken.role)){
                return next(appError.create('this role is not authuiazed', 401))
            }
        next()
    }
}
