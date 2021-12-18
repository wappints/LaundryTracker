
// import module `mongodb`
var mongoose = require('mongoose');

// defines the schema for collection `transact`
var LogSchema = new mongoose.Schema({
   
    LogID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },

    Name: {
        type: String,
        required: true
    },

    Logs : [  {
        type : String,
        required: false
    }],

    ShiftStart: {
        type: Numbers,
        required: true
    },

    ShiftEnd: {
        type: Numbers,
        required: true
    }

});

/*
    exports a mongodb.model object based on cartSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `logs` -> plural of the argument `Log`
*/
module.exports = mongoose.model('Log', LogSchema, 'logs');

