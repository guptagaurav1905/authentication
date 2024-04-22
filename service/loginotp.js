const integration = require('../integration')
const { ErrorResponse, SuccessResponse, HttpDefaultMessage, HttpStatusCode } = require('../utils/response');
const utils = require('../utils')
const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator');


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


OTP_TIME = [0,30,60,120,240,300]

const resendOtp  = async(email)=>{
    try {
        if(!email){
            return new ErrorResponse (
                HttpStatusCode.BAD_REQUEST,
                HttpDefaultMessage.BAD_REQUEST
            )
        }
        const getData = await integration.user.getData(email)
        if (!getData){
            return new ErrorResponse(
                HttpStatusCode.UNAUTHORIZED,
                HttpDefaultMessage.UNAUTHORIZED
            )
        }
        else{
            const currentTime = Date.now()
            const lastTime = getData.last_request
            if ((currentTime-lastTime)/1000 < OTP_TIME[request_count]){
                return new ErrorResponse(
                    HttpStatusCode.BAD_REQUEST,
                    //****************`Please wait ${waitTime} seconds before resending OTP` }**********
                )
            }

            if ((getData.request_count == process.env.MAX_OTP) & ((currentTime - lastTime)/1000  <  900) ){
                return new ErrorResponse(
                    HttpStatusCode.FORBIDDEN,
                    'You have excedded the most number of resend please wait for 15 min'
                )
            }`z`

            const loginData = {
                email: email,
                Otp: otpGenerator.generate(6, { lowerCaseAlphabets : false , upperCaseAlphabets: false, specialChars: false }),
                expiration: Date.now() + process.env.OTP_EXPIRATION_TIME * 1000,
                request_count : getData.request_count + 1,
                last_request : Date.now()
            }; 

            const data = await integration.auth.updateUserWithEmail(loginData);
            if (data){
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
    } catch (error) {
        return new ErrorResponse(
            HttpStatusCode.SERVER_ERROR,
            HttpDefaultMessage.SERVER_ERROR,
            error
        )
        
    }
}

// Login With email 
const loginWithEmail = async(email)=>{
    try{
        const loginData = {
            email: email,
            Otp: otpGenerator.generate(6, { lowerCaseAlphabets : false , upperCaseAlphabets: false, specialChars: false }),
            expiration: Date.now() + process.env.OTP_EXPIRATION_TIME * 1000,
            request_count : 1,
            last_request : Date.now()
        };
        const checkExistingUser = await integration.user.checkEmail(email)
        if (checkExistingUser) {
            const data = await integration.auth.updateUserWithEmail(loginData);
            if (data){
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
        }else{
            const data = await integration.auth.createUserWithEmail(loginData)
            if (data){
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
    } catch(error){
        return new ErrorResponse(
            HttpStatusCode.SERVER_ERROR,
            HttpDefaultMessage.SERVER_ERROR,
            error
        )
    }
}


module.exports = {loginWithEmail,resendOtp}