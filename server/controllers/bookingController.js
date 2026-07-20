const User = require("../models/User");
const Booking = require("../models/Booking");
const Service = require("../models/Service");
const Notification = require(
"../models/Notification"
);


const createBooking = async (req,res)=>{

    try{

        const service = await Service.findById(req.body.serviceId);

        if(!service){
            return res.status(404).json({
                message:"Service not found"
            });
        }

        const booking = await Booking.create({
            customer:req.user,
            provider:service.user,
            service:service._id
        });
        const notification = await Notification.create({
  user: service.user,
  message: "You received a new booking request."
});

console.log("Notification created:", notification);
console.log(
  "Notification created for:",
  service.user
);

        res.status(201).json({
            message:"Booking Request Sent",
            booking
        });

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};
const getMyBookings = async (req, res) => {

  try {

    const bookings = await Booking.find({
      customer: req.user
    })
    .populate("service")
    .populate("provider", "name email");

    res.status(200).json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
const getProviderBookings = async (req, res) => {

  try {

    const bookings = await Booking.find({
      provider: req.user
    })
      .populate("customer", "name email")
      .populate("service", "title price");

    res.status(200).json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
const updateBookingStatus = async (req, res) => {

  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    booking.status = req.body.status;

    await booking.save();
    await Notification.create({

  user: booking.customer,

  message:
    req.body.status === "accepted"
      ? "Your booking has been accepted."
      : "Your booking has been rejected."

});

    res.status(200).json({
      message: "Booking status updated",
      booking
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
const cancelBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {

            return res.status(404).json({
                message: "Booking not found"
            });

        }

        booking.status = "cancelled";

        await booking.save();

        res.json({
            message: "Booking Cancelled Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
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

module.exports = {
    createBooking,
    getMyBookings,
    getProviderBookings,
    updateBookingStatus,
    cancelBooking,
     getAllBookings
};