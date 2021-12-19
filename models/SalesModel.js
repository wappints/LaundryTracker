
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
    PhoneNum: {
        type: String,
        required: true
    },
    DDate: {
        type: Date,
        required: true
    },


    
    ThinWash: {
        type: Number,
        required: true
    },
    ThinDry: {
        type: Number,
        required: true
    },
    ThickWash: {
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
    Downy: {
        type: Number,
        required: true
    },



    AmountPaid: {
        type: Number,
        required: true
    },
    TotalPrice: {
        type: Number,
        required: true
    },
    Balance: {
        type: Number,
        required: true
    },




    TokenError: {
        type: Number,
        required: true
    },


 
});

/*
    exports a mongodb.model object based on PriceSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `sales` -> plural of the argument `Sale`
*/
module.exports = mongoose.model('Sale', SalesSchema, 'Sale');

