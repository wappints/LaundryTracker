// import module `database` from `../models/db.js`
const { request } = require('express');
const db = require('../models/db.js');

// import module `System` from `../models/InventoryModel.js`
const Inventory = require('../models/InventoryModel.js');
const Price = require('../models/PriceModel.js');
const inventoryController = {

    getInventory : function (req, res) {

        var ACCType = req.params.ACCType
        var currentDate = new Date()
        currentDate.setHours(currentDate.getHours() + 8);
        var formattedDate = currentDate.toISOString().split('T')[0];

        db.findOne(Inventory, {}, {}, function(result)
        {
            var object =  result;
            object["ACCType"] = ACCType
            db.findOne(Price, {}, {}, function(result)
            {
                var SOAPPrice = result.SOAPPrice
                var DOWNPrice = result.DOWNPrice
                object["SOAPPrice"] = SOAPPrice
                object["DOWNPrice"] = DOWNPrice
                object["DDate"] = formattedDate
                object["layout"] = "inventoryLayout"
                res.render("inventory", object)
            })
        })

    },

    itemDowny : function (req, res){
        console.log('downy bad');
    },

    itemSoap : function (req, res){
        console.log('sabon');
    }
}


module.exports = inventoryController;