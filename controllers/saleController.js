
// import module `database` from `../models/db.js`
const { request } = require('express');
const db = require('../models/db.js');

// import module `System` from `../models/SystemModel.js`
const Sale = require('../models/SalesModel.js');
const Price = require('../models/PriceModel.js');
const { validationResult } = require('express-validator');
const { insertOne } = require('../models/db.js');
/*
    defines an object which contains functions executed as callback
    when a client requests for `signup` paths in the server
*/

const saleController = {

    getEntries : function (req, res) {
        var purpose = req.query.purpose
        var DDate = req.query.DDate
        console.log(DDate)
        if (DDate == null)
            DDate = req.params.DDate
        if (DDate == null)
            DDate = req.body.DDate
        if (purpose == null) {
            var currentDate = new Date()
            currentDate.setHours(currentDate.getHours() + 8);
            console.log("currentDate = " + currentDate)
            console.log("current")
        }
        else if (purpose == "next") {
            var currentDate = new Date(DDate)
            currentDate.setDate(currentDate.getDate() + 1) 
            console.log("nextDate = " + currentDate)
            console.log("next")
        }
        else if (purpose == "previous") {
            var currentDate = new Date(DDate)
            currentDate.setDate(currentDate.getDate() - 1) 
            console.log(currentDate)
            console.log("previousDate = " + currentDate)
        }
        var typeOfAcc = req.params.ACCType
        if (typeOfAcc == null)
            typeOfAcc = req.body.ACCType
        
        var formattedDate = currentDate.toISOString().split('T')[0];
        console.log(formattedDate)
        var start = formattedDate + "T00:00:00.000Z"
        var end = formattedDate + "T23:59:59.999Z"
        start = new Date(start).toISOString()
        end = new Date(end).toISOString()
        db.findMany(Sale, {DDate : {$gte : start, $lte : end}}, {}, function(result){
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
                
                //console.log("part 2")
                //console.log(obj)
                details.push(obj)
                //console.log(details)
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
                if (DDate === formattedDate)
                {
                    res.render('home', renderobjects)
                }
            })

        })
        

        
    },
    addEntry : function (req, res) {
        var Name = req.body.ADDName;
        var Phone = req.body.ADDPhone;
        var TNW = req.body.ADDThinW;
        if (isNaN(TNW))
            TNW = 0
        var TND = req.body.ADDThinD;
        if (isNaN(TND))
            TND = 0
        var TKW = req.body.ADDThickW;
        if (isNaN(TKW))
            TKW = 0
        var TKD = req.body.ADDThickD;
        if (isNaN(TKD))
            TKD = 0
        var Fold =req.body.ADDFold;
        if (isNaN(Fold))
            Fold = 0
        var Soap = req.body.ADDSoap;
        if (isNaN(Soap))
            Soap = 0
        var Downy = req.body.ADDDowny;
        if (isNaN(Downy))
            Downy = 0
        var TotalPrice = req.body.ADDTotalPriceR;
        if (isNaN(TotalPrice))
            TotalPrice = 0
        var AmountPaid = req.body.ADDAmountPaid;
        if (isNaN(AmountPaid))
            AmountPaid = 0
        var Balance = req.body.ADDBalanceR;
        if (isNaN(Balance))
            Balance = 0
        var tokenDefault = 0;
        var currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 8);
        currentDate = new Date(currentDate.toISOString());
        var ObjectID = require('bson').ObjectID;
        var id  = new ObjectID();
        console.log(currentDate)
        var pass = 0; 
        if (Balance > 0)
            pass = 1;
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
        console.log(docs)
        db.insertOne(Sale, docs, function(result)
        {
            if(result)
                console.log("INSERTED!")
            else
                console.log("FAILED INSERTION!") // <-------------- Jihro fix this pls
            db.findMany(Sale, {}, {}, function(result){
                console.log(result)
                res.redirect('back')
            })

        })

    },

    deleteEntry : function (req, res)
    {
        var id = req.query._id
        console.log(id)
        db.deleteOne(Sale, {_id : id}, function(result){
            if (result)
                console.log("Entry deletion SUCCESSFUL")
            else
                console.log("Entry deletion FAILURE")
        })
    },
    redirectt : function (req, res)
 {
        var purpose = req.query.purpose
        var DDate = req.params.DDate
        var ACCType = req.params.ACCType

        if (purpose == "next") {
            var currentDate = new Date(DDate)
            
            currentDate = currentDate.setDate(currentDate.getDate() + 1) 
            var newDate = new Date (currentDate)
            var stuff =  newDate.toISOString().split('T')[0];
            console.log("Next Date is " + stuff)
            res.redirect("/home/" + ACCType +"/" + stuff)
           
        }
        else if (purpose == "previous") {
            var currentDate = new Date(DDate)
            currentDate = currentDate.setDate(currentDate.getDate() - 1) 
            var newDate = new Date (currentDate)
            var stuff = newDate.toISOString().split('T')[0];
            console.log("Previous Date is " + stuff)
            res.redirect("/home/" + ACCType +"/" + stuff)
        }
    }
   
    
}
module.exports = saleController;
