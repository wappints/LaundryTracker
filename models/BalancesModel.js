// import module `mongodb`
const { ObjectID } = require('bson');
var mongoose = require('mongoose');

// defines the schema for collection `Balances`
var BalancesSchema = new mongoose.Schema({
   
    BalanceID : {
        type: ObjectID,
        required: true
    },
    Name : {
        type: String,
        required: false
    },
    PhoneNum : {
        type: String,
        required: false
    },
    Balance : {
        type: Number,
        required: false
    },  
    DDate : {
        type: String,
        required: false
    }
    
});

/*
    exports a mongodb.model object based on BalancesSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `Balances` -> plural of the argument `Balances`
*/
module.exports = mongoose.model('Balances', BalancesSchema, 'Balances');

