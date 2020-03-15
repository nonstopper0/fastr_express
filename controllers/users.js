const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

// user login route
router.post('/login', async(req, res) => {
    try {
        const foundUser = await User.findOne({username: req.body.username})
        if(foundUser) {
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                res.status(200).send('logged in')
            } else {
                res.status(400).send('wrong username or password')
            }
        } else {
            res.status(400).send('wrong username or password')
        }
    } catch(err) {
        res.status(400).send(err)
    }
})

// user register route
router.post('/register', async(req, res) => {
    try {
        await User.find({username: req.body.username}, async(err, user) => {
            if (err) {
                res.status(400).send('there has been an error creating your account, please try again')
            } else {
                // if the username is already in the database then do not attempt to create the user
                if (user.length > 0) {
                    console.log(user)
                    res.status(400).send('this username has already been taken')
                }
                // else
                else {
                    const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
                    await User.create({username: (req.body.username).toLowerCase(), password: passwordHash})
                    res.status(200).send('succesfully created user')
                    console.log('nothing here')
                }
            }
        })
    }catch(err) {
        res.status(400).send(err)
    }
})

// user logout route
router.get('/logout', (req, res) => {
    res.status(200).send('succesfully logged out')  
})

// user update account route
router.put('/update', (req, res) => {
    try {
        User.find({username: req.body.username}, (err, user) => {
            if (err) {
                res.status(400).send('there has been an error updating your account, please try again')
            } else {

            }
        })
        res.status(200).send('succesfully updated user')
    }catch(err) {
        res.status(400).send(err)
    }
})

module.exports = router;