const express = require("express");

const router = express.Router();

const {
    getProviderProfile
} = require("../controllers/userController");

router.get(
    "/provider/:id",
    getProviderProfile
);

module.exports = router;