const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin,Course } = require("../db");
const router = express.Router();

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    
    await Admin.create({
        username,
        password
    })
    res.json({
        msg:"Admin Created Successfully"
    })
    
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title  = req.body.title;
    const description  = req.body.description;
    const price  = req.body.price;
    const imageLink  = req.body.imageLink;
    const course= await Course.create({
        title,
        description,
        price,
        imageLink
    })
    res.json({
        msg:"Course created successfully",
        courseId: course._id
    })
    
});

router.get('/courses', adminMiddleware,async(req, res) => {
    // Implement fetching all courses logic
    const allCourse  =  await Course.find({});
    res.json({
        "allCourse":allCourse
    })
});

module.exports = router;