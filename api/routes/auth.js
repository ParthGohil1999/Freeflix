const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(401).json("All Fields are required!");
    return;
  }
  const newUser = new User({
    username: username,
    email: email,
    password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(401).json("Wrong password or username!");
      return;
    }

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      res.status(401).json("Wrong password or username!");
      return;
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADMIN LOGIN
router.post("/adminLogin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json("Wrong password or username!");
      
    }

    if (user.isAdmin) {
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (originalPassword !== req.body.password) {
        return res.status(401).json("Wrong password or username!");
        
      }

      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        { expiresIn: "5d" }
      );

      const { password, ...info } = user._doc;

      res.status(200).json({ ...info, accessToken });
    }else{
      return res.status(401).json("You are not an Admin!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
