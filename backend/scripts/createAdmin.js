// scripts/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Login = require('../models/Login');

const createAdmin = async () => {
    await mongoose.connect('mongodb://localhost:27017/employeeDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = new Login({
        f_sno: 1,
        f_userName: 'admin',
        f_Pwd: hashedPassword,
    });

    await adminUser.save();
    console.log('Admin user created');
    mongoose.disconnect();
};

createAdmin();
