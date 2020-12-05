const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Univ = require('../models/Univ');


//tested
router.post('/',
    check(
        'univId',
        'Please enter a 10 digit registration number!'
    ).isLength({ min: 10, max: 10 }),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { univId } = req.body;

            const ifExists = await Univ.findOne({ univId: univId });
            if(ifExists){
                return res.status(400).json({ errors: [{ msg: 'There is already a registration with that number or an unexpected error occurred!' }] });
            }

            const newUnivId = new Univ({
                univId
            });
            await newUnivId.save();

            return res.json(newUnivId);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ errors: [{ msg: 'There is already a registration with that number or an unexpected error occurred!' }] });
        }
    }
);

router.get('/', async (req, res) => {
  try {
    const univ = await Univ.find();
    res.json(univ);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;