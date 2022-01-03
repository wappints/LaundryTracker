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
        db.findOne(Price, {key:docs.key}, docs, function(result){
            if (typeof result.TNWPrice === 'string' ) {
                docs = {   
                    key : 'Price',
                    TNWPrice : req.body.ETNWPrice.toString(),
                    TNDPrice : req.body.ETNDPrice.toString(),
                    TKWPrice : req.body.ETKWPrice.toString(),
                    TKDPrice : req.body.ETKDPrice.toString(),
                    FOLDrice : req.body.EFOLDPrice.toString(),
                    SOAPPrice : req.body.ESOAPPrice.toString(),
                    DOWNPrice : req.body.EDOWNPrice.toString(),
                }
            }
            db.updateOne(Price, {key:docs.key}, docs, function(result){
                res.redirect("back")
            })
        })

    }
    
}


module.exports = editPriceController;