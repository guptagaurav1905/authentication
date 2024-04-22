const pool = require('../config/db');
const { ErrorResponse, HttpStatusCode, HttpDefaultMessage } = require('../utils/response');

const getById = async(email)=>{
    try{
        const data = await pool.query('SELECT * FROM psdUser WHERE email = $1',[email])
        return data.rows[0]
    }catch(error){
      return new ErrorResponse(
        HttpStatusCode.SERVER_ERROR,
        HttpDefaultMessage.SERVER_ERROR,
        error
      )
}
    
}


const getData = async(email)=>{
  try {
    const data = await pool.query('SELECT * FROM otpdata WHERE email = $1',[email])
    return data.rows[0]
  } catch (error) {
    return new ErrorResponse(
      HttpStatusCode.SERVER_ERROR,
      HttpDefaultMessage.SERVER_ERROR,
      error
    )
      
  }
}

const checkEmail = async(email) =>{
  try {
    const result = await pool.query('SELECT COUNT(*) FROM users WHERE user_email = $1',[email]);
    if (result.rows.length > 0) {
      return true
    }else{
        return false
    }   
  } catch (error) {
    return new ErrorResponse(
      HttpStatusCode.SERVER_ERROR,
      HttpDefaultMessage.SERVER_ERROR,
      error
    )
  }

}

const userExist = async(number) =>{
    try {
        const result = await pool.query('SELECT COUNT(*) FROM users WHERE phone_number = $1',[number]);
        if (result.rows.length > 0) {
          return true
        }else{
            return false
        }   
      } catch (error) {
        return new ErrorResponse(
          HttpStatusCode.SERVER_ERROR,
          HttpDefaultMessage.SERVER_ERROR,
          error
        )
      }
    }


module.exports = {getById,userExist,getData,checkEmail}