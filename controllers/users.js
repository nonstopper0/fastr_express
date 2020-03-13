const express = require('express')
const router = express.Router()
let bcrypt = require('bcrypt')

//Login function
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

router.post('/register', async(req, res) => {
    try {
        const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        await User.create({username: (req.body.username).toLowerCase(), password: passwordHash})
        res.status(200).send('succesfully created user')
    }catch(err) {
        res.status(400).send(err)
    }
})

router.get('/logout', (req, res) => {
    res.status(200).send('succesfully logged out')
})

module.exports = router;