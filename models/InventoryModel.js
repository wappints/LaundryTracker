
// import module `mongodb`
var mongoose = require('mongoose');

// defines the schema for collection `transact`
var InventorySchema = new mongoose.Schema({
   

    INVDowny :   {
        type : Number,
        required: true
    },

    INVSoap :   {
        type : Number,
        required: true
    },
});

/*
    exports a mongodb.model object based on cartSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `Inventories` -> plural of the argument `Inventory`
*/
module.exports = mongoose.model('Inventory', InventorySchema, 'Inventory');

