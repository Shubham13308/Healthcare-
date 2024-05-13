const jwt = require("jsonwebtoken");
const models = require('../models'); 

exports.authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      const userId = decodedToken.userId;
      const user = await models.User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


