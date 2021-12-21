// import module `database` from `../models/db.js`
const { request } = require('express');
const db = require('../models/db.js');

// import module `System` from `../models/InventoryModel.js`
const Inventory = require('../models/InventoryModel.js');

const inventoryController = {

    getInventory : function (req, res) {

        res.render("inventory", {})
        let DownyQTY = req.body.INVDowny;
        let SoapQTY = req.body.INVSoap;

        console.log(DownyQTY);
        console.log(SoapQTY);
    },

    itemDowny : function (req, res){
        console.log('downy bad');
    },

    itemSoap : function (req, res){
        console.log('sabon');
    }
}


module.exports = inventoryController;