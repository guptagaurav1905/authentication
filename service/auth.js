const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const bcrypt = require('bcrypt');
const integration = require('../integration')
const { ErrorResponse, SuccessResponse, HttpDefaultMessage, HttpStatusCode } = require('../utils/response');
const utils = require('../utils')
const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator');
const { hashPassword } = require('../utils/crypto');


req.headers({
    "authorization": "HexCXtYuF5lgcIwi6nbRjDOvSQr3Z9PJU4q82M0TABGzNLKo7pZbVmN5JzIcpEUdMGX92YynD0WsvOlg"
  });

// object for sending mail 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user : 'guptatanu353@gmail.com',
        pass :  'fauz pqlh nucd xwlp'
    }
})  


// 
const createUser = async(email,password)=>{
    try {
        const hashPswd = await utils.crpto.hashPassword(password)
        const userData = {email,password:hashPswd}
        const data = integration.auth.createUser(userData)
        if (data){
            return { message: 'Success'};
        }
    } catch (error) {
        return error
    }
}


const twoFactorAuth = async(email,password)=>{
    const data = await integration.user.getById(email)
    if (!data){
        return { message: 'Unauthorized' };
    }
    hashedPassword = data.password
    const isMatch = bcrypt.compareSync(password,hashedPassword)
    if(isMatch){
        verificationCode = otpGenerator.generate(6, { lowerCaseAlphabets : false , upperCaseAlphabets: false, specialChars: false })
        const login = await integration.auth.update(verificationCode,email)
        if(!login){
            res.status(500)
        }
        const mailOptions = {
            from: 'guptatanu353@gmail.com',
            to: email,
            subject: 'Verification Code',
            text: `Your verification code is: ${verificationCode}`,
          };
        
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Failed to send verification code');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Verification code sent successfully');
        }
        });  
        
    }

}

// Login With otp 
const loginWithOtp = async(number)=>{
    try{
        const loginData = {
            Number: number,
            Otp: otpGenerator.generate(6, { lowerCaseAlphabets : false , upperCaseAlphabets: false, specialChars: false })
        };
        const checkExistingUser = await integration.user.userExist(number)
        if (checkExistingUser) {
            const data = await integration.auth.updateOtp(loginData);
            if (data){
                req.form({
                    "variables_values": loginData.Otp,
                    "route": "otp",
                    "number": "8000559055",
                  });
                req.end(function (res) {
                    if (res.error) throw new Error(res.error);
                  
                    console.log(res.body);
                  });
            }
        }else{
            const data = await integration.auth.create(loginData)
            if (data){
                req.form({
                    "variables_values": loginData.Otp,
                    "route": "otp",
                    "numbers": "8000559055",
                  });
                  
                  req.end(function (res) {
                    if (res.error) throw new Error(res.error);
                  
                    console.log(res.body);
                  });
            }
        }
    } catch(error){
        return new ErrorResponse(
            HttpStatusCode.SERVER_ERROR,
            HttpDefaultMessage.SERVER_ERROR,
            error
        )
    }
}


const loginWithPsd = async(email,password)=>{
    const data = await integration.user.getById(email)
    if (!data){
        return new ErrorResponse(
            HttpStatusCode.UNAUTHORIZED,
            HttpDefaultMessage.UNAUTHORIZED
        )
    }
    hashedPassword = data.password
    const isMatch = bcrypt.compareSync(password,hashedPassword)
    if (isMatch){
        const createToken = utils.auth.createToken(data)
        const payload = {
            user:{
                email: data?.email
            },
            token : createToken
        }
        return new SuccessResponse(
            payload,
            HttpStatusCode.OK
        )
    }
}


const UserVerification = async(otp)=>{
    const savedOtp = await integration.auth.getById(otp)

}


module.exports = {loginWithOtp,loginWithPsd,createUser,twoFactorAuth,UserVerification}