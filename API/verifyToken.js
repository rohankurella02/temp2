const jwt = require('jsonwebtoken');
require('dotenv').config();

//write a middleware to verify the token
const verifyToken = (req, res, next) => {
    //get the token from the header 
    const bearerToken = req.headers.authorization
    //check whether the token is present
    if(bearerToken == undefined) {
        return res.send({message: "Unauthorized Request"})
    }
    //split the token
    const token = bearerToken.split(" ")[1]

    //verify the token
    jwt.verify(token, "123456", (err, authData) => {
        if(err) {
            return res.send({message: "Session Expired... Please Login Again"})
        }
        next()
    }) 
}

module.exports = verifyToken;