// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME || 'rating_system',
//   process.env.DB_USER || 'postgres',
//   process.env.DB_PASSWORD || 'postgres',
//   {
//     host: process.env.DB_HOST || 'localhost',
//     port: process.env.DB_PORT || 5432,
//     dialect: 'postgres',
//   }
// );

// // ✅ Test the connection
// sequelize.authenticate()
//   .then(() => console.log('✅ PostgreSQL connection established via Sequelize.'))
//   .catch(err => console.error('❌ Unable to connect to DB:', err.message));

// module.exports = sequelize;
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'rating_system',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

// ✅ Test the connection
sequelize.authenticate()
  .then(() => console.log('✅ PostgreSQL connection established via Sequelize.'))
  .catch(err => console.error('❌ Unable to connect to DB:', err.message));

module.exports = sequelize;
