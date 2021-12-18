
// import module `mongodb`
var mongoose = require('mongoose');
console.log("MODEL ACCESSED");
// defines the schema for collection `prices`
var SystemSchema = new mongoose.Schema({
   
    
    EMPPass: {
        type: String,
        required: true
    },
    ADMINPass:
    {
        type: String,
        required: true
    }

});

/*
    exports a mongodb.model object based on PriceSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `balances` -> plural of the argument `balance`
*/
module.exports = mongoose.model('System', SystemSchema, 'System');

