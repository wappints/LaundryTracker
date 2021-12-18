// import module `express`
const express = require('express');
const path = require('path')
const systemController = require('../controllers/systemController.js');

const app = express();
const db = require('../models/db.js');
app.set('views', path.join(__dirname, '../views'))
app.get('/', systemController.getSystem);
app.get('/login', systemController.postLogin);
module.exports = app;  
