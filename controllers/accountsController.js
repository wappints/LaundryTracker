// import module `database` from `../models/db.js`
const { request } = require('express');
const db = require('../models/db.js');
// import module `System` from `../models/AccountModel.js`
const Account = require('../models/AccountModel.js');

const accountsController = {

    getAccounts : function (req,res){
        db.findMany(Account, {}, {}, function(result){
            var obj = {}
            var details = []
            for (var i of result)
            {
                obj["AccID"] = i.AccID
                obj["isAdmin"] = i.isAdmin
                obj["EMPName"] = i.EMPName
                obj["EMPPass"] = i.EMPPass
                details.push(obj)
            }
            res.render("management", {accounts : obj})
        })

    }
}

module.exports = accountsController;