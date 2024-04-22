const constants = require('../config/constants')

const validPhone = (number)=>{
    const regex1 = constants.constents.regex
    return regex1.test(number)
}


const validEmail = (email)=>{
    const email = constants.constents.email
    return email.test(email)
}

module.exports = {validPhone,validEmail}