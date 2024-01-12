const { Admin } = require("../db");

// Middleware for handling auth
 async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB.
    // Check readme for the exact headers to be expected
    const name = req.headers.username;
    const password = req.headers.password;
     const check = await Admin.findOne({
        username:name,
        password:password
    });
    if(check) next();
    else res.status(403).json({
        msg:"ADMIN NOT FOUND"
    });
    
}

module.exports = adminMiddleware;