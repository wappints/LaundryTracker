
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

            res.render("login", {})
}
}
module.exports = systemController;
