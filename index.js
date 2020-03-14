const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || "3000";
const cors = require('cors');
require('dotenv').config();
require('./db/db.js')


//middleware
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//controllers
const userController = require('./controllers/users.js');
app.use('/user', userController);
const swipeController = require('./controllers/swipe.js');
app.use('/swipe', swipeController);

//starter
app.listen(port, () => {
    console.log("Listening on port ", port)
})