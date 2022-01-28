// import module `database` from `../models/db.js`
const { request } = require('express');
const formatdate = require('hbs-helpers/lib/helpers/formatdate');
const db = require('../models/db.js');

// import module `Log` from `../models/LogModel.js`
const Log = require('../models/LogModel.js');
const Sale = require('../models/SalesModel.js');

const logController = {

    getLogs : function (req,res) {
      
        var Session = req.params.Session 
        var typeOfAcc = req.params.ACCType    
        var currentDate = new Date()
        currentDate.setHours(currentDate.getHours() + 8);
        var formattedDate = currentDate.toISOString().split('T')[0];
        var DDate = req.query.DDate

        if (DDate == null)
        DDate = req.params.DDate

       if (DDate == null)
        DDate = req.body.DDate

      var typeOfAcc = req.params.ACCType

       if (typeOfAcc == null)
        typeOfAcc = req.body.ACCType
      var currentDate = new Date(DDate)
      var formattedDate = currentDate.toISOString().split('T')[0];

      var start = formattedDate + "T00:00:00.000Z"
      var end = formattedDate + "T23:59:59.999Z"

     start = new Date(start).toISOString()
      end = new Date(end).toISOString()
        db.findMany(Log, {DDate : {$gte : start, $lte : end}}, {}, function(result){
            var obj = {}
            details = []
            for (var i of result) {
                obj = {}
                obj["LogID"] = i._id,
                obj["EditLog"] =      i.EditLog,
                obj["DDate"] = i.DDate,
                obj["Name"] = i.Name,
                obj["AmountPaid"] = i.AmountPaid,
                obj["TotalPrice"] = i.TotalPrice,
                obj["Balance"] = i.Balance,
                obj["TokenError"] = i.TokenError,
                obj["Handler"] = i.Handler 
                details.push(obj) 
            }
            var renderobjects = {ACCType : typeOfAcc, DDate : formattedDate, Session : Session, layout : 'logLayout', object : details}
            res.render('log', renderobjects)
        })            
        
    },


}

module.exports = logController;