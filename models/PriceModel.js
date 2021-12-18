
// import module `mongodb`
var mongoose = require('mongoose');

// defines the schema for collection `prices`
var PriceSchema = new mongoose.Schema({
   
    PriceID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },

    ThinWash: {
        type: Numbers,
        required: true
    },

    ThinDry: {
        type: Numbers,
        required: true
    },

    ThickWash: {
        type: Numbers,
        required: true
    },

    ThickDry: {
        type: Numbers,
        required: true
    },

    Fold: {
        type: Numbers,
        required: true
    },
    Soap: {
        type: Numbers,
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

