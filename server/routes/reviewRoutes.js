const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addReview,
    getProviderReviews
} = require("../controllers/reviewController");


router.post("/",protect,addReview);

router.get("/:id",getProviderReviews);


module.exports = router;