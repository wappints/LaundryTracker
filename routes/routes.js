const express = require('express');
const path = require('path')
const systemController = require('../controllers/systemController.js');
const saleController = require('../controllers/saleController.js');
const editPriceController = require('../controllers/editPriceController.js');
const inventoryController = require('../controllers/inventoryController.js');
const balancesController = require('../controllers/balancesController.js');
const viewDateController = require('../controllers/viewDateController.js');
const accountsController = require('../controllers/accountsController.js');

const app = express();
app.set('views', path.join(__dirname, '../views'))

app.get('/', systemController.getSystem); 
app.post('/login', systemController.postLogin);

app.get('/home/:ACCType/:DDate', saleController.getEntries);  
app.post('/home/:ACCType/:DDate', saleController.addEntry);
app.get('/delete', saleController.deleteEntry);

app.post('/edit', editPriceController.changePrice);

app.get('/log/:ACCType', ); 
app.post('/log/:ACCType', );

app.get('/deleteBal', balancesController.deleteBalance);
app.get('/balances/:ACCType/:DDate', balancesController.getBalances); 
app.post('/balances/:ACCType/:DDate', balancesController.payBalances);

app.post('/new/:ACCType/:DDate', viewDateController.newDate)

app.get('/inventory/:ACCType/:DDate', inventoryController.getInventory);
app.post('/inventory/:ACCType/:DDate', inventoryController.setInventory);

app.get('/management/:ACCType/:DDate', accountsController.getAccounts);
app.post('/management/:ACCType/:DDate', accountsController.updateAccounts);
app.post('/addAccount', accountsController.addAccount);
app.post('/delAccount', accountsController.deleteAccount);

module.exports = app;  
