const pool = require('../config/db')




const update = async(email,otp)=>{
    try{
        const data = await pool.query('UPDATE psduser SET otp = $1 WHERE email = $2', [otp,email])
        return { success: true};
    }catch(error){
    return(error)
}

}

const updateOtp = async(loginData) =>{
    try{
        const data = await pool.query('UPDATE users SET otp = $1 WHERE phone_number = $2', [loginData.Otp,loginData.number])
        return { success: true};
    }catch(error){
    return(error)
}
}

const createUser = async(userDatas)=>{
    try {
        const data = await pool.query('INSERT INTO psduser(email, password) VALUES($1, $2)',[userDatas.email, userDatas.password])
        //console.log("DATA", data)
        return {success:true}
    } catch (error) {
        return (error)
    }
}

const create = async(loginData) =>{
    try{
        const data = await pool.query('INSERT INTO users(phone_number, otp) VALUES($1, $2)',[loginData.Number , loginData.Otp])
        return {success : true}
    }catch(error){
        return(error)
    }

}



const updateUserWithEmail = async(loginData)=>{
    try{
        const data = await pool.query('UPDATE otpdata SET otp = $1, expiration = $2, request_count = $3, last_request = $4 WHERE user_email = $5', [loginData.Otp, loginData.expiration, loginData.request_count, loginData.last_request ,loginData.email])
        return { success: true};
    }catch(error){
        return(error)
    }   

}


const createUserWithEmail = async(loginData)=>{
    try {
        const data = await pool.query('INSERT INTO otpdata (user_email,otp,expiration) VALUES ($1 ,$2, $3)',[loginData.email, loginData.Otp, loginData.expiration])
        
    } catch (error) {
        return(error)
    }
}


module.exports = {updateOtp,create, createUser,update,createUserWithEmail,updateUserWithEmail}