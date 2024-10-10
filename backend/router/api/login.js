// routes/api/login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Login = require('../../models/Login');

// @route   POST api/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/',
    [
        check('f_userName', 'Username is required').not().isEmpty(),
        check('f_Pwd', 'Password is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        // Validation Errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { f_userName, f_Pwd } = req.body;

        try {
            // Check if user exists
            let user = await Login.findOne({ f_userName });

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid login details' }] });
            }

            // Match password
            const isMatch = await bcrypt.compare(f_Pwd, user.f_Pwd);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid login details' }] });
            }

            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id,
                    f_userName: user.f_userName,
                },
            };

            jwt.sign(
                payload,
                'your_jwt_secret',
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, f_userName: user.f_userName });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
