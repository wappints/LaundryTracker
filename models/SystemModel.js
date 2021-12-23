
// import module `mongodb`
var mongoose = require('mongoose');
// defines the schema for collection `System`
var SystemSchema = new mongoose.Schema({
   
    EMPPass: {
        type: String,
        required: true
    },
    ADMINPass:
    {
        type: String,
        required: true
    }

});

/*
    exports a mongodb.model object based on SystemSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `System` -> plural of the argument `System`
*/
module.exports = mongoose.model('System', SystemSchema, 'System');

