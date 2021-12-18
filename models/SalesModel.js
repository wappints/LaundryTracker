
// import module `mongodb`
var mongoose = require('mongoose');

// defines the schema for collection `prices`
var SalesSchema = new mongoose.Schema({
   
    SalesID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },

    Name: {
        type: String,
        required: true
    },

    TotalItems: {
        type: Number,
        required: true
    },

    AmountPaid: {
        type: Number,
        required: true
    },

    Balance: {
        type: Number,
        required: true
    },

    ThickDry: {
        type: Number,
        required: true
    },

    Fold: {
        type: Number,
        required: true
    },

    Soap: {
        type: Number,
        required: true
    },

    TokenError: {
        type: Number,
        required: true
    },

    Date: {
        type: Date,
        required: true
    }
});

/*
    exports a mongodb.model object based on PriceSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `prices` -> plural of the argument `Price`
*/
module.exports = mongoose.model('Price', PriceSchema, 'prices');

