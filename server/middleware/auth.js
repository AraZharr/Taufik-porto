const User = require('../models/User');

const auth = async (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated'
    });
  }

  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      req.session.destroy();
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication error'
    });
  }
};

module.exports = auth;
