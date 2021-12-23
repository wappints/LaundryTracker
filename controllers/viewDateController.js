const { request } = require('express');
const db = require('../models/db.js');
const viewDateController = {
    newDate : function (req,res){
        var formattedDate = req.params.DDate
        res.redirect("../../home/EMPLOYEE/" + formattedDate);
    }
}
module.exports = viewDateController;