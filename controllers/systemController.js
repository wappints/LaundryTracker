
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `System` from `../models/SystemModel.js`
const System = require('../models/SystemModel.js');

//const bcrypt = require ('bcrypt');

//const { validationResult } = require('express-validator');
const SystemModel = require('../models/SystemModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `signup` paths in the server
*/
const systemController = {

    getSystem : function (req, res) {
        if (req != null)
            console.log("HI")
        else 
            res.render('login')
        /*if (req.session.ACCType == "ADMIN")
        {
            var query = {ADMINPass : req.params.PASSField}
            var projection = null
            db.findOne(System, query, projection, function(result)
            {
                if (result != null)
                {
                    var details = {
                        ACCType : "ADMIN"
                    }
                    res.render('home', details);
                }
                else
                    console.log("ADMIN HAS WRONG PASSWORD") // CHANGE LATER
            });
        }
            
        else (req.params.ACCType == "EMPLOYEE")
        {
            var query = {EMPPass : req.params.PASSField}
            var projection = null
            db.findOne(System, query, projection, function(result)
            {
                if (result != null)
                {
                    var details = {
                        ACCType : "EMPLOYEE"
                    }
                    res.render('home', details);
                }
                else
                    console.log("EMPLOYEE HAS WRONG PASSWORD") // CHANGE LATER
            });
        }
        console.log(res);
    }
    */
}

}

module.exports = systemController;
