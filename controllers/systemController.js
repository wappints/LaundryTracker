
const { request } = require('express');
const db = require('../models/db.js');
const System = require('../models/SystemModel.js');
const { validationResult } = require('express-validator');

const systemController = {
    getSystem : function (req, res) {
        res.render("login", {})
    },
    postLogin: function (req, res) {
        var errors = validationResult(req);
        var currentDate = new Date()
        currentDate.setHours(currentDate.getHours() + 8);
        var formattedDate = currentDate.toISOString().split('T')[0];
        
        if (errors.isEmpty()) {
            var ACCType = req.body.ACCType
            var PASSField = req.body.PASSField;
            var session = "Anonymous"
            if (ACCType === "EMPLOYEE") {
                db.findOne(System, {EMPPass : PASSField}, {}, function(result) {
                    if (result != null) {
                        if (result.EMPPass === PASSField) {
                            res.redirect("home/EMPLOYEE/" + session + "/" + formattedDate);
                        }
                        else {
                            var details = {
                                loginError : `Password is incorrect`
                            }
                            res.render("login", details);
                        }
                    }
            });
        }
            else {
                db.findOne(System, {ADMINPass : PASSField}, {}, function(result) {
                    if (result != null) {
                        if (result.ADMINPass === PASSField) {
                            res.redirect("home/ADMIN/" + session + "/" + formattedDate);
                        }
                    }
                });
            }
        }
        else {
            var details = {};
            res.render('login', details);
        }
    }
}
module.exports = systemController;
