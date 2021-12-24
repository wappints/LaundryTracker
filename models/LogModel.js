
// import module `mongodb`
var mongoose = require('mongoose');

// defines the schema for collection `Log`
var LogSchema = new mongoose.Schema({
   
    LogID : { 
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    
    EditLog : [{ 
        type : String,
        required : false
    }],
    Name : {
        type : String,
        required : false
    },
    DDate : {
        type : Date,
        required : false
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
    TokenError : {
        type: Number,
        required: false
    },
    Handler : [{
        type: String,
        required : false 
    }]

});

/*
    exports a mongodb.model object based on cartSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `Log` -> plural of the argument `Log`
*/
module.exports = mongoose.model('Log', LogSchema, 'Log');

