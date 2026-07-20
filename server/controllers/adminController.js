const User = require("../models/User");
const Service = require("../models/Service");

const getDashboard = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const services = await Service.countDocuments();

    res.json({
      users,
      services,
      bookings: 0,
      reviews: 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
const deleteUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    await Service.findByIdAndDelete(req.params.id);

    res.json({
      message: "Service deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateServiceStatus = async (req, res) => {
  try {

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    service.status = req.body.status;

    await service.save();

    res.json({
      message: "Service updated successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const Booking = require("../models/Booking");

const getAllBookings = async (req, res) => {
  try {

    const bookings = await Booking.find()
  .populate("customer", "name email")
  .populate("provider", "name email")
  .populate("service", "title price");
    res.status(200).json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const updateBookingStatus = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = req.body.status;

    await booking.save();

    res.json({
      message: "Booking updated successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const getAnalytics = async (req, res) => {
  try {

    const users = await User.countDocuments();

    const services = await Service.countDocuments();

    const bookings = await Booking.countDocuments();

    const accepted = await Booking.countDocuments({
      status: "accepted",
    });

    const pending = await Booking.countDocuments({
      status: "pending",
    });

    const rejected = await Booking.countDocuments({
      status: "rejected",
    });

    const cancelled = await Booking.countDocuments({
      status: "cancelled",
    });

    res.json({
      users,
      services,
      bookings,
      accepted,
      pending,
      rejected,
      cancelled,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const getMonthlyAnalytics = async (req, res) => {
  try {

    const bookings = await Booking.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const getProviders = async (req, res) => {
  try {

    const providers = await User.find({
      role: "provider",
    }).select("-password");

    res.status(200).json(providers);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const approveProvider = async (req, res) => {

  try {

    const provider = await User.findById(req.params.id);

    if (!provider) {

      return res.status(404).json({
        message: "Provider not found",
      });

    }

    provider.verificationStatus = req.body.status;

    if (req.body.status === "approved") {

      provider.isVerified = true;

    } else {

      provider.isVerified = false;

    }

    await provider.save();

    res.json({
      message: "Provider Updated Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
const suspendProvider = async (req, res) => {

  try {

    const provider = await User.findById(req.params.id);

    if (!provider) {

      return res.status(404).json({
        message: "Provider not found",
      });

    }

    provider.verificationStatus = "suspended";
    provider.isVerified = false;

    await provider.save();

    res.json({
      message: "Provider Suspended Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



module.exports = {
  getDashboard,
  getAllUsers,
  deleteUser,
  deleteService,
   updateServiceStatus,
   getAllBookings,
   updateBookingStatus,
   getAnalytics,
    getMonthlyAnalytics,
    getProviders,
    approveProvider,
    suspendProvider,
};