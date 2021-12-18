
// import module `mongodb`
var mongoose = require('mongoose');

// defines the schema for collection `prices`
var AccountsSchema = new mongoose.Schema({
   
    EMP: 
    {
        type: Array,
        required: true
    }

});

/*
    exports a mongodb.model object based on PriceSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `accounts` -> plural of the argument `account`
*/
module.exports = mongoose.model('Accounts', AccountsSchema, 'Accounts');

