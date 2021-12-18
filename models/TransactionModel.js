
// import module `mongodb`
var mongoose = require('mongoose');

// defines the schema for collection `transact`
var transactSchema = new mongoose.Schema({
   
    TransactID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },

    Name: {
        type: String,
        required: true
    },

    Qty: {
        type: Numbers,
        required: true
    },

    Amt: {
        type: Numbers,
        required: true
    },

    Bal: {
        type: Numbers,
        required: true
    },

    Token: {
        type: Numbers,
        required: true
    }

});

/*
    exports a mongodb.model object based on cartSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `transact` -> plural of the argument `Transact`
*/
module.exports = mongoose.model('Transact', cartSchema, 'transact');

