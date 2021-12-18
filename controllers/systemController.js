
// import module `database` from `../models/db.js`
const { request } = require('express');
const db = require('../models/db.js');

// import module `System` from `../models/SystemModel.js`
const System= require('../models/SystemModel.js');
const bcrypt = require ('bcrypt');

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
        console.log("I AM HERE2")
    var errors = validationResult(req);

    if(errors.isEmpty()){
        var ACCType = req.body.ACCType;
        var PASSfield = req.body.PASSField;

        var type = {

            EMPPass : PASSField

        }

        var projection = 'EMPPass ADMINPass';
        console.log("I AM HERE")
        db.findOne(System, type, projection, function(result){
            if (result != null){
                bcrypt.compare(EMPPass, result.EMPPas, function(err, equal){

                    if(equal){
                        req.session.ACCType = type.ACCType;
                        res.redirect('/home');
                    }
                    else{
                        var details = {
                            loginError : `Password is incorrect`
                        }
                        res.render("login", details);
                    }

                });
            }
            else{
                var details = {
                    loginError : `Password is not associated with any account`
                }
                res.render("login", details);
            }
        });
    }
    else{

        var details = {};


        res.render('login', details);
    }
}
}
module.exports = systemController;
