
// import module `mongodb`
var mongoose = require('mongoose');

// defines the schema for collection `Price`
var PriceSchema = new mongoose.Schema({
   
    PriceID : {
        type : mongoose.Schema.Types.ObjectId,
        required : false
    },
    key : {
        type : String,
        required : true
    },
    TNWPrice: {
        type: Number,
        required: true
    },

    TNDPrice: {
        type: Number,
        required: true
    },

    TKWPrice: {
        type: Number,
        required: true
    },

    TKDPrice: {
        type: Number,
        required: true
    },

    FOLDPrice: {
        type: Number,
        required: true
    },
    SOAPPrice: {
        type: Number,
        required: true
    },
    DOWNPrice: {
        type: Number,
        required: true
    }

});

/*
    exports a mongodb.model object based on PriceSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `Price` -> plural of the argument `Price`
*/
module.exports = mongoose.model('Price', PriceSchema, 'Price');

