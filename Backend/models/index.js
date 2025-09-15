const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const User = require('./user')(sequelize, DataTypes);
const Store = require('./store')(sequelize, DataTypes);
const Rating = require('./rating')(sequelize, DataTypes);

// Define associations
User.hasMany(Rating, { foreignKey: 'userId' });
User.hasMany(Store, { foreignKey: 'ownerId' });
Store.hasMany(Rating, { foreignKey: 'storeId' });
Store.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
Rating.belongsTo(User, { foreignKey: 'userId' });
Rating.belongsTo(Store, { foreignKey: 'storeId' });

module.exports = { sequelize, User, Store, Rating };