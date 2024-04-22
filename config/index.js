const db = require('./db')
const constants = require('./constants')

module.exports = {db,constants}


// 1. resend otp 
// 2. otp validity 
// 3. New Signup if user is new + Login if it is old
// 4. each otp should be send for resend after 30 sec + 1 min + 2 min  
// 5. after 3 times user should wait and a pop will show that wait for 5 min 
// 6. 


// 1. After getting the otp we should validate it and do the validate thing 
// 2. 



// id 
//lasttimesend
// no. of otp 
// otp value 
// username 
// expiry