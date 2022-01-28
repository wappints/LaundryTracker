const express = require('express');
const path = require('path')
const systemController = require('../controllers/systemController.js');
const saleController = require('../controllers/saleController.js');
const editPriceController = require('../controllers/editPriceController.js');
const inventoryController = require('../controllers/inventoryController.js');
const balancesController = require('../controllers/balancesController.js');
const viewDateController = require('../controllers/viewDateController.js');
const accountsController = require('../controllers/accountsController.js');
const sessionController = require('../controllers/sessionController.js')
const updateController = require('../controllers/updateController.js')
const logController = require('../controllers/logController.js');
const viewLogController = require('../controllers/viewLogController.js');
const app = express();
app.set('views', path.join(__dirname, '../views'))

app.get('/', systemController.getSystem); 
app.post('/login', systemController.postLogin);
 
app.get('/home/:ACCType/:Session/:DDate', saleController.getEntries);  
app.post('/home/:ACCType/:Session/:DDate', saleController.addEntry);
app.get('/delete/:ACCType/:Session/:DDate', saleController.deleteEntry);

app.post('/edit', editPriceController.changePrice);

app.get('/log/:ACCType/:Session/:DDate', logController.getLogs); 

app.get('/deleteBal', balancesController.deleteBalance);
app.get('/balances/:ACCType/:Session/:DDate', balancesController.getBalances); 
app.post('/balances/:ACCType/:Session/:DDate', balancesController.payBalances);

app.post('/new/:ACCType/:Session/:DDate', viewDateController.newDate)
app.post('/newLog/:ACCType/:Session/:DDate', viewLogController.newDate)

app.get('/inventory/:ACCType/:Session/:DDate', inventoryController.getInventory);
app.post('/inventory/:ACCType/:Session/:DDate', inventoryController.setInventory);

app.get('/management/:ACCType/:Session/:DDate', accountsController.getAccounts);
app.post('/management/:ACCType/:Session/:DDate', accountsController.updateAccounts);
app.post('/addAccount', accountsController.addAccount);
app.post('/delAccount', accountsController.deleteAccount);

app.post('/session/:ACCType/:SessionName/:SessionPass/:DDate', sessionController.getSession)
app.post('/editEntry/:ACCType/:Session/:DDate', updateController.updateEntry);

module.exports = app;  
