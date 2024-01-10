const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
const { JWT_SECRET } = require("../config");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const name = req.body.username;
  const pass = req.body.password;
  await Admin.create({
    username: name,
    password: pass,
  });
  res.json({ masg: "Admin created successfully" });
});

router.post("/signin", (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const admin = Admin.find({ username, password });
  if (admin) {
    const token = jwt.sign({ username }, JWT_SECRET);
    res.json({token})
  }else{
    res.status(411).json({msg : "Incorrect email or password"})
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imagelink = req.body.imagelink;

  const newCourse = await Course.create({
    title: title,
    description: description,
    price: price,
    imagelink: imagelink,
  });

  res.json({ masg: "Admin created successfully", courseId: newCourse._id });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const adminCourses = await Course.find({});
  res.json({
    courses: adminCourses,
  });
});

module.exports = router;
