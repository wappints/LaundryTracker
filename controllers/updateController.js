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
        var pass3 = false
        var key = req.body.eventkey

        var currentDate = new Date();
        currentDate.setHours(currentDate.getHours() +8 );
        var hour = currentDate.getHours() 
        hour=hour-8;
        if(hour<0)
         hour=hour+24 
        var minutes = currentDate.getMinutes()
        if(minutes < 10){
            minutes = ("0"+minutes);
        }
        var seconds = currentDate.getSeconds()
        var time = hour + ":" + minutes + ":" + seconds   
        
        db.findOne(Balances, {BalanceID : id}, {},  function(result){
            if (result) 
                pass3 = true
            if (key === "LIFE") 
                pass3 = false
                  
            var Name = req.body.Name;
            var Phone = req.body.Phone;
            console.log(Name)
            console.log(Phone)
            if (pass3) {
                Name = ""
                Phone = ""
            }
            if (Name === "" || Name === null)
                pass1 = 0
            
            if (Phone === "" || Phone === null)
                pass2 = 0

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
                DDate : dateForBalance,
                Balance : Balance
            }
            var updateIdentity = {}
            if (pass1) {
                docs2["Name"] = Name;
                updateIdentity["Name"] = Name;
            }
            if (pass2) {
                docs2["PhoneNum"] = Phone;
                updateIdentity["PhoneNum"] = Phone;
            }
            db.findOne(Balances, {BalanceID : id}, {}, function(result) {
                if (!result && Balance != 0)
                    db.insertOne(Balances, docs2, function(result){})
                else {
                    db.updateOne(Balances, {BalanceID : id}, docs2, function(result) {
                        db.findOne(Balances, {BalanceID : id}, {}, function(result) {
                            if (result) {
                                if (result.Balance === 0)
                                    db.deleteOne(Balances, {BalanceID : id}, function(result){})
                            }
                        })
                    })
                    db.updateMany(Sale, {BalanceID: id}, updateIdentity, function(result){})
                }
            })

            var docs = {
                _id : id,
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
            if (pass1) 
                docs["Name"] = Name;
            
            if (pass2) 
                docs["PhoneNum"] = Phone;
      
                var EditLog = ACCType + " " + Session + " updated " ;
                var Handler =  time 

                var pass5 = 1;

                db.findOne(Sale, {_id: id}, {}, function(result){
                    
                    var newName = docs.Name
                    var newToken = docs.TokenError

                    if(docs.ThinWash != result.ThinWash)
                       EditLog = EditLog.concat("Thin Wash")

                    else if(docs.ThinDry != result.ThinDry)
                        EditLog = EditLog.concat("Thin Dry")

                    else if(docs.ThickWash != result.ThickWash)
                        EditLog = EditLog.concat("Thick Wash")
 
                    else if(docs.ThickDry != result.ThickDry)
                        EditLog = EditLog.concat("Thick Dry")

                    else if(docs.Fold != result.Fold)
                        EditLog = EditLog.concat("Fold")      

                    else if(docs.Soap != result.Soap)
                        EditLog = EditLog.concat("Soap")

                    else if(docs.Downy != result.Downy)
                        EditLog = EditLog.concat("Downy")

                    else if(docs.AmountPaid != result.AmountPaid)
                        EditLog = EditLog.concat("Amount Paid");
                    
                    else if (docs.TokenError != result.TokenError)
                        newToken = result.TokenError             

                   else if(docs.Name != result.Name && pass1)
                        newName = result.Name
                                                        
                    else if(docs.PhoneNum != result.PhoneNum && pass2)
                         EditLog = EditLog.concat("Phone Number")               

                    else 
                        pass5=0
    
                        if (pass5){
                            db.findOne(Log, {LogID:id}, {}, function(result){
                        
                                var currentLog = result.EditLog
                                currentLog.push("\n" + EditLog)
                                db.updateOne(Log, {LogID:id}, {EditLog:currentLog}, function(result){})

                                var currentHandler = result.Handler
                                currentHandler.push("\n" + Handler)
                                db.updateOne(Log, {LogID:id}, {Handler:currentHandler}, function(result){})

                                db.updateOne(Log, {LodID:id}, {Name:newName}, function(result){})
                                db.updateOne(Log, {LogID:id}, {TokenError:newToken}, function(result){})
                            })        
                        }

                })     

            db.updateOne(Sale, {_id : id}, docs, function(result) {})
            if (pass3)
                db.deleteMany(Sale, {BalanceID : id}, function(result){})   

            db.findOne(Sale,{_id:id}, docs, function(result){
                db.updateOne(Log, {LogID:id}, {Name:result.Name},function(result){})
                db.updateOne(Log, {LogID:id}, {Balance:result.Balance},function(result){})
                db.updateOne(Log, {LogID:id}, {TotalPrice:result.TotalPrice},function(result){})
                db.updateOne(Log, {LogID:id}, {AmountPaid:result.AmountPaid},function(result){})
                db.updateOne(Log, {LogID:id}, {TokenError:result.TokenError},function(result){})
            })
                    
            res.redirect("../../../home/" + ACCType + "/" + Session + "/" + formattedDate);
        })
    }
}

module.exports = updateController;