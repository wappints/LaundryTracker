
// import module `database` from `../models/db.js`
const { request } = require('express');
const db = require('../models/db.js');

// import module `System` from `../models/SystemModel.js`
const System = require('../models/SystemModel.js');

const { validationResult } = require('express-validator');
/*
    defines an object which contains functions executed as callback
    when a client requests for `signup` paths in the server
*/
const systemController = {

    getSystem : function (req, res) {

        res.render("login", {})
},
    postLogin: function (req, res) {
    var errors = validationResult(req);
    //var acctype = req.body.ACCType;
    //console.log(acctype)
    var currentDate = new Date()
    currentDate.setHours(currentDate.getHours() + 8);
    var formattedDate = currentDate.toISOString().split('T')[0];
        
    //console.log(formattedDate)

    if(errors.isEmpty()){
        var ACCType = req.body.ACCType;
        var PASSField = req.body.PASSField;
        //console.log(PASSField)
    

       if (ACCType === "EMPLOYEE")
       {
        db.findOne(System, {EMPPass : PASSField}, {}, function(result){
            //console.log(result)
            if (result != null){
                    if(result.EMPPass === PASSField){
                        //console.log("FOUND")
                        res.redirect("home/EMPLOYEE/" + formattedDate);
                        //res.redirect("home/EMPLOYEE/UNKNOWN" + formattedDate);
                    }
                    else{
                        //console.log("NOT FOUND")
                        var details = {
                            loginError : `Password is incorrect`
                        }
                        res.render("login", details);
                    }

                }
            else{
                //console.log("NOT FOUND 2")
                var details = {
                    loginError : `Password is not associated with any account`
                }
                res.render("login", details);
            }
        });
    }
    else 
    {
        db.findOne(System, {ADMINPass : PASSField}, {}, function(result){
            //console.log(result)
            if (result != null){
                    if(result.ADMINPass === PASSField){
                        //console.log("FOUND")
                        res.redirect("home/ADMIN/" + formattedDate);
                        //res.redirect("home/ADMIN/UNKNOWN" + formattedDate);
                    }
                    else{
                        //console.log("NOT FOUND")
                        var details = {
                            loginError : `Password is incorrect`
                        }
                        res.render("login", details);
                    }

                }
            else{
                //console.log("NOT FOUND 2")
                var details = {
                    loginError : `Password is not associated with any account`
                }
                res.render("login", details);
            }
        });
    }
    }
    else{

        var details = {};


        res.render('login', details);
    }
}
}
module.exports = systemController;
