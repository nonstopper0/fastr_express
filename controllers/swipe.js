const express = require('express')
const router = express.Router()
const User = require('../models/user')

// swipe route - Input: userID, swipeID
router.post('/', async(reg, res) => {
    User.findById(req.body.userID, (user) => {
        console.log(user)
        console.log(req.body.swipeID, req.body.userID)
    }
})

module.exports = router;