const db = require('../models/db.js');
const Inventory = require('../models/InventoryModel.js');
const Price = require('../models/PriceModel.js');
const inventoryController = {

    getInventory : function (req, res) {
        var ACCType = req.params.ACCType
        var Session = req.params.Session
        var currentDate = new Date()
        currentDate.setHours(currentDate.getHours() + 8);
        var formattedDate = currentDate.toISOString().split('T')[0];
        db.findOne(Inventory, {}, {}, function(result)
        {
            var object =  result;
            object["ACCType"] = ACCType
            object["Session"] = Session
            object["INVDowny"] = result.INVDowny
            object["INVSoap"] = result.INVSoap
            db.findOne(Price, {}, {}, function(result)
            {
                var SOAPPrice = result.SOAPPrice
                var DOWNPrice = result.DOWNPrice
                object["SOAPPrice"] = SOAPPrice
                object["DOWNPrice"] = DOWNPrice
                object["DDate"] = formattedDate
                object["layout"] = "inventoryLayout"
                res.render("inventory", object)
            })
        })
    },
    setInventory : function (req, res) {
        var INVSoap = req.body.INVSoap
        var INVDowny = req.body.INVDowny
        var object = {
            INVSoap : INVSoap,
            INVDowny : INVDowny
        }
        db.updateOne(Inventory, {}, object, function(result){res.redirect("back")})
    },
}
module.exports = inventoryController;