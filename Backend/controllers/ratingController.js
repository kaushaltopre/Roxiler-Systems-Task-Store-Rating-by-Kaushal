const { Rating, Store } = require('../models');

exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const userId = req.user.id;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const existingRating = await Rating.findOne({
      where: { userId, storeId }
    });

    if (existingRating) {
      await existingRating.update({ rating });
      res.json({ message: 'Rating updated successfully' });
    } else {
      await Rating.create({ userId, storeId, rating });
      res.status(201).json({ message: 'Rating submitted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Store,
        attributes: ['name', 'address']
      }]
    });

    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};