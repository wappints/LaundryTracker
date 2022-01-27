const { request } = require('express');
const db = require('../models/db.js');
const Account = require('../models/AccountModel.js');
const accountsController = {
    getAccounts : function (req,res){
        var ACCType = req.params.ACCType
        var DDate = req.params.DDate
        var Session = req.params.Session
        db.findMany(Account, {}, {}, function(result){
            var obj = {}
            var obj2 = {}
            var details = []
            var details2 = []
            for (var i of result) {
                if (i.isAdmin == "true") {
                    obj = {}
                    obj["AccID"] = i._id
                    obj["isAdmin"] = i.isAdmin
                    obj["EMPName"] = i.EMPName
                    obj["EMPPass"] = i.EMPPass
                    details.push(obj)
                }
                else {
                    obj2 = {}
                    obj2["AccID"] = i._id
                    obj2["isAdmin"] = i.isAdmin
                    obj2["EMPName"] = i.EMPName
                    obj2["EMPPass"] = i.EMPPass
                    details2.push(obj2)
                }
            }
            res.render("management", {admin : details, accounts : details2, layout : "managementLayout", ACCType : ACCType, DDate : DDate, Session : Session})
        })

    },
    updateAccounts : function (req,res) {
        var EMPName = req.body.EMPName
        var EMPPass = req.body.EMPPass
        
        console.log(EMPName)
        console.log(EMPPass)
        if (EMPName != "" || EMPPass != "" || EMPName != null || EMPPass != null)
            db.findOne(Account, {EMPName : EMPName}, {}, function(result) {
                console.log(result)
                if (result === null) {
                    var obj = {}
                    if (!!EMPName){
                    EMPName = EMPName.toLowerCase()
                    EMPName = EMPName.trim()
                    EMPName = EMPName.replace(/\s\s+/g, ' ')
                    names = EMPName.split(" ")
                    for (let i = 0; i < names.length; i++) {
                        names[i] = names[i][0].toUpperCase() + names[i].substr(1);
                    }
                    EMPName = names.join(" ")
                    EMPName = EMPName.trim()
                    obj["EMPName"] = EMPName;
                    
                    }
                    
                    if (!!EMPPass) {
                        obj["EMPPass"] = EMPPass;
                    }
                        

                    var ID = req.body.ID
                    ID = ID.toString()
                    db.updateOne(Account, {_id : ID}, obj, function(result) {
                        if (result === null) {
                            db.updateOne(Account, {_id : ID.toString()}, obj, function(result) {
                                res.redirect('back');
                            })
                        }
                        else {
                            res.redirect('back');
                        }
                    
                            
                    })
            }
        }) 
    },
    deleteAccount : function (req,res) {
        var ID = req.body.ID
        db.deleteOne(Account, {_id : ID}, function(result){
            if (result)
                res.redirect('back');
            else
                db.deleteOne(Account, {_id : ID.toString()}, function(result) {
                    res.redirect('back');
                })
            })
    },
    addAccount : function (req,res) {
        
        var EMPName = req.body.Name
        EMPName = EMPName.toLowerCase()
        EMPName = EMPName.trim()
        EMPName = EMPName.replace(/\s\s+/g, ' ')
        names = EMPName.split(" ")
        for (let i = 0; i < names.length; i++) {
            names[i] = names[i][0].toUpperCase() + names[i].substr(1);
        }
        EMPName = names.join(" ")
        EMPName = EMPName.trim()
        var EMPPass = req.body.Pass
        var mongoose = require('mongoose');
        var ID = new mongoose.mongo.ObjectId();
        var docs = {
            _id : ID.toString(),
            EMPName : EMPName,
            EMPPass : EMPPass,
            isAdmin : "false"
        }
        db.findOne(Account, {EMPName : EMPName}, {}, function(result) {
            console.log(result)
            if (result === null)
                db.insertOne(Account, docs, function(result) {
                    res.redirect('back');
                })
        })
    }
}

module.exports = accountsController;