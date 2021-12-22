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
            for (var i of result)
            {
                if(i.isAdmin)
                {
                    obj["AccID"] = i.AccID
                    obj["isAdmin"] = i.isAdmin
                    obj["EMPName"] = i.EMPName
                    obj["EMPPass"] = i.EMPPass
                }
                else
                {
                    obj2["AccID"] = i.AccID
                    obj2["isAdmin"] = i.isAdmin
                    obj2["EMPName"] = i.EMPName
                    obj2["EMPPass"] = i.EMPPass
                }
                details.push(obj)
            }
            res.render("management", {admin : obj, accounts : obj2, layout : "managementLayout", ACCType : ACCType, DDate : DDate})
        })

    }
}

module.exports = accountsController;