const mongoose = require('mongoose');
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Transact` from `../models/TransactionModel.js`
const Cart = require('../models/TransactionModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `cart` paths in the server
*/
const TransactController = {

    /*
        executed when the client sends an HTTP GET request `/checkout`
        as defined in `../routes/routes.js`
    */
   
    getCart: function (req, res) {

        if (req.session.username){
            var id = req.id;
            var qty = req.qty;
            var array = []
            var temp = []
            var usernameLink = "/profile/" + req.session.username;
            console.log(id + " cartttttt  " + qty);
            db.findMany(Cart, {}, {}, function (result) 
            {
                console.log("the result is" + result)   
                for(var i of result) {
                        
                        temp = {

                            itemID : i.itemID,
                            qty : i.qty,
                            itemName : "",
                            itemPic : "empty",
                            itemPrice : 0

                        };
                    array.push(temp);
                    }


                db.findMany(Item, {}, {}, function (result) 
                {               // Cart will look into Item collections, finding the same id it has in array [], then add new attributes itemName, itemPicture, itemPrice
                            for (var j of result)
                            {
                                for (i = 0; i < array.length; i++)
                                if (j._id.equals(array[i].itemID))
                                {
                                    console.log("SUCCESS");
                                    array[i].itemName = j.itemName;    
                                    array[i].itemPic = j.itemPic
                                    console.log(typeof(j.itemPic))
                                    console.log(typeof( array[i].itemPic))
                                    array[i].itemPic =  j.itemPic
                                    array[i].itemPrice = j.itemPrice;
                                    console.log(array[i].itemName + " == " + j.itemName)
                                    console.log( array[i].itemPic  + " == " + j.itemPic)
                                    console.log(array[i].itemPrice + " == " + j.itemPrice)

                                }
                                
                            }
                    console.log(array)
                    res.render('checkout', {item: array, usernameLink : usernameLink});  
                            
                    })
                    

            });
        }
        else{
            res.redirect('/login');
        }
    },


    removeItem: function (req, res) { // get the item id from the parent node of the remove button 
        // your code here

        var id = req.query._id;
        var qty = req.query.qty;
        console.log("ObjectID is " + id);
        id = id.trim();
        id = new mongoose.mongo.ObjectId(id)
       
    

        db.findOne(Item, {'_id': id}, {}, function (result) {

            console.log(result._id);
            var stock = result.stocks;
            console.log(qty + " is quantity")
            qty = parseInt(qty);
            console.log(stock);
            stock = stock + qty;
            console.log(stock);
            var sold = result.sold;
            console.log(sold);
            sold = sold - qty;
            console.log(sold);

            db.updateOne(Item, {'_id' : id}, {stocks : stock, sold : sold }, function (flag) {
                if (flag)
                    console.log("MEOW");
            });
           
            });
        db.deleteOne(Cart, {itemID: id}, function(flag)
        {
            if(flag)
                res.send('deleted')
        });
    },


    removeAll: function (req, res) { // get the item id from the parent node of the remove button 
        // your code here
        db.deleteMany(Cart, {}, function(result)
        {
            console.log(result)
             res.redirect('/home')
        });
    },
    insertItem: function (req, res) 
    {
        console.log("HIIIIIIII")
        id = req.body.itemID;
        qty = parseInt(req.body.qty);
        console.log("req id is " + id + " and qty is " + qty);
        id = id.trim();
        id = new mongoose.mongo.ObjectId(id)
        db.findOne(Cart, {itemID : id}, {}, function (result) {

            if (result)
            {
                console.log(result)
                console.log(result.qty);
                console.log(qty);
                console.log("Hi");
                var x = result.qty;
                    
                x = x + qty;
                db.updateOne(Cart,  {itemID : id}, {qty : x}, function (result) {
                    if (result != null)
                        console.log("NOT NULL");
                    else 
                        console.log("NULL");
                });
            }
            

            else {
                db.insertOne(Cart, {itemID : id, qty : qty}, function (result) {
                     if (result != null)
                        console.log("NOT NULL");
                    else 
                        console.log("NULL");
                });
                }
                id = new mongoose.mongo.ObjectId(id);
                console.log(id);
                console.log("WORKS")
                console.log(qty);

            db.findOne(Item, {'_id': id}, {}, function (result) {

                console.log(result._id);
                var stock = result.stocks;
                console.log(stock);
                stock = stock - qty;
                console.log(stock);
                var sold = result.sold;
                console.log(sold);
                sold = sold + qty;
                console.log(sold);
                db.updateOne(Item, {'_id' : id}, {stocks : stock, sold : sold }, function (result) {
                    if (result == null)
                        console.log("MEOW");
                });
               
                });
            

        });
    }
}

/*
    exports the object `cartController` (defined above)
    when another script exports from this file
*/
module.exports = TransactController;
