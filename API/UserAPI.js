const {request} = require('express');
const exp = require('express');
const {Db} = require('mongodb');
const verifyToken = require('./verifyToken');

//import bcryptjs for password hashing
const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");

//import jsonwebtoken to create a token for authentication
const jwt = require("jsonwebtoken");

const expressAsyncHandler = require('express-async-handler');
const userApp = exp.Router();

//To extraxt body from request
userApp.use(exp.json());

//Route to get all users (GET)
userApp.get('/getUsers', verifyToken , expressAsyncHandler(async (req, res) => {
    // Get userCollection object
    const userCollection = req.app.get("userCollection");
    // Get all users
    const users = await userCollection.find().toArray();
    
    res.send({message: "Retrieval of Users Successful", payload: users});
}) )


//Route for user login (POST)
userApp.post('/login', expressAsyncHandler(async (req, res) => {
    //Get userCollection object
    const userCollection = req.app.get("userCollection");

    //search for the user with the given emailID
    const user = await userCollection.findOne({emailID: req.body.emailID});
    //Logic for Authentication
    if(user == null)
        res.send({message: "User Not Found"});
    else {
        //Compare the password with the hashed password
        let isMatch = await bcryptjs.compare(req.body.password, user.password);
        if(isMatch == false)
            res.send({message: "Incorrect Password"});
        else {
            //Create a token
            const token = jwt.sign({emailID: user.emailID}, "123456", {expiresIn: "2d"});
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 2*24*60*60*1000),
                
            })
            res.send({message: "Login Successful", payload: token, userObj: user});
        }
    }
}) )

//Route for user signup (POST)
userApp.post('/signup', expressAsyncHandler(async(req, res) => {
    //Get userCollection object
    const userCollection = req.app.get("userCollection");

    //Create a new user object
    const user = req.body

    let userExists = await userCollection.findOne({emailID: user.emailID});

    if(userExists != null) 
        res.send({message: "User Already Exists"});
    else {
        //hash the password
        let hashedPassword = await bcryptjs.hash(user.password, 6);
        //replace plain password with hashed password
        user.password = hashedPassword;

        //insert the user into the database
        await userCollection.insertOne(user);
        res.send({message: "User Created Successfully"});
    }

}) )

module.exports = userApp;