const express = require('express')
const auth = require('./auth')

const router = express.Router()

// router.use('/', (req,res)=>{
//     console.log('Welcome ')
//     res.send({message: 'welcome to the authenication server'})
// })

router.use('/auth', auth)

module.exports = router