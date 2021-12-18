
// import module `mongodb`
var mongoose = require('mongoose');

// defines the schema for collection `transact`
var LogsSchema = new mongoose.Schema({
   

    Logs :   {
        type : Array,
        required: false
    },


});

/*
    exports a mongodb.model object based on cartSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `logs` -> plural of the argument `Log`
*/
module.exports = mongoose.model('Logs', LogsSchema, 'logs');

