const bcrypt = require('bcryptjs');
const { User, sequelize } = require('../models');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const adminExists = await User.findOne({ where: { role: 'admin' } });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      
      await User.create({
        name: 'System Administrator Account',
        email: 'admin@system.com',
        password: hashedPassword,
        address: 'System Administration Office',
        role: 'admin'
      });

      console.log('Admin user created successfully');
      console.log('Email: admin@system.com');
      console.log('Password: Admin@123');
    } else {
      console.log('Admin user already exists');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();