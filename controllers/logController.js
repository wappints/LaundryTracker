// import module `database` from `../models/db.js`
const { request } = require('express');
const db = require('../models/db.js');

// import module `System` from `../models/InventoryModel.js`
const Inventory = require('../models/InventoryModel.js');

const inventoryController = {

    getInventory : function (req,res){

        res.render('inventory', {layout: 'inventory layout'});
    }


}


module.exports = inventoryController;