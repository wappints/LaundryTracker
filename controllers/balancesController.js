// import module `database` from `../models/db.js`
const { request } = require('express');
const db = require('../models/db.js');

// import module `System` from `../models/InventoryModel.js`
const Balances = require('../models/BalancesModel.js');

const balancesController = {

    getBalances : function (req,res){
        var DDate = req.params.DDate
        var ACCType = req.params.ACCType

        db.findMany(Balances, {}, {}, function(result)
        {
            var obj = {}
            var details = []
            for (var i of result)
            {
                obj = {}
                obj["Name"] = i.Name,
                obj["PhoneNum"] = i.PhoneNum,
                obj["DDate"] = i.DDate,
                obj["Balance"] = i.Balance
                details.push(obj)
            }
            console.log(details)
            res.render("balances", {entry : details, DDate :DDate, ACCType : ACCType})
        })
       

    }
}

module.exports = balancesController;