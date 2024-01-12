const jwt = require("jsonwebtoken");
const jwtpass = require("..");


function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB.
    // Check readme for the exact headers to be expected
    const word = req.headers.authorization.split(" ");
    const token = word[1];
    const verify  = jwt.verify(token,jwtpass);
    if(verify.username){
        req.username =verify.username;
        next();
    } 
    else res.status(403).json({
        "msg":"you are not authenticated"
    })
}

module.exports = userMiddleware;