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
        var currentDate = new Date()
        currentDate.setHours(currentDate.getHours() + 8);
        var formattedDate = currentDate.toISOString().split('T')[0];

        db.findMany(Log, {}, {}, function(result){
            var obj = {}
            details = []
            for (var i of result) {
                obj = {}
               
                obj["LogID"] = i._id,
                obj["Editors"] =    i.Editors,
                obj["EditLog"] =      i.EditLog,
 
                details.push(obj)
                var renderobjects = {ACCType : typeOfAcc, DDate : formattedDate, Session : Session, layout : 'logLayout', object : obj}
                
            }
            
            res.render('log', renderobjects)
        })            
        
    }
}

module.exports = logController;