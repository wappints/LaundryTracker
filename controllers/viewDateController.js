const { request } = require('express');
const db = require('../models/db.js');
const viewDateController = {
    newDate : function (req,res){
        var formattedDate = req.params.DDate
        var Session = req.params.Session
        var ACCType = req.params.ACCType
        res.redirect("../../../home/" + ACCType + "/" + Session + "/" + formattedDate);
    }
}
module.exports = viewDateController;