// adminMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    if (user && user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ message: 'You do not have admin privileges.' });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = adminMiddleware;
