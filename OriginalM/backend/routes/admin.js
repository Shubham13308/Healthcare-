var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');


const secretKey = 'shubham123';

router.post('/adminregister', async (req, res) => {
  try {
    const existingUser = await models.Admin.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.json({ error: 'User already registered' });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = {
        email: req.body.email,
        password: hashedPassword,
        fullName: req.body.fullName,
      };
      await models.Admin.create(newUser);
      return res.status(200).json({ success: 'Registered Successfully' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      fullName: user.fullName, 
    },
    secretKey,
    { expiresIn: '1h' }
  );
}


router.post('/adminlogin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await models.Admin.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    return res.json({ success: true, message: 'Logged in successfully', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});
router.get('/userinfo', async (req, res) => {
  try {
  
    const allUsers = await models.userInfo.findAll();

    
    const activeUsers = allUsers.filter(user => user.status === 'Active');
    const inactiveUsers = allUsers.filter(user => user.status === 'inactive');

    
    res.status(200).json({
      activeUsers: activeUsers.length,
      inactiveUsers: inactiveUsers.length,
      totalUsers: allUsers.length,
      
    });
  } catch (error) {
    console.error(error);
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/total-messages', async (req, res) => {
  try {
    
    const totalCount = await models.createWave.count();

    // Send the total count as a response
    res.status(200).json({ totalMessages: totalCount });
  } catch (error) {
    console.error(error);
    // If there's an error, send an error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/user-info', async (req, res) => {
  try {
      const users = await models.userInfo.findAll({ attributes: ['id', 'firstname', 'email', 'phoneNumber', 'status'] });
      
      // Send the formatted data as a response
      res.status(200).json(users);
  } catch (error) {
      console.error(error);
      // If there's an error, send an error response
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/wave-info', async (req, res) => {
  try {
    const waves = await models.createWave.findAll({ attributes: ['name', 'message', 'createdAt'] });

    const formattedWaves = waves.map(wave => ({
      ...wave.dataValues
    }));

    // Send the formatted data as a response
    res.status(200).json(formattedWaves);
  } catch (error) {
    console.error(error);
    // If there's an error, send an error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/user-info/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await models.userInfo.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Extract specific fields needed for detailed view
    const userDetails = {
      id: user.id, // Adding the id here
      firstname: user.firstname,
      email: user.email,
      ZipCode: user.ZipCode,
      dob: user.dob,
      kids: user.kids,
      city: user.city,
      addressOne: user.addressOne,
      state: user.state
    };

    // Send the user details as a response
    res.status(200).json(userDetails);
  } catch (error) {
    console.error(error);
    // If there's an error, send an error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.put('/admin/user-info/:userId', async (req, res) => {
  try {
      const { userId } = req.params;
      const updatedUserInfo = req.body;

      // Find the user by ID and update the information
      const user = await models.userInfo.findByPk(userId);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Update the user information
      await user.update(updatedUserInfo);

      // Send the updated user information as a response
      res.status(200).json(user);
  } catch (error) {
      console.error(error);
      // If there's an error, send an error response
      res.status(500).json({ error: 'Internal Server Error' });
  }
});





module.exports = router;


