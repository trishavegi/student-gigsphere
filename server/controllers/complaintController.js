const Complaint = require("../models/Complaint");

// Customer creates complaint
const createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create({
      user: req.user,
      service: req.body.serviceId,
      reason: req.body.reason,
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin gets all complaints
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email")
.populate("service", "title user");
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin resolves complaint
const resolveComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    complaint.status = "resolved";

    await complaint.save();

    res.json({
      message: "Complaint resolved successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createComplaint,
  getAllComplaints,
  resolveComplaint,
};