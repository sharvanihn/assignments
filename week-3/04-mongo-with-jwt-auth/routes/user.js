const { Router } = require("express");
const jwt = require("jsonwebtoken");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db")
const { JWT_SECRET } = require("../config");

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

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const admin = User.find({ username, password });
    if (admin) {
      const token = jwt.sign({ username }, JWT_SECRET);
      res.json({ token });
    } else {
      res.status(411).json({ msg: "Incorrect email or password" });
    }
    
});

router.get('/courses', userMiddleware, async (req, res) => {
    // Implement listing all courses logic
    const listCourses = await Course.find({});
    res.json({
      courses: listCourses,
    });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const auth = req.headers.authorization;
  const token = auth.split(" ")[1];
  const decoded = jwt.decode(token, JWT_SECRET);
  const username = decoded.username

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
  const auth = req.headers.authorization;
  const token = auth.split(" ")[1];
  const decoded = jwt.decode(token, JWT_SECRET);
  const username = decoded.username;

  const user = await User.findOne({
    username: username,
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

module.exports = router