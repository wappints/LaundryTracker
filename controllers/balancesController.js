const { request } = require('express');
const db = require('../models/db.js');
const Balances = require('../models/BalancesModel.js');
const Sale = require('../models/SalesModel.js');
const balancesController = {
    getBalances : function (req,res){
        var DDate = req.params.DDate
        var ACCType = req.params.ACCType
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
            res.render("balances", {entry : details, DDate :DDate, ACCType : ACCType, layout : "balancesLayout"})
        })
    },
    payBalances : function(req,res)
    {
        var BalanceID = req.body.BalanceID
        var Name = req.body.Name
        var PhoneNum = req.body.PhoneNum
        var computation = req.body.computation
        var Balance = req.body.Balance
        var Payment = req.body.Payment
        if (computation == 0) 
            db.deleteOne(Balances, {BalanceID : BalanceID}, function(result){})
        else
            db.updateOne(Balances, {BalanceID : BalanceID}, {Balance : computation}, function(result) {})
        var ObjectID = require('bson').ObjectID;
        var id  = new ObjectID();
        var currentDate = new Date()
        currentDate.setHours(currentDate.getHours() + 8);
        var formattedDate = currentDate.toISOString().split('T')[0];
        var docs = {
            _id : id,
            Name : Name,
            PhoneNum : PhoneNum,
            DDate : formattedDate,
            ThinWash : 0,
            ThinDry : 0,
            ThickWash : 0,
            ThickDry : 0,
            Fold : 0,
            Soap : 0,
            Downy : 0,
            AmountPaid : Payment,
            TotalPrice : Balance,
            Balance : -Payment,
            TokenError : 0
        }
        db.insertOne(Sale, docs, function(result){})
    },
    deleteBalance : function(req,res)
    {
        var BalanceID = req.query.card
        console.log(BalanceID)
        db.deleteOne(Sale, {_id : BalanceID}, function(result){db.deleteOne(Balances, {BalanceID : BalanceID}, function(result){})})
    }
}
module.exports = balancesController;