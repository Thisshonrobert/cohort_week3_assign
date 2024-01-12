// Middleware for handling auth
const jwt = require("jsonwebtoken");
const jwtpass = require("..");

async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. 
    //Check readme for the exact headers to be expected
    const word = req.headers.authorization.split(" ");
    const token = word[1];
    const verify  = jwt.verify(token,jwtpass);
    if(verify.username) {
        req.username =verify.username;
        next();
    }
    else res.status(403).json({
        "msg":"you are not authenticated"
    })
}

module.exports = adminMiddleware;