
// import module `database` from `../models/db.js`
const { request } = require('express');
const db = require('../models/db.js');

// import module `System` from `../models/SystemModel.js`
const Sale = require('../models/SalesModel.js');
const Price = require('../models/PriceModel.js');
const Balances = require('../models/BalancesModel.js');
/*
    defines an object which contains functions executed as callback
    when a client requests for `signup` paths in the server
*/

const saleController = {

    getEntries : function (req, res) {
        var DDate = req.query.DDate

        if (DDate == null)
            DDate = req.params.DDate

        if (DDate == null)
            DDate = req.body.DDate

        var typeOfAcc = req.params.ACCType

        if (typeOfAcc == null)
            typeOfAcc = req.body.ACCType

        var currentDate = new Date(DDate)
        var formattedDate = currentDate.toISOString().split('T')[0];

        var start = formattedDate + "T00:00:00.000Z"
        var end = formattedDate + "T23:59:59.999Z"

        start = new Date(start).toISOString()
        end = new Date(end).toISOString()
        db.findMany(Sale, {DDate : {$gte : start, $lte : end}}, {}, function(result) {
            var obj = {}
            details = []
            for (var i of result) {
                obj = {}
                obj["SalesID"] = i._id,
                obj["Name"] =    i.Name,
                obj["PhoneNumber"] =      i.PhoneNum,
                obj["DDate"] =      i.DDate,
                obj["ThinWash"] =      i.ThinWash,
                obj["ThinDry"] =      i.ThinDry,
                obj["ThickWash"] =      i.ThickWash,
                obj["ThickDry"] =      i.ThickDry,
                obj["Fold"] =      i.Fold,
                obj["Soap"] =      i.Soap,
                obj["Downy"] =      i.Downy,
                obj["AmountPaid"] =      i.AmountPaid,
                obj["totalPrice"] =      i.TotalPrice,
                obj["Balance"] =      i.Balance,
                obj["Token"] =     i.TokenError
 
                details.push(obj)
            }

            db.findOne(Price, {}, {}, function(result) {
                var  obj2 = {
                    TNWPrice : result.TNWPrice,
                    TNDPrice : result.TNDPrice,
                    TKWPrice : result.TKWPrice,
                    TKDPrice : result.TKDPrice,
                    FOLDPrice : result.FOLDPrice,
                    SOAPPrice : result.SOAPPrice,
                    DOWNPrice : result.DOWNPrice
                }
                var renderobjects = {ACCType : typeOfAcc, DDate : formattedDate, entry : details, layout : 'mainLayout', object : obj2}
                console.log("DDate = " + DDate )
                console.log("formattedDate = " + formattedDate)
                    res.render('home', renderobjects)
            })
        })
    },
    addEntry : function (req, res) {
        var Name = req.body.ADDName;
        var Phone = req.body.ADDPhone;
        var DDate = req.params.DDate
        var TNW = req.body.ADDThinW;
        var TND = req.body.ADDThinD;
        var TKW = req.body.ADDThickW;
        var TKD = req.body.ADDThickD;
        var Fold =req.body.ADDFold;
        var Soap = req.body.ADDSoap;
        var Downy = req.body.ADDDowny;
        var TotalPrice = req.body.ADDTotalPriceR;
        var AmountPaid = req.body.ADDAmountPaid;
        var Balance = req.body.ADDBalanceR;

        if (isNaN(Phone) || Phone === null || Phone == "")
            Phone = "No Number"
        if (isNaN(TNW))
            TNW = 0
        if (isNaN(TND))
            TND = 0
        if (isNaN(TKW))
            TKW = 0
        if (isNaN(TKD))
            TKD = 0
        if (isNaN(Fold))
            Fold = 0
        if (isNaN(Soap))
            Soap = 0
        if (isNaN(Downy))
            Downy = 0
        if (isNaN(TotalPrice))
            TotalPrice = 0
        if (isNaN(AmountPaid))
            AmountPaid = 0
        if (isNaN(Balance))
            Balance = 0

        var tokenDefault = 0;
        var currentDate = new Date(DDate);
        var dateForBalance = currentDate
        dateForBalance = dateForBalance.toISOString().split('T')[0]

        var ObjectID = require('bson').ObjectID;
        var id  = new ObjectID();
        var pass = 0; 
        if (Balance > 0) {
            pass = 1;
            docs2 = {
                BalanceID : id,
                Name : Name,
                PhoneNum : Phone,
                DDate : dateForBalance,
                Balance : Balance
            }
        }     
        var docs = {
            _id : id,
            Name : Name,
            PhoneNum : Phone,
            DDate : currentDate,
            ThinWash : TNW,
            ThinDry : TND,
            ThickWash : TKW,
            ThickDry : TKD,
            Fold : Fold,
            Soap : Soap,
            Downy : Downy,
            AmountPaid : AmountPaid,
            TotalPrice : TotalPrice,
            Balance : Balance,
            TokenError : tokenDefault
        }
        db.insertOne(Sale, docs, function(result) {
            db.findMany(Sale, {}, {}, function(result) {
                if (pass) {
                    db.findOne(Balances, {BalanceID : id}, {}, function(result) {
                        if (!result)
                            db.insertOne(Balances, docs2, function(result){})
                    })
                }
                res.redirect('back')
            })
        })
    },
    deleteEntry : function (req, res) {
        var id = req.query._id
        db.findOne(Sale, {_id : id}, {}, function(result){
            if (result.Balance < 0) {
                var Name = result.Name;
                var Phone = result.PhoneNum;
                var currentDate = result.DDate
                var dateForBalance = currentDate.toISOString().split('T')[0]
                var newid  = result._id
                var docs2 = {
                    BalanceID : newid,
                    Name : Name,
                    PhoneNum : Phone,
                    DDate : dateForBalance,
                    Balance : -(result.Balance)
                } 
                db.insertOne(Balances, docs2, function(result){db.deleteOne(Sale, {_id : id}, function(result){})})   
            }
            else {
                db.deleteOne(Sale, {_id : id}, function(result){
                    db.deleteOne(Balances, {BalanceID : id}, function(result){})
                })
            }
        })
    }
}
module.exports = saleController;
