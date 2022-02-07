const { request } = require('express');
const db = require('../models/db.js');
const Balances = require('../models/BalancesModel.js');
const Sale = require('../models/SalesModel.js');
const Log = require('../models/LogModel.js');
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
        if (req) {
            var BalanceID = req.body.BalanceID
            var Name = req.body.Name
            var PhoneNum = req.body.PhoneNum
            var computation = req.body.computation
            var Payment = req.body.Payment
            var ACCType = req.params.ACCType
            var Session = req.params.Session
            if (computation == 0) 
                db.deleteOne(Balances, {BalanceID : BalanceID}, function(result){})
            else 
                db.updateOne(Balances, {BalanceID : BalanceID}, {Balance : computation}, function(result) {})
                
            var ObjectID = require('bson').ObjectID;
            var id  = new ObjectID();
            var BALid = new ObjectID(BalanceID);
            var currentDate = new Date()
            var temp = new Date()
            temp.setHours(temp.getHours() + 8);
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
            var hour = temp.getHours()
            hour=hour-8;
            if(hour<0)
                hour=hour+24 
            var minutes = temp.getMinutes()
            if(minutes < 10){
                minutes = ("0"+minutes);
            }
            var seconds = temp.getSeconds()
            var time = hour + ":" + minutes + ":" + seconds
            var EditLog = [ACCType + " " + Session + " paid for a balance entry"];
            var Handler = [ time ]
            var tprice = parseInt(computation) + parseInt(Payment)
            var docs3 = {
                LogID : id,
                Name : Name,
                TotalPrice : tprice,
                AmountPaid : Payment,
                Balance : computation,
                TokenError : 0,
                EditLog : EditLog,
                Handler : Handler,
                DDate : temp,
            }
            db.insertOne(Log, docs3, function(result){
                console.log("I AM HERE")
            })
            res.redirect("back")
        }
    },
    deleteBalance : function(req,res)
    {
        var BalanceID = req.query.card
        var ACCType = req.query.ACCType
        var Session = req.query.Session

        if (BalanceID != null) {
            db.deleteOne(Sale, {_id : BalanceID}, function(result){
                if (result != null) {
                    db.findOne(Balances, {BalanceID: BalanceID}, {}, function(result){
                        var temp = new Date()
                        temp.setHours(temp.getHours() + 8);
                        var hour = temp.getHours()
                        hour=hour-8;
                        if (hour<0)
                            hour=hour+24 
                        var minutes = temp.getMinutes()
                        if (minutes < 10){
                            minutes = ("0"+minutes);
                        }
                        var seconds = temp.getSeconds()
                        if (seconds < 10){
                            seconds = ("0"+seconds);
                        }
                        var time = hour + ":" + minutes + ":" + seconds
                        if (result != null) {
                            var EditLog = [ACCType + " " + Session + " deleted a balance parent entry"]
                            var EditLog2 = "NOTE: ENTRY DELETED FROM BALANCES";
                            var Handler = [ time ]
                            var Handler2 = time
                            var mongoose = require('mongoose');

                            db.findOne(Log, {LogID :BalanceID}, {}, function(result){
                                var new1 = result.EditLog 
                                new1.push("\n" + EditLog2)
                                new1.push("\n" + "RELATED PARTIAL PAYMENT ENTRIES ALSO DELETED")
                                var new2 = result.Handler
                                new2.push("\n" + Handler2)
                                new2.push("\n" + Handler2)
                                
                                db.updateOne(Log, {LogID:BalanceID}, {EditLog:new1}, function(result){})
                                db.updateOne(Log, {LogID:BalanceID}, {Handler:new2}, function(result){})
                            })
                            var ID = new mongoose.mongo.ObjectId();
                            var docss = {
                                LogID : ID,
                                Name : result.Name,
                                TotalPrice : result.Balance,
                                AmountPaid : 0,
                                Balance : result.Balance,
                                TokenError : 0,
                                EditLog : EditLog,
                                Handler : Handler,
                                DDate : temp,
                            }
                            
                            db.insertOne(Log, docss, function(result){
                            })
                        }
                    })
                    db.deleteOne(Balances, {BalanceID : BalanceID}, function(result){
                        if (result != null) {
                            db.deleteMany(Sale, {BalanceID : BalanceID}, function (result) {})
                        }
                    })
                }
            })
        }
    }
}
module.exports = balancesController;