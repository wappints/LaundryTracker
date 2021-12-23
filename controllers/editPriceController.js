const { request } = require('express');
const db = require('../models/db.js');
const Price = require('../models/PriceModel.js');

const editPriceController = {
    changePrice : function (req, res)
    {
        docs = {   
            key : 'Price',
            TNWPrice : parseInt(req.body.ETNWPrice),
            TNDPrice : parseInt(req.body.ETNDPrice),
            TKWPrice : parseInt(req.body.ETKWPrice),
            TKDPrice : parseInt(req.body.ETKDPrice),
            FOLDrice : parseInt(req.body.EFOLDPrice),
            SOAPPrice : parseInt(req.body.ESOAPPrice),
            DOWNPrice : parseInt(req.body.EDOWNPrice),
        }
        db.updateOne(Price, {key:docs.key}, docs, function(result){
            if (result)
                console.log("Updated Prices SUCCESSFULLY")
            else
                console.log("Updated Prices FAILURE")
            res.redirect("back")
        })
    }
    
}


module.exports = editPriceController;