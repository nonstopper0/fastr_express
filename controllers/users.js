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

router.get('/logout', (req, res) => {
    res.send({'data': 'succesfully logged out', 'status': 200})
})

module.exports = router;