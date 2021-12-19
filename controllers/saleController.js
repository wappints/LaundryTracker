
// import module `database` from `../models/db.js`
const { request } = require('express');
const db = require('../models/db.js');

// import module `System` from `../models/SystemModel.js`
const Sale = require('../models/SalesModel.js');

const { validationResult } = require('express-validator');
/*
    defines an object which contains functions executed as callback
    when a client requests for `signup` paths in the server
*/
const systemController = {

    getEntries : function (req, res) {

        
},
   

}
module.exports = systemController;
