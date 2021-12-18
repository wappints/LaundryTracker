// import module `express`
const express = require('express');



const systemController = require('../controllers/systemController.js');

const app = express();
const db = require('../models/db.js');

app.get('home', systemController.getSystem());
module.exports = app;  
