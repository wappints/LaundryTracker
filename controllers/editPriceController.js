// import module `database` from `../models/db.js`
const { request } = require('express');
const db = require('../models/db.js');

// import module `System` from `../models/SystemModel.js`
const Price = require('../models/PriceModel.js');

const editPriceController = {


    changePrice : function (req, res)
    {
        docs = {
            TNWPrice : req.TNWPrice,
            TNDPrice : req.TNDPrice,
            TKWPrice : req.TKWPrice,
            TKDPrice : req.TKDPrice,
            FOLDrice : req.FOLDPrice,
            SOAPPrice : req.SOAPPrice,
            DOWNPrice : req.DownPrice,
        }
        db.updateOne(Price, {}, docs, function(result){

            if (result)
                console.log("Updated Prices SUCCESSFULLY")
            else
                console.log("Updated Prices FAILURE")

            res.redirect("home")
        })
    }
    
}


module.exports = editPriceController;