const {request} = require('express');
const exp = require('express');
const {Db} = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

const expressAsyncHandler = require('express-async-handler');
const productApp = exp.Router();

//To extract body from request
productApp.use(exp.json());

//Route to get all products (GET)
productApp.get('/getProducts', expressAsyncHandler(async (req, res) => {
    // get productCollection object
    let productCollection = req.app.get('productCollection');
    let products = await productCollection.find().toArray();
    res.send(products);
}));

//Route to get a product using its id (GET)
productApp.get('/getProductsByID/:id', expressAsyncHandler(async (req, res) => {
    //get The Parameter from the URL
    let productID = req.params.id;
    console.log(req.params.id);
    //var o_id = new mongodb.ObjectID(productID);

    // get productCollection object
    const productCollection = req.app.get('productCollection');
    let product = await productCollection.findOne({_id: new ObjectId(productID), function(err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(doc);
        }
    }});
    if(product == null) {
        res.send({message: `Product with id ${productID} not found`});
    }
    else {
        res.send({message: "Product found in the DataBase", payload: product});
    }
}) )

//Route to get a product using its name (GET)
productApp.get('/getProductsByName/:name', expressAsyncHandler(async (req, res) => {
    //get The Parameter from the URL
    let productName = req.params.name;

    //get productCollection object
    const productCollection = req.app.get('productCollection');
    let product = await productCollection.findOne({name: productName});
    if(product == null) {
        res.send({message: "Product not found in the DataBase"});
    }
    else {
        res.send({message: "Product found in the DataBase", payload: product});
    }
}) )

//Route to create a new product (POST)
productApp.post('/createProduct', expressAsyncHandler(async (req, res) => {
    //get the User Object from the request body
    let product = req.body;

    //get the productCollection object
    const productCollection = req.app.get('productCollection');

    //Insert the object into the colletction
    let result = await productCollection.insertOne(product);
    res.send({message: "Product added successfully", payload: result});
}) )

//Route to update a product (PUT)
productApp.put('/updateProduct/:id', expressAsyncHandler(async (req, res) => {
    //get the modified product object from the request body
    let product = req.body;

    //get productCollection object
    const productCollection = req.app.get('productCollection');

    let result = await productCollection.updateOne({id: product.id}, {$set: product});
    res.send({message: "Product updated successfully", payload: result});
}) )

//Route to delete a product (DELETE)
productApp.delete('/deleteProduct/:id', expressAsyncHandler(async (req, res) => {
    //get the product id from the URL
    let productID = +req.params.id;

    //get productCollection object
    const productCollection = req.app.get('productCollection');
    let result = await productCollection.deleteOne({id: productID}, function(err, result) {
        if(err) {
            res.send({message: "Product not found in the DataBase"});
        }
        else {
            res.send({message: "Product deleted successfully", payload: result});
        }
    });
}) )

module.exports = productApp;