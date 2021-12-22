const { request } = require('express');
const db = require('../models/db.js');

const viewDateController = {

    newDate : function (req,res){
        console.log(req)
        var formattedDate = req.params.DDate
        console.log("VIEWTIME")
        console.log(formattedDate)
        res.redirect("../../home/EMPLOYEE/" + formattedDate);
    }
}

module.exports = viewDateController;