// import module `mongodb`
const { ObjectID } = require('bson');
var mongoose = require('mongoose');

// defines the schema for collection `prices`
var BalancesSchema = new mongoose.Schema({
   

    Name : {
        type: String,
        required: false
    },
    Phone : {
        type: String,
        required: false
    },
    Balance : {
        type: Number,
        required: false
    },  
    Date : 
    {
        type: Date,
        required: false
    }
});

/*
    exports a mongodb.model object based on PriceSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `balances` -> plural of the argument `balance`
*/
module.exports = mongoose.model('Balances', BalancesSchema, 'Balances');

