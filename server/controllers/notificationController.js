const Notification = require("../models/Notification");

// Get Notifications
const getNotifications = async (req,res)=>{

try{

  console.log("req.user =", req.user);

  const notifications = await Notification.find({
    user:req.user
  }).sort({createdAt:-1});

  console.log("notifications =", notifications);

  res.status(200).json(notifications);

}
catch(error){

  res.status(500).json({
    message:error.message
  });

}

};

// Mark as Read
const markAsRead = async (req,res)=>{

try{

  const notification = await Notification.findById(
    req.params.id
  );

  if(!notification){
    return res.status(404).json({
      message:"Notification not found"
    });
  }

  notification.isRead = true;

  await notification.save();

  res.status(200).json(notification);

}
catch(error){

  res.status(500).json({
    message:error.message
  });

}

};

module.exports={
  getNotifications,
  markAsRead
};