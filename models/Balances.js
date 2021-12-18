
// import module `mongodb`
var mongoose = require('mongoose');

// defines the schema for collection `prices`
var BalancesSchema = new mongoose.Schema({
   

    BalanceEntries: {
        type: Array,
        required: true
    },


 
});

/*
    exports a mongodb.model object based on PriceSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `balances` -> plural of the argument `balance`
*/
module.exports = mongoose.model('balances', BalancesSchema, 'Balances');

