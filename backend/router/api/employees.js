// routes/api/employees.js
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Employee = require('../../models/Employee');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    },
});

// File type validation
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

// @route   POST api/employees
// @desc    Create an employee
// @access  Private
router.post(
    '/',
    [
        auth,
        upload.single('f_Image'),
        [
            check('f_Name', 'Name is required').not().isEmpty(),
            check('f_Email', 'Please include a valid email').isEmail(),
            check('f_Mobile', 'Mobile number is required').not().isEmpty(),
            check('f_Designation', 'Designation is required').not().isEmpty(),
            check('f_gender', 'Gender is required').not().isEmpty(),
            check('f_Course', 'At least one course is required').isArray({ min: 1 }),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        // Validation Errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_gender,
            f_Course,
        } = req.body;

        try {
            // Check if email exists
            let employee = await Employee.findOne({ f_Email });
            if (employee) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Email already exists' }] });
            }

            // Get last f_Id
            const lastEmployee = await Employee.findOne().sort({ f_Id: -1 });
            const f_Id = lastEmployee ? lastEmployee.f_Id + 1 : 1;

            const newEmployee = new Employee({
                f_Id,
                f_Image: req.file ? req.file.filename : '',
                f_Name,
                f_Email,
                f_Mobile,
                f_Designation,
                f_gender,
                f_Course: Array.isArray(f_Course) ? f_Course : [f_Course],
            });

            await newEmployee.save();
            res.json(newEmployee);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   GET api/employees
// @desc    Get all employees
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const { search } = req.query;
        let employees;
        if (search) {
            employees = await Employee.find({
                f_Name: { $regex: search, $options: 'i' },
            });
        } else {
            employees = await Employee.find();
        }
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/employees/:id
// @desc    Get employee by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const employee = await Employee.findOne({ f_Id: req.params.id });
        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }
        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/employees/:id
// @desc    Update an employee
// @access  Private
router.put(
    '/:id',
    [
        auth,
        upload.single('f_Image'),
        [
            check('f_Name', 'Name is required').not().isEmpty(),
            check('f_Email', 'Please include a valid email').isEmail(),
            check('f_Mobile', 'Mobile number is required').not().isEmpty(),
            check('f_Designation', 'Designation is required').not().isEmpty(),
            check('f_gender', 'Gender is required').not().isEmpty(),
            check('f_Course', 'At least one course is required').isArray({ min: 1 }),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        // Validation Errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_gender,
            f_Course,
        } = req.body;

        try {
            let employee = await Employee.findOne({ f_Id: req.params.id });

            if (!employee) {
                return res.status(404).json({ msg: 'Employee not found' });
            }

            // Check for email duplication
            if (employee.f_Email !== f_Email) {
                const emailExists = await Employee.findOne({ f_Email });
                if (emailExists) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'Email already exists' }] });
                }
            }

            employee.f_Name = f_Name;
            employee.f_Email = f_Email;
            employee.f_Mobile = f_Mobile;
            employee.f_Designation = f_Designation;
            employee.f_gender = f_gender;
            employee.f_Course = Array.isArray(f_Course) ? f_Course : [f_Course];

            if (req.file) {
                employee.f_Image = req.file.filename;
            }

            await employee.save();
            res.json(employee);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   DELETE api/employees/:id
// @desc    Delete an employee
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const employee = await Employee.findOne({ f_Id: req.params.id });

        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }

        await Employee.deleteOne({ f_Id: req.params.id });

        res.json({ msg: 'Employee removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
