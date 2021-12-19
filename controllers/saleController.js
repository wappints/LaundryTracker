
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
function formatCondition1String(foo)
{
    foo = foo + "T00:00:00.000Z";
    return foo
  
}
function formatCondition2String(bar)
{
    bar = bar + "T23:59:59.000Z"
    return bar
}
const saleController = {

    getEntries : function (req, res) {
        console.log("I AM HERE")
        var currentDate = new Date()
        var setDate = currentDate;
        setDate.setHours(currentDate.getHours() + 8);
        var formattedDate = setDate.toISOString().split('T')[0];
        
        first = new Date(formatCondition1String(formattedDate))
        second = new Date (formatCondition2String(formattedDate))
        // $gte: ISODate("2016-01-01T00:00:00.000Z"),
        // $lt: ISODate("2016-01-01T23:59:59.000Z"),        


        console.log(first)
        console.log(second)
        db.findMany(Sale, {DDate:{"$gte":first, "$le":second}}, {}, function(result){
            console.log(result)

        })
        console.log("HERE2")
        res.render('home', {DATE : formattedDate})
        
},
   

}
module.exports = saleController;
