module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: [20, 60]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(400),
      validate: {
        len: [0, 400]
      }
    },
    role: {
      type: DataTypes.ENUM('admin', 'user', 'store_owner'),
      defaultValue: 'user'
    }
  });

  User.associate = models => {
    User.hasMany(models.Rating, { foreignKey: 'userId' });
    User.hasMany(models.Store, { foreignKey: 'ownerId' });
  };

  return User;
};