// import module `express`
const express = require('express');
const path = require('path')
const systemController = require('../controllers/systemController.js');
const saleController = require('../controllers/saleController.js');
const app = express();
const db = require('../models/db.js');
app.set('views', path.join(__dirname, '../views'))
app.get('/', systemController.getSystem); 
app.post('/login', systemController.postLogin);
app.get('/home/:ACCType', saleController.getEntries); 
app.post('/home/:ACCType', saleController.addEntry);
module.exports = app;  
