const { request } = require('express');
const db = require('../models/db.js');
const Balances = require('../models/BalancesModel.js');
const Sale = require('../models/SalesModel.js');
const balancesController = {
    getBalances : function (req,res){
        var DDate = req.params.DDate
        var ACCType = req.params.ACCType
        var Session = req.params.Session
        db.findMany(Balances, {}, {}, function(result) {
            var obj = {}
            var details = []
            for (var i of result)
            {
                obj = {}
                obj["BalanceID"] = i.BalanceID,
                obj["Name"] = i.Name,
                obj["PhoneNum"] = i.PhoneNum,
                obj["DDate"] = i.DDate,
                obj["Balance"] = i.Balance
                details.push(obj)
            }
            res.render("balances", {entry : details, DDate : DDate, Session : Session,  ACCType : ACCType, layout : "balancesLayout"})
        })
    },
    payBalances : function(req,res)
    {
        var BalanceID = req.body.BalanceID
        var Name = req.body.Name
        var PhoneNum = req.body.PhoneNum
        var computation = req.body.computation
        var Payment = req.body.Payment
        if (computation == 0) 
            db.deleteOne(Balances, {BalanceID : BalanceID}, function(result){})
        else 
            db.updateOne(Balances, {BalanceID : BalanceID}, {Balance : computation}, function(result) {})
            
        var ObjectID = require('bson').ObjectID;
        var id  = new ObjectID();
        var BALid = new ObjectID(BalanceID);
        var currentDate = new Date()
        currentDate.setHours(currentDate.getHours() + 8);
        var formattedDate = currentDate.toISOString().split('T')[0];
        var docs = {
            _id : id,
            BalanceID : BALid,
            Name : Name,
            PhoneNum : PhoneNum,
            DDate : formattedDate,
            AmountPaid : Payment,
            Balance : -Payment,
        }
        db.insertOne(Sale, docs, function(result){})
        res.redirect("back")
    },
    deleteBalance : function(req,res)
    {
        var BalanceID = req.query.card
        db.deleteOne(Sale, {_id : BalanceID}, function(result){
            db.deleteOne(Balances, {BalanceID : BalanceID}, function(result){
                db.deleteMany(Sale, {BalanceID : BalanceID}, function (result) {
                })
            })
        })
    }
}
module.exports = balancesController;