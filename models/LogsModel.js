
// import module `mongodb`
var mongoose = require('mongoose');

// defines the schema for collection `Logs`
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
    to collection `Logs` -> plural of the argument `Logs`
*/
module.exports = mongoose.model('Logs', LogsSchema, 'Logs');

