const { Store, Rating, User } = require('../models');
const { Op } = require('sequelize');

exports.getAllStores = async (req, res) => {
  try {
    const { name, address, sortBy = 'name', sortOrder = 'ASC' } = req.query;
    
    const where = {};
    if (name) where.name = { [Op.iLike]: `%${name}%` };
    if (address) where.address = { [Op.iLike]: `%${address}%` };

    const stores = await Store.findAll({
      where,
      order: [[sortBy, sortOrder]],
      include: [{
        model: Rating,
        where: { userId: req.user.id },
        required: false,
        attributes: ['rating']
      }],
      attributes: {
        include: [
          [require('sequelize').fn('AVG', require('sequelize').col('Ratings.rating')), 'averageRating'],
          [require('sequelize').fn('COUNT', require('sequelize').col('Ratings.id')), 'totalRatings']
        ]
      },
      group: ['Store.id', 'Ratings.id']
    });

    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStoreRatings = async (req, res) => {
  try {
    const store = await Store.findOne({
      where: { ownerId: req.user.id },
      include: [{
        model: Rating,
        include: [{
          model: User,
          attributes: ['name', 'email']
        }]
      }]
    });

    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const averageRating = await Rating.findOne({
      where: { storeId: store.id },
      attributes: [
        [require('sequelize').fn('AVG', require('sequelize').col('rating')), 'average']
      ]
    });

    res.json({
      store,
      averageRating: averageRating?.dataValues?.average || 0,
      ratings: store.Ratings
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};