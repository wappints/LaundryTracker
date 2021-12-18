
// import module `database` from `../models/db.js`
const { request } = require('express');
const db = require('../models/db.js');

// import module `System` from `../models/SystemModel.js`
const Sales = require('../models/SalesModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `signup` paths in the server
*/
const systemController = {

    getSystem : function (req, res) {
        details = {ACCType: req.ACCType }
        console.log("LOSER")
        if (req)
            console.log("WINNER")
            //res.render("home", {details})
        
        else 
            console.log("LOSER")

        }
}

module.exports = systemController;
