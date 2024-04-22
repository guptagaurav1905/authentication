const utils = require('../utils')

const verifyToken = (req,res,next)=>{
    try {
        console.log('1')
        const token = req.headers.authorization
        console.log("token", token.split('.').length)
        console.log('---------2-------')
        console.log(token.split(' ')[0])
        console.log('-------3---------')
        if(!token || 
            token.split('.').lenght === 3 
            || token.split(' ')[0] !== 'Bearer' 
        ){
            return res.status(401).json({ message: 'Missing Authorization header' });
        }

        const jwttoken = token.split('.')[1]
        console.log('jwttoken',jwttoken)
        const decoded = utils.auth.verifyToken(jwttoken)
        console.log(decoded)
        if(!decoded){
            return res.status(401).json({ message: 'Missing Authorization header' });
        }
        if(decoded.issuer != process.env.JWT_SECRET){
            return res.status(401).json({ message: 'Missing Authorization header' });
        }

        req.user = decoded
    }
    
    catch (error) {
        return error
        
    }
}


module.exports = {verifyToken}