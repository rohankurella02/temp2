const exp = require('express');
const app = exp();
const mclient = require('mongodb').MongoClient;
const port = 4000;
const cookieParser = require('cookie-parser');

var cors = require('cors')

app.use(cors())
app.use(cookieParser());

//importing dotenv file
require('dotenv').config();

//import path module
const path = require('path');

//connect build of react with nodejs
app.use(exp.static(path.join(__dirname, 'build')));



//database connection using mongodb
const DBurl = "mongodb+srv://rohandb:babu4321@cluster0.mfaor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//connect with mongodb server
mclient.connect(DBurl).then((client) => {
    //get the database object 
    const db = client.db('shoppingApplication');

    //creating a collection
    let userCollection = db.collection('userCollection');
    let productCollection = db.collection('productCollection');

    //sharing collection object to API
    app.set('userCollection', userCollection);
    app.set('productCollection', productCollection);

    console.log("Connection to MongoDB Server Successful")
}).catch(err => {
    console.log("Connection to MongoDB Server Failed", err);
})

//import userApp and productApp
const userApp = require('./API/UserAPI');
const productApp = require('./API/ProductAPI.js');
const checkoutApp = require('./API/checkout.js');
const {response} = require('express');

app.use((req, res, next) => {
    console.log(req.cookies)
    next();
})

//execute specific middleware based on path
app.use('/user', userApp);
app.use('/product', productApp);
app.use('/checkout', checkoutApp);

//get request for home page
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

//dealing with page refresh
app.get('*', (req, res) => {
    app.use(exp.static(path.resolve(__dirname, 'build')));
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});



//Handling Invalid URL
app.use((req, res) => {
    res.send({message: "Invalid URL"});
})

//Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(500).send({message: 'Something went wrong', error: err.message});
});



//assigning port to server
app.listen(port, () => {
    console.log("Server is running on port " + port);
})
