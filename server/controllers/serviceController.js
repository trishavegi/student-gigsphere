const Service = require("../models/Service");
const axios = require("axios");

// ✅ POST SERVICE
const createService = async (req, res) => {

  try {

    const {
      title,
      description,
      price,
      category,
      location,
      skills,
  duration
    
    } = req.body;
const geoResponse = await axios.get(
  "https://nominatim.openstreetmap.org/search",
  {
    params: {
      q: location,
      format: "json",
      limit: 1
    },
    headers: {
      "User-Agent": "GigSphere"
    }
  }
);

let latitude = null;
let longitude = null;

if (geoResponse.data.length > 0) {
  latitude = Number(geoResponse.data[0].lat);
  longitude = Number(geoResponse.data[0].lon);
}
    const service = await Service.create({
  title,
  description,
  price,
  category,
  location,
  latitude,
  longitude,
  skills,
  duration,
  user: req.user
});

    res.status(201).json(service);

  } catch (error) {

  console.log(error);

  res.status(500).json({
    message: error.message
  });

}

};
// ✅ GET ALL SERVICES
const getAllServices = async (req, res) => {
  try {

    const services = await Service.find()
      .populate("user", "name email");

    res.status(200).json(services);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
// ✅ SEARCH SERVICES
const searchServices = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const services = await Service.find({
      title: {
        $regex: keyword,
        $options: "i",
      },
    }).populate("user", "name email");

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ GET SINGLE SERVICE
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate("user", "name email");

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getMyServices = async (req, res) => {

  try {

    const services = await Service.find({
      user: req.user
    });

    res.status(200).json(services);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
const deleteService = async (req, res) => {

  try {

    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Service deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
const updateService = async (req, res) => {

  try {

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found"
      });
    }

    service.title = req.body.title || service.title;
    service.description =
      req.body.description || service.description;
    service.price = req.body.price || service.price;
    service.category = req.body.category || service.category;
    service.location =
  req.body.location || service.location;

service.latitude =
  req.body.latitude || service.latitude;

service.longitude =
  req.body.longitude || service.longitude;

    const updatedService = await service.save();

    res.status(200).json(updatedService);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

  

module.exports = {
  createService,
  getAllServices,
  searchServices,
  getServiceById,
  getMyServices,
  deleteService,
  updateService
};