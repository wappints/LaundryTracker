
// import module `mongodb`
var mongoose = require('mongoose');
// defines the schema for collection `prices`
var FinalSalesSchema = new mongoose.Schema({

    FinalSalesID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    DDate: {
        type: Date,
        required: true
    },
    ThinWashSum: {
        type: Number,
        required: true
    },
    ThinDrySum: {
        type: Number,
        required: true
    },
    ThickWashSum: {
        type: Number,
        required: true
    },
    ThickDrySum: {
        type: Number,
        required: true
    },
    FoldSum: {
        type: Number,
        required: true
    },
    SoapSum: {
        type: Number,
        required: true
    },
    DownySum: {
        type: Number,
        required: true
    },
    AmountPaidSum: {
        type: Number,
        required: true
    },
    TotalPriceSum: {
        type: Number,
        required: true
    },
    BalanceSum: {
        type: Number,
        required: true
    },
    TokenErrorSum: {
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
module.exports = mongoose.model('Finalsale', FinalSalesSchema, 'Finalsale');

