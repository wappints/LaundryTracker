
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
        console.log(EMPName)
        console.log(EMPPass)
        db.findOne(Account, {EMPName : EMPName, EMPPass : EMPPass, isAdmin : {$eq : isAdmin}}, {}, function(result) {
            if (result) {
                var Session = result.EMPName
                res.redirect("../../../../home/" + ACCType + "/" + Session + "/" + DDate)
            }
            else
                console.log("User does not exist or has wrong input")
        })
    }
}

module.exports = sessionController;