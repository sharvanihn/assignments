const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const name = req.body.username;
  const pass = req.body.password;
  await User.create({
    username: name,
    password: pass,
  });
  res.json({ masg: "User created successfully" });
});

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  const listCourses = await Course.find({});
  res.json({
    courses: listCourses,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;

  await User.updateOne(
    {
      username: username,
    },
    {
      "$push": {
        purchasedCourses: courseId,
      },
    }
  );

  res.json({
    message: "Purchase complete!",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await User.findOne({
    username: req.headers.username,
  });
  console.log(user.purchasedCourses);
  const courses = await Course.find({
    _id: {
      "$in": user.purchasedCourses,
    },
  });

  res.json({
    courses: courses,
  });
});

module.exports = router;
