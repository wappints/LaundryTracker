const { request } = require('express');
const db = require('../models/db.js');
const viewLogController = {
    newDate : function (req,res){
        var formattedDate = req.params.DDate
        var Session = req.params.Session
        var ACCType = req.params.ACCType
        res.redirect("../../../log/" + ACCType + "/" + Session + "/" + formattedDate);
    }
}
module.exports = viewLogController;