// import module `express`
const express = require('express');
const path = require('path')
const systemController = require('../controllers/systemController.js');
const saleController = require('../controllers/saleController.js');
const app = express();
const db = require('../models/db.js');
const editPriceController = require('../controllers/editPriceController.js');
const inventoryController = require('../controllers/inventoryController.js');
app.set('views', path.join(__dirname, '../views'))
app.get('/', systemController.getSystem); 
app.post('/login', systemController.postLogin);
app.get('/home/:ACCType/:DDate', saleController.getEntries);  
app.post('/home/:ACCType/:DDate', saleController.addEntry);
app.get('/home/:ACCType/:DDate/:indexing', saleController.redirectt);
app.get('/log/:ACCType', ); 
app.post('/log/:ACCType', );
app.get('/delete', saleController.deleteEntry);
app.post('/edit', editPriceController.changePrice);
app.get('/inventory/:ACCType', inventoryController.getInventory);
app.post('/inventory/:ACCType', inventoryController.setInventory);
module.exports = app;  
