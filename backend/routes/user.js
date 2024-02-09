const express = require('express');
const { authenticate } = require('../middlewares/auth');
const User = require('../models/User');

const router = express.Router();

router.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}`, user: req.user });
});

module.exports = router;