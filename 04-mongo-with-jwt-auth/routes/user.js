const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Admin,Course, User } = require("../db");
const jwt = require("jsonwebtoken");
const jwtpass = require("..");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.usename;
    const password = req.body.password;

    User.create({
        username,
        password
    })
    res.json({
        message: "User created successfully"
    })
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.usename;
    const password = req.body.password;

    try{
        await Admin.findOne({
           username,
           password
       })
       const token  = jwt.sign({username,password},jwtpass);
       res.json({
           token
       })
    }
    catch(e){
       res.status(411).json({
           msg:"Incorrect email and password"
       })
    }
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const allCourse  =  await Course.find({
        published:true
    });
    res.json({
        "allCourse":allCourse
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const username = req.username;
    const courseId = req.params.courseId;

    await Course.update({
        username
    },{
        "$push": {
            purchasedCourses: courseId
        }
    })
    res.json({
        message: "Purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.username
    });

    
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router