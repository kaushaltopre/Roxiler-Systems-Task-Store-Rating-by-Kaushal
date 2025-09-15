const bcrypt = require('bcryptjs');
const { User, Store, Rating, sequelize } = require('../models');
require('dotenv').config();

const seedData = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // This will drop and recreate tables

    console.log('🌱 Starting data seeding...');

    // Create Admin User
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const admin = await User.create({
      name: 'System Administrator Account',
      email: 'admin@system.com',
      password: adminPassword,
      address: 'System Administration Office, Tech City',
      role: 'admin'
    });

    // Create Store Owners
    const storeOwner1Password = await bcrypt.hash('Owner@123', 10);
    const storeOwner1 = await User.create({
      name: 'John Smith Store Owner Account',
      email: 'john@storeowner.com',
      password: storeOwner1Password,
      address: '123 Business Street, Commerce District, New York',
      role: 'store_owner'
    });

    const storeOwner2Password = await bcrypt.hash('Owner@456', 10);
    const storeOwner2 = await User.create({
      name: 'Sarah Johnson Store Owner Profile',
      email: 'sarah@retailbusiness.com',
      password: storeOwner2Password,
      address: '456 Retail Avenue, Shopping Center, California',
      role: 'store_owner'
    });

    // Create Normal Users
    const user1Password = await bcrypt.hash('User@123', 10);
    const user1 = await User.create({
      name: 'Michael Davis Customer Account',
      email: 'michael@customer.com',
      password: user1Password,
      address: '789 Customer Lane, Residential Area, Texas',
      role: 'user'
    });

    const user2Password = await bcrypt.hash('User@456', 10);
    const user2 = await User.create({
      name: 'Emily Wilson Shopping Account',
      email: 'emily@shopper.com',
      password: user2Password,
      address: '321 Shopper Boulevard, Suburb District, Florida',
      role: 'user'
    });

    const user3Password = await bcrypt.hash('User@789', 10);
    const user3 = await User.create({
      name: 'David Brown Regular Customer',
      email: 'david@regularuser.com',
      password: user3Password,
      address: '654 Regular Street, Downtown Area, Illinois',
      role: 'user'
    });

    // Create Stores
    const store1 = await Store.create({
      name: 'TechMart Electronics Store',
      email: 'contact@techmart.com',
      address: '100 Technology Boulevard, Electronics District, Silicon Valley',
      ownerId: storeOwner1.id
    });

    const store2 = await Store.create({
      name: 'Fashion Hub Clothing Store',
      email: 'info@fashionhub.com',
      address: '200 Fashion Avenue, Style Center, New York',
      ownerId: storeOwner2.id
    });

    const store3 = await Store.create({
      name: 'Green Grocery Fresh Market',
      email: 'hello@greengrocery.com',
      address: '300 Fresh Market Street, Organic District, California',
      ownerId: storeOwner1.id
    });

    const store4 = await Store.create({
      name: 'BookWorm Literature Store',
      email: 'books@bookworm.com',
      address: '400 Literature Lane, Knowledge Quarter, Massachusetts',
      ownerId: storeOwner2.id
    });

    // Create Ratings
    await Rating.create({
      userId: user1.id,
      storeId: store1.id,
      rating: 5
    });

    await Rating.create({
      userId: user2.id,
      storeId: store1.id,
      rating: 4
    });

    await Rating.create({
      userId: user3.id,
      storeId: store1.id,
      rating: 5
    });

    await Rating.create({
      userId: user1.id,
      storeId: store2.id,
      rating: 3
    });

    await Rating.create({
      userId: user2.id,
      storeId: store2.id,
      rating: 4
    });

    await Rating.create({
      userId: user3.id,
      storeId: store3.id,
      rating: 5
    });

    await Rating.create({
      userId: user1.id,
      storeId: store3.id,
      rating: 4
    });

    await Rating.create({
      userId: user2.id,
      storeId: store4.id,
      rating: 2
    });

    await Rating.create({
      userId: user3.id,
      storeId: store4.id,
      rating: 3
    });

    console.log('✅ Dummy data seeded successfully!');
    console.log('\n📋 Test Accounts:');
    console.log('Admin: admin@system.com / Admin@123');
    console.log('Store Owner 1: john@storeowner.com / Owner@123');
    console.log('Store Owner 2: sarah@retailbusiness.com / Owner@456');
    console.log('User 1: michael@customer.com / User@123');
    console.log('User 2: emily@shopper.com / User@456');
    console.log('User 3: david@regularuser.com / User@789');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();