const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Notification = require("../models/Notification");

// Register User
const registerUser = async (req, res) => {
    try {

        console.log("Request Body:", req.body);

        const { name, email, password, role } = req.body;

console.log(req.body);

        console.log("Email received:", email);

        const existingUser = await User.findOne({ email });

        console.log("Existing User:", existingUser);

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // rest of code...

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        if (user.role === "provider") {

    await Notification.create({

        user: user._id,

        message: "Your provider account has been registered successfully."

    });

}

        res.status(201).json({
            message: "User Registered Successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Login User
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
    {
        id: user._id,
        role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
);

        res.status(200).json({
    message: "Login Successful",
    token,
    user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
});

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user)
            .select("-password");

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const changePassword = async (req, res) => {

    try {

        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user);

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: "Current Password is Incorrect"
            });

        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(
            newPassword,
            salt
        );

        await user.save();

        res.json({
            message: "Password Changed Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const updateProfile = async (req, res) => {
  try {
const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = req.body.name;
    user.email = req.body.email;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    changePassword,
    updateProfile
};