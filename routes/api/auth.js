const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route GET api/auth
// @desc     Test route
//@access Public

router.get('/',auth,  async (req, res) => {
  try {
    // console.log(1);
    const user = await User.findById(req.user.id).select('-password');
    // console.log(2);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Server Error');
  }
});

// @route   GET api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please includ a valid email').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      // See if user exists

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      return jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            console.error('user.js - ' + err.message);
            res.status(500).send('Server error');
          }
          //res.send('User Registered');
          res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.error('user.js - ' + err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
