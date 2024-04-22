const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const value = {
    email: data.email,
    issuer: process.env.JWT_ISSUER,
    iat: Math.floor(Date.now() / 1000) - 30,
    eat: Math.floor(Date.now() / 1000) + 86400,
  };
  const token = jwt.sign(value, process.env.JWT_SECRET ?? 'aabrakadabra');
  return token;
};


const verifyToken = (token)=>{
  try {
    console.log("DECODED" )
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET ?? 'aabrakadabra',
    )
    console.log("DECODED", decode  )
    
    return decode 
  } catch (error) {
    return null    
  }
}

module.exports = {createToken,verifyToken}