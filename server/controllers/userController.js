const User = require("../models/User");
const Service = require("../models/Service");

const getProviderProfile = async (req, res) => {

    try {

        const provider = await User.findById(req.params.id)
            .select("-password");

        if (!provider) {

            return res.status(404).json({
                message: "Provider not found"
            });

        }

        const services = await Service.find({
            user: req.params.id
        });

        res.status(200).json({

            ...provider.toObject(),

            services

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getProviderProfile
};