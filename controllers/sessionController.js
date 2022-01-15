const { request } = require('express');
const db = require('../models/db.js');

const Account = require('../models/AccountModel.js');

const sessionController = {

    getSession : function (req, res) {

        var EMPName = req.params.SessionName
        var EMPPass = req.params.SessionPass
        var DDate = req.params.DDate
        var ACCType = req.params.ACCType
        var isAdmin = true;
        if (ACCType === "EMPLOYEE")
            isAdmin = false;
        
        isAdmin = isAdmin.toString()
        EMPName = EMPName.trim()
        db.findMany(Account, {}, {}, function(result){})
        db.findOne(Account, {EMPName : { '$regex': '^'+EMPName+"$", $options: 'i'}, EMPPass : EMPPass, isAdmin : {$eq : isAdmin}}, {}, function(result) {
            if (result) {
                var Session = result.EMPName
                res.redirect("../../../../home/" + ACCType + "/" + Session + "/" + DDate)
            }
        })
    }
}

module.exports = sessionController;