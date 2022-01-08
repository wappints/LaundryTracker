
// import module `mongodb`
var mongoose = require('mongoose');
const { ObjectID } = require('bson');
// defines the schema for collection `prices`
var SalesSchema = new mongoose.Schema({
   
    _id : {
        type : ObjectID,
        required : true
    },
    BalanceID : {
        type: ObjectID,
        required: false
    },
    Name: {
        type: String,
        required: false
    },
    PhoneNum: {
        type: String,
        required: false
    },
    DDate: {
        type: Date,
        required: false
    },
    ThinWash: {
        type: Number,
        required: false
    },
    ThinDry: {
        type: Number,
        required: false
    },
    ThickWash: {
        type: Number,
        required: false
    },
    ThickDry: {
        type: Number,
        required: false
    },
    Fold: {
        type: Number,
        required: false
    },
    Soap: {
        type: Number,
        required: false
    },
    Downy: {
        type: Number,
        required: false
    },
    AmountPaid: {
        type: Number,
        required: false
    },
    TotalPrice: {
        type: Number,
        required: false
    },
    Balance: {
        type: Number,
        required: false
    },
    TokenError: {
        type: Number,
        required: false
    },
 
});

/*
    exports a mongodb.model object based on PriceSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `Sale` -> plural of the argument `Sale`
*/
module.exports = mongoose.model('Sale', SalesSchema, 'Sale');

