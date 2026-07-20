const Favorite = require("../models/Favorite");

const toggleFavorite = async (req, res) => {

  try {

    const { serviceId } = req.body;

    const existing = await Favorite.findOne({
      user: req.user,
      service: serviceId
    });

    if (existing) {

      await Favorite.findByIdAndDelete(existing._id);

      return res.json({
        message: "Removed from favorites"
      });

    }

    await Favorite.create({
      user: req.user,
      service: serviceId
    });

    res.json({
      message: "Added to favorites"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getFavorites = async (req, res) => {

  try {

    const favorites = await Favorite.find({
      user: req.user
    }).populate("service");

    res.json(favorites);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  toggleFavorite,
  getFavorites
};