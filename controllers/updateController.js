const { request } = require('express');
const db = require('../models/db.js');

const Sale = require('../models/SalesModel.js');
const Price = require('../models/PriceModel.js');
const Log = require('../models/LogModel.js');
const Balances = require('../models/BalancesModel.js');

const updateController = {

    updateEntry : function (req,res) {
        var id = req.body.id
        var formattedDate = req.params.DDate
        var Session = req.params.Session
        var ACCType = req.params.ACCType
        var DDate = req.params.DDate
        var pass1 = 1
        var pass2 = 1
        var Name = req.body.Name;
        if (Name === "" || Name === null)
            pass1 = 0
        var Phone = req.body.Phone;
        if (Phone === "" || Phone === null)
            pass2 = 0
        console.log("HERE")
        console.log(Name)
        console.log(Phone)
        var TNW = req.body.TNWQty;
        var TND = req.body.TNDQty;
        var TKW = req.body.TKWQty;
        var TKD = req.body.TKDQty;
        var FOLD =req.body.FOLDQty;
        var SOAP = req.body.SOAPQty;
        var DOWN = req.body.DOWNQty;
        var TotalPrice = req.body.TotalPrice;
        var AmountPaid = req.body.AmountPaid;
        var Balance = req.body.Balance;
        var Token = req.body.Token;
        var currentDate = new Date(DDate);
        var dateForBalance = currentDate
        dateForBalance = dateForBalance.toISOString().split('T')[0]
        var docs2 = {
            BalanceID : id,
            //Name : Name,
            //PhoneNum : Phone,
            DDate : dateForBalance,
            Balance : Balance
        }
        if (pass1) {
            docs2["Name"] = Name;
        }
        if (pass2) {
            docs2["PhoneNum"] = Phone;
        }
        db.findOne(Balances, {BalanceID : id}, {}, function(result) {
            if (!result)
                db.insertOne(Balances, docs2, function(result){
                })
            else {
                db.updateOne(Balances, {BalanceID : id}, docs2, function(result) {
                    db.findOne(Balances, {BalanceID : id}, {}, function(result) {
                        if (result.Balance <= 0)
                            db.deleteOne(Balances, {BalanceID : id}, function(result){
                            })
                    })
                })
            }
        })

        var docs = {
            _id : id,
            //Name : Name,
            //PhoneNum : Phone,
            DDate : currentDate,
            ThinWash : TNW,
            ThinDry : TND,
            ThickWash : TKW,
            ThickDry : TKD,
            Fold : FOLD,
            Soap : SOAP,
            Downy : DOWN,
            AmountPaid : AmountPaid,
            TotalPrice : TotalPrice,
            Balance : Balance,
            TokenError : Token
        }
        if (pass1) {
            docs["Name"] = Name;
        }
        if (pass2) {
            docs["PhoneNum"] = Phone;
        }
        db.updateOne(Sale, {_id : id}, docs, function(result) {})
        res.redirect("../../../home/" + ACCType + "/" + Session + "/" + formattedDate);
    }
}


module.exports = updateController;