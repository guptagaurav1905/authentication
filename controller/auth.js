const middleware = require('../middleware')
const { validPhone } = require('../middleware/validate')
const service = require('../service')
const config = require('../config')
const { ErrorResponse, HttpStatusCode, HttpDefaultMessage } = require('../utils/response')

const authWithOtp = async(req,res) =>{
    console.log(req.body)
    if (!req.body?.number){
        return new ErrorResponse(
            HttpStatusCode.BAD_REQUEST,
            config.constants.constents.EMPTYFIELD
        )
    }
    const {number} = req.body
    if(number){
        validNumber = middleware.validate.validPhone(number)
        if(!validNumber){
            return new ErrorResponse(
                HttpStatusCode.BAD_REQUEST,
                config.constants.constents.VALIDFORMAT
            )
        }
    }
    const loginData = await service.auth.loginWithOtp(number)
    res.send(loginData)
}



const authWithEmail = async(req,res) =>{
    console.log(req.body)
    if (!req.body?.email){
        return new ErrorResponse(
            HttpStatusCode.BAD_REQUEST,
            config.constants.constents.EMPTYFIELD
        )
    }
    const {email} = req.body
    if(email){
        validEmail = middleware.validate.validEmail(email)
        if(!validEmail){
            return new ErrorResponse(
                HttpStatusCode.BAD_REQUEST,
                config.constants.constents.VALIDFORMAT
            )
        }
    }
    const loginData = await service.loginotp.loginWithEmail(email)
    res.send(loginData)
}




const twoFactor = async(req,res)=>{
    const{email,password} = req.body
    const data  = await service.auth.twoFactorAuth(email,password)
}

const authWithPsd = async(req,res)=>{
    const{email,password} = req.body
    const data  = await service.auth.loginWithPsd(email,password)
    res.send(data)
}

const createUser = async(req,res)=>{
    console.log(req)
    const { email, password } = req.body;
    const createUser = await service.auth.createUser(email, password);
    res.send(createUser);

}

const verifyUser = async(req,res)=>{
    const{otp} = req.body
    const verify = await service.auth.UserVerification(otp)
    res.send(verify)

}
module.exports = {authWithOtp,authWithEmail,authWithPsd,createUser,twoFactor,verifyUser}