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
                    obj["AccID"] = i._id
                    obj["isAdmin"] = i.isAdmin
                    obj["EMPName"] = i.EMPName
                    obj["EMPPass"] = i.EMPPass
                    details.push(obj)
                    console.log(obj)
                }
                else
                {
                    obj2["AccID"] = i._id
                    obj2["isAdmin"] = i.isAdmin
                    obj2["EMPName"] = i.EMPName
                    obj2["EMPPass"] = i.EMPPass
                    details2.push(obj2)
                    console.log(obj2)
                }
                
            }
            res.render("management", {admin : details, accounts : details2, layout : "managementLayout", ACCType : ACCType, DDate : DDate})
        })

    },

    updateAccounts : function (req,res) {
        var ACCType = req.params.ACCType
        var DDate = req.params.DDate
        var EMPName = req.body.EMPName
        var EMPPass = req.body.EMPPass
        var ID = req.body.ID
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
           
        })
        

    },
        addAccount : function (req,res) {
        var EMPName = req.body.EMPName
        var EMPPass = req.body.EMPPass
        var docs = {
            EMPName : EMPName,
            EMPPass : EMPPass,
            isAdmin : false
        }

        db.insertOne(Account, docs, function(result)
        {
           
        })
        

    }
}

module.exports = accountsController;