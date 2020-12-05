const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const User = require('../models/User');
const Univ = require('../models/Univ');

const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: process.env.NAME_CLOUDINARY, 
    api_key: process.env.API_KEY_CLOUDINARY, 
    api_secret: process.env.API_SECRET_CLOUDINARY
  });
// @route    POST api/users
// @desc     Register user
// @access   Public
// tested
router.post('/',
    [
        check('name', 'A Name is required!').not().isEmpty(),
        check('email', 'Please enter a valid email!').isEmail(),
        check(
          'password',
          'Please enter a password of minimum 8 characters!'
        ).isLength({ min: 8 }),
        check(
            'univId',
            'Please enter a 10 digit registration number!'
          ).isLength({ min: 10, max: 10 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { name, email, password, univId } = req.body;

            const fileStr = req.body.previewSource;

            const uploadResponse = await cloudinary.uploader.upload(fileStr);

            let user = await User.findOne({ email });

            // const degree = await Univ.findOne({univId: univId});

            if (user) {
                return res.status(400).json({ errors: [{msg: 'A user has already been registered with this email'}] });
            }

            // if (!degree) {
            //     return res.status(400).json({ errors: [{msg: 'There is no registered degree with this number'}] });
            // }


            user = new User({
                name,
                email,
                univId,
                password,
                avatar: uploadResponse.secure_url
            });

            const salt = await bcrypt.genSalt(15);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: '1hr' },
                (err, token) => {
                  if (err) throw err;
                  res.json({ token });
                }
            );

        } catch (err) {
            return res.status(400).json({ errors: [{msg: 'Unexpected error, maybe a user is already registered with this registration!'}] });
        }
    }
);


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;