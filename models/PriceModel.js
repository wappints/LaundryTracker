
// import module `mongodb`
var mongoose = require('mongoose');

// defines the schema for collection `prices`
var PriceSchema = new mongoose.Schema({
   
    PriceID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },


    
    TNWPRice: {
        type: Number,
        required: true
    },

    TNDPrice: {
        type: Number,
        required: true
    },

    TNKPrice: {
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
    to collection `prices` -> plural of the argument `Price`
*/
module.exports = mongoose.model('Price', PriceSchema, 'prices');

