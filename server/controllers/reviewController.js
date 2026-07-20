const Review = require("../models/Review");
const Notification = require("../models/Notification");


// Add Review
const addReview = async (req,res)=>{

try{

    const review = await Review.create({

        userId:req.user,

        providerId:req.body.providerId,

        rating:req.body.rating,

        comment:req.body.comment

    });
    await Notification.create({

  user: req.body.provider,

  message: "You received a new review."

});

    res.status(201).json(review);

}
catch(error){

    res.status(500).json({
        message:error.message
    });

}

};


// Get Provider Reviews
const getProviderReviews = async(req,res)=>{

try{

    const reviews = await Review.find({
        providerId:req.params.id
    })
    .populate("userId","name");

    res.status(200).json(reviews);

}
catch(error){

    res.status(500).json({
        message:error.message
    });

}

};


module.exports={
    addReview,
    getProviderReviews
};