
// import module `mongodb`
var mongoose = require('mongoose');

// defines the schema for collection `Account`
var AccountSchema = new mongoose.Schema({
    _id:
    {
        type : String,
        required : true
    },
    isAdmin:
    {
        type : String,
        required : true
    },
    EMPName: 
    {
        type: String,
        required: true
    },
    EMPPass: 
    {
        type: String,
        required: true
    },

});

/*
    exports a mongodb.model object based on PriceSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `Account` -> plural of the argument `account`
*/
module.exports = mongoose.model('Account', AccountSchema, 'Account');

