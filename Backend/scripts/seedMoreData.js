const bcrypt = require('bcryptjs');
const { User, Store, Rating, sequelize } = require('../models');
require('dotenv').config();

const seedMoreData = async () => {
  try {
    await sequelize.authenticate();
    console.log('🌱 Adding more dummy data...');

    // Create additional users
    const users = [
      {
        name: 'Jennifer Martinez Customer Profile',
        email: 'jennifer@customer.com',
        password: await bcrypt.hash('User@101', 10),
        address: '987 Customer Plaza, Shopping District, Nevada',
        role: 'user'
      },
      {
        name: 'Robert Taylor Shopping Account',
        email: 'robert@shopper.com',
        password: await bcrypt.hash('User@202', 10),
        address: '456 Shopper Street, Retail Zone, Arizona',
        role: 'user'
      },
      {
        name: 'Lisa Anderson Store Owner Business',
        email: 'lisa@businessowner.com',
        password: await bcrypt.hash('Owner@789', 10),
        address: '789 Business Avenue, Commercial District, Oregon',
        role: 'store_owner'
      },
      {
        name: 'Mark Thompson Regular Customer',
        email: 'mark@regularbuyer.com',
        password: await bcrypt.hash('User@303', 10),
        address: '321 Regular Road, Suburban Area, Washington',
        role: 'user'
      },
      {
        name: 'Amanda White Premium Customer',
        email: 'amanda@premiumuser.com',
        password: await bcrypt.hash('User@404', 10),
        address: '654 Premium Boulevard, Upscale District, Colorado',
        role: 'user'
      }
    ];

    const createdUsers = [];
    for (const userData of users) {
      const user = await User.create(userData);
      createdUsers.push(user);
    }

    // Get existing store owner for new stores
    const existingOwner = await User.findOne({ where: { email: 'john@storeowner.com' } });
    const newOwner = createdUsers.find(u => u.role === 'store_owner');

    // Create additional stores
    const stores = [
      {
        name: 'SportZone Athletic Equipment Store',
        email: 'contact@sportzone.com',
        address: '500 Athletic Avenue, Sports Complex, Denver',
        ownerId: existingOwner.id
      },
      {
        name: 'HomeDecor Interior Design Store',
        email: 'info@homedecor.com',
        address: '600 Design Street, Creative Quarter, Portland',
        ownerId: newOwner.id
      },
      {
        name: 'PetPalace Animal Supplies Store',
        email: 'hello@petpalace.com',
        address: '700 Pet Lane, Animal District, Seattle',
        ownerId: existingOwner.id
      },
      {
        name: 'TechGadgets Electronics Superstore',
        email: 'support@techgadgets.com',
        address: '800 Gadget Boulevard, Innovation Hub, Austin',
        ownerId: newOwner.id
      },
      {
        name: 'ArtCraft Creative Supplies Store',
        email: 'art@artcraft.com',
        address: '900 Creative Circle, Arts District, Phoenix',
        ownerId: existingOwner.id
      }
    ];

    const createdStores = [];
    for (const storeData of stores) {
      const store = await Store.create(storeData);
      createdStores.push(store);
    }

    // Get existing users for ratings
    const allUsers = await User.findAll({ where: { role: 'user' } });
    
    // Create diverse ratings for new stores
    const ratings = [
      // SportZone ratings
      { userId: allUsers[0].id, storeId: createdStores[0].id, rating: 5 },
      { userId: allUsers[1].id, storeId: createdStores[0].id, rating: 4 },
      { userId: allUsers[2].id, storeId: createdStores[0].id, rating: 5 },
      { userId: createdUsers[0].id, storeId: createdStores[0].id, rating: 4 },
      
      // HomeDecor ratings
      { userId: allUsers[0].id, storeId: createdStores[1].id, rating: 3 },
      { userId: createdUsers[1].id, storeId: createdStores[1].id, rating: 4 },
      { userId: createdUsers[3].id, storeId: createdStores[1].id, rating: 5 },
      
      // PetPalace ratings
      { userId: allUsers[1].id, storeId: createdStores[2].id, rating: 5 },
      { userId: createdUsers[0].id, storeId: createdStores[2].id, rating: 5 },
      { userId: createdUsers[4].id, storeId: createdStores[2].id, rating: 4 },
      
      // TechGadgets ratings
      { userId: allUsers[2].id, storeId: createdStores[3].id, rating: 2 },
      { userId: createdUsers[1].id, storeId: createdStores[3].id, rating: 3 },
      { userId: createdUsers[3].id, storeId: createdStores[3].id, rating: 4 },
      
      // ArtCraft ratings
      { userId: createdUsers[0].id, storeId: createdStores[4].id, rating: 5 },
      { userId: createdUsers[4].id, storeId: createdStores[4].id, rating: 4 },
      
      // Additional ratings for existing stores
      { userId: createdUsers[1].id, storeId: 1, rating: 4 },
      { userId: createdUsers[3].id, storeId: 2, rating: 3 },
      { userId: createdUsers[4].id, storeId: 3, rating: 5 },
      { userId: createdUsers[0].id, storeId: 4, rating: 2 }
    ];

    for (const ratingData of ratings) {
      await Rating.create(ratingData);
    }

    console.log('✅ Additional dummy data added successfully!');
    console.log('\n📋 New Test Accounts:');
    console.log('Jennifer: jennifer@customer.com / User@101');
    console.log('Robert: robert@shopper.com / User@202');
    console.log('Lisa (Store Owner): lisa@businessowner.com / Owner@789');
    console.log('Mark: mark@regularbuyer.com / User@303');
    console.log('Amanda: amanda@premiumuser.com / User@404');
    
    console.log('\n🏪 New Stores Added:');
    console.log('- SportZone Athletic Equipment Store');
    console.log('- HomeDecor Interior Design Store');
    console.log('- PetPalace Animal Supplies Store');
    console.log('- TechGadgets Electronics Superstore');
    console.log('- ArtCraft Creative Supplies Store');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding more data:', error);
    process.exit(1);
  }
};

seedMoreData();