
const { request } = require('express');
const db = require('../models/db.js');

const Account = require('../models/AccountModel.js');

const sessionController = {

    getSession : function (req, res) {

        var EMPName = req.body.EMPName
        var EMPPass = req.body.EMPPass 
        var DDate = req.params.DDate
        var ACCType = req.params.ACCType
        /*
            button onclick ->  confirm -> function ()

            ACCType = {hbs acc}
            DDate = {hbs ddate}
            Name = input field
            Pass = input field

            {
                $.get(/home/ + ACCType,  {EMPName : Name, EMPPass : Pass})
            }
        */
        db.findOne(Account, {EMPName : EMPName, EMPPass : EMPPass}, function(result) {
            var Session = result.EMPName
            if (result)
                res.redirect("/home/" + ACCType + "/" + Session + "/" + DDate)
        })
    }
}

module.exports = sessionController;