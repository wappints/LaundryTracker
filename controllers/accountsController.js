// import module `database` from `../models/db.js`
const { request } = require('express');
const db = require('../models/db.js');
// import module `System` from `../models/AccountModel.js`
const Account = require('../models/AccountModel.js');

const accountsController = {

    getAccounts : function (req,res){
        var ACCType = req.params.ACCType
        var DDate = req.params.DDate
        db.findMany(Account, {}, {}, function(result){
            
            var obj = {}
            var obj2 = {}
            var details = []
            var details2 = []
            for (var i of result)
            {
                if(i.isAdmin)
                {
                    obj = {}
                    obj["AccID"] = i._id
                    obj["isAdmin"] = i.isAdmin
                    obj["EMPName"] = i.EMPName
                    obj["EMPPass"] = i.EMPPass
                    details.push(obj)
                }
                else
                {
                    obj2 = {}
                    obj2["AccID"] = i._id
                    obj2["isAdmin"] = i.isAdmin
                    obj2["EMPName"] = i.EMPName
                    obj2["EMPPass"] = i.EMPPass
                    details2.push(obj2)
                }

            }
            console.log("THE DETAILS")
            console.log(details)
            console.log(details2)
            res.render("management", {admin : details, accounts : details2, layout : "managementLayout", ACCType : ACCType, DDate : DDate})
        })

    },

    updateAccounts : function (req,res) {
        var ACCType = req.params.ACCType
        var DDate = req.params.DDate
        var EMPName = req.body.Name
        var EMPPass = req.body.Pass
        var ID = req.body.ID
        const { ObjectId } = require('mongodb');
        ID = ObjectId(ID);   
        console.log(ID)
        console.log("FINAL")
        db.updateOne(Account, {_id : ID}, {EMPName : EMPName, EMPPass : EMPPass}, function(result)
        
        {
           
        })
        

    },
    deleteAccount : function (req,res) {

        var ID = req.body.ID
        db.deleteOne(Account, {_id : ID}, function(result)
        
        {
            res.redirect("back")
        })
        

    },
        addAccount : function (req,res) {
        var EMPName = req.body.Name
        var EMPPass = req.body.Pass
        var docs = {
            EMPName : EMPName,
            EMPPass : EMPPass,
            isAdmin : false
        }
        console.log(docs)
        db.insertOne(Account, docs, function(result)
        {
           res.redirect("back")
        })
        

    }
}

module.exports = accountsController;