var express = require('express');
var router = express.Router();
var models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authUser } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');



var cors = require('cors');
router.use(cors());
router.use(express.urlencoded({ extended: true }));


router.post('/register', async function (req, res, next) {
  try {
    const existinguserInfo = await models.userInfo.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (existinguserInfo) {
      return res.json({ error: 'User already registered' });
    } else {
      const defaultValues = {
        status: 'Active',
        isDeleted: false,
      };

      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = { ...defaultValues, ...req.body, password: hashedPassword };
      await models.userInfo.create(newUser);
      return res.status(200).json({ success: 'Registered Successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server ..... Error' });
  }
});


const secretKey = 'qwertyuiop';
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      phoneNumber: user.phoneNumber
    },
    secretKey,
    { expiresIn: '1h' }
  );
}
const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await models.userInfo.findOne({ where: { email } });

      if (!user) {
          return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

     
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
          return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const token = generateToken(user);
      
      return res.json({ success: true, message: 'Logged in successfully', token:token });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
  }
});



// GET USER-DETAILS
router.get('/user-details', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized.........' });
  }

  const decoded = decodeToken(token);

  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const userId = decoded.id;
  const user = await models.userInfo.findByPk(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const userDetails = {
    id: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    phoneNumber: user.phoneNumber,
    image: user.image,
    socialSecurity: user.socialSecurity,
    addressOne: user.addressOne,
    addressTwo: user.addressTwo,
    city: user.city,
    state: user.state,
    ZipCode: user.ZipCode,
    dob: user.dob,
    gender: user.gender,
    martialStatus: user.martialStatus,
    social: user.social,
    kids: user.kids,
  };

  res.json(userDetails);
});


// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

const upload = multer({ storage: storage });



// update user profile
router.put('/update-profile', upload.single('image'), async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized...' });
    }

    const decoded = decodeToken(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const userId = decoded.id;
    const user = await models.userInfo.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log("zipcode", req.body.ZipCode);
    console.log("fiiillleee", req.body.socialSecurity);



    // Update user profile fields
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.email = req.body.email || user.email;
    user.socialSecurity = req.body.socialSecurity || user.socialSecurity;
    user.addressOne = req.body.addressOne || user.addressOne;
    user.addressTwo = req.body.addressTwo || user.addressTwo;
    user.city = req.body.city || user.city;
    user.state = req.body.state || user.state;
    user.ZipCode = req.body.ZipCode;
    user.dob = req.body.dob || user.dob;
    user.gender = req.body.gender || user.gender;
    user.martialStatus = req.body.martialStatus || user.martialStatus;
    user.social = req.body.social || user.kids;
    user.kids = req.body.kids || user.kids;

    // Check if a file is uploaded
    if (req.file) {
      // Remove "public" from the file path
      const filePathWithoutPublic = path.relative('public', req.file.path).replace(/^(\.\.[\/\\])+/, '');
      user.image = filePathWithoutPublic; // Save the modified file path to the user profileImage field
      // console.log("filePathWithoutPublic",filePathWithoutPublic)
    }

    // Save the updated user profile
    await user.save();

    res.json({ success: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.post('/change-password', async (req, res) => {
  const { oldPassword, newPassword } = req.body;



  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    console.log("............. ", token)

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = decodeToken(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.log("decode", token)
    const userId = decoded.id;
    const user = await models.userInfo.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log("oldPassword:", oldPassword);
    
    if (oldPassword === user.password) {
      user.password = newPassword;
    } else {

      return res.status(401).json({ error: 'Incorrect Old Password' });

    }   
    await user.save();

    res.json({ success: 'Password changed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




router.post('/preferences', async function (req, res) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized...' });
    }

    const decoded = decodeToken(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const userId = decoded.id;
    const newUser = { userId, ...req.body };
    const user = await models.userpreferences.findByPk(userId);
    console.log("user...............", user)
    if (!user) {
      await models.userpreferences.create(newUser);

    } else {
      user.userId = userId || user.userId;
      user.languages = req.body.languages || user.languages;
      user.breakfast = req.body.breakfast || user.breakfast;
      user.lunch = req.body.lunch || user.lunch;
      user.dinner = req.body.dinner || user.dinner;
      user.waketime = req.body.waketime || user.waketime;
      user.bedtime = req.body.bedtime || user.bedtime;
      user.height = req.body.height || user.height;
      user.weight = req.body.weight || user.weight;
      user.bloodGlucose = req.body.bloodGlucose || user.bloodGlucose;
      user.bloodPressure = req.body.bloodPressure;
      user.Cholestrol = req.body.Cholestrol || user.Cholestrol;
      user.distance = req.body.distance || user.distance;
      user.communication = req.body.communication || user.communication;

      await user.save();
    }
   


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server' });
  }
});



router.get('/get-preferences', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const decoded = decodeToken(token);

  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const userId = decoded.id;
  const user = await models.userpreferences.findByPk(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const userDetails = {
    userId: user.userId,
    languages: user.languages,
    breakfast: user.breakfast,
    lunch: user.lunch,
    dinner: user.dinner,
    waketime: user.waketime,
    bedtime: user.bedtime,
    height: user.height,
    weight: user.weight,
    bloodGlucose: user.bloodGlucose,
    bloodPressure: user.bloodPressure,
    distance: user.distance,
    communication: user.communication,

  };

  res.json(userDetails);
});
// CREATE WAVE
router.post('/wave', upload.single('image'), async function (req, res) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized...' });
    }

    const decoded = decodeToken(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.log(decoded)

    const userId = decoded.id;
    const name = decoded.firstname;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const filePathWithoutPublic = path.relative('public', req.file.path).replace(/^(\.\.[\/\\])+/, '');
    const newUser = { name, userId, ...req.body, image: filePathWithoutPublic };

    const user = await models.createWave.findByPk(userId);

    await models.createWave.create(newUser);
    res.status(201).json({ message: 'Wave created successfully!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


-

  // GET -wave
  router.get('/get-wave', async (req, res) => {

    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized.........' });
    }

    const decoded = decodeToken(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const userId = decoded.id;
    // console.log("........", userId)
    const users = await models.createWave.findAll({ where: { userId } });
    // console.log("user",users)

    if (!users) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userDetailsArray = users.map(user => ({
      name: user.name,
      userId: user.userId,
      message: user.message,
      image: user.image,
    }));

    console.log("userDetails", userDetailsArray);

    res.json(userDetailsArray);
  });

// GET all-wave
router.get('/get-allwave', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized.........' });
  }

  const decoded = decodeToken(token);

  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' });
  }


  const users = await models.createWave.findAll();

  

  if (!users || users.length === 0) {
    return res.status(404).json({ error: 'No users found' });
  }

  const userDetailsArray = users.map(user => ({
    name: user.name,
    userId: user.userId,
    message: user.message,
    image: user.image,
  }));

 

  res.json(userDetailsArray);
});










module.exports = router;
