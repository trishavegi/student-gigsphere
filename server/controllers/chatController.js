const Chat = require("../models/Chat");

const sendMessage = async (req,res)=>{

try{

  const chat = await Chat.create({

    sender:req.user,

    receiver:req.body.receiver,

    message:req.body.message

  });

  res.status(201).json(chat);

}
catch(error){

  res.status(500).json({
    message:error.message
  });

}

};

const getMessages = async (req,res)=>{

try{

  const chats = await Chat.find({

    $or:[
      {
        sender:req.user,
        receiver:req.params.id
      },
      {
        sender:req.params.id,
        receiver:req.user
      }
    ]

  });

  res.status(200).json(chats);

}
catch(error){

  res.status(500).json({
    message:error.message
  });

}

};
const getRecentChats = async (req, res) => {

  try {

    const chats = await Chat.find({
      $or: [
        { sender: req.user },
        { receiver: req.user }
      ]
    })
    .populate("sender", "name")
    .populate("receiver", "name")
    .sort({ createdAt: -1 });

    res.status(200).json(chats);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
const getUnreadCount = async (req,res)=>{

try{

  const count = await Chat.countDocuments({

    receiver:req.user,

    isRead:false

  });

  res.status(200).json({
    count
  });

}
catch(error){

  res.status(500).json({
    message:error.message
  });

}

};
const markMessagesRead = async(req,res)=>{

try{

await Chat.updateMany(

{
sender:req.params.id,
receiver:req.user,
isRead:false
},

{
isRead:true
}

);

res.status(200).json({
message:"Messages marked read"
});

}
catch(error){

res.status(500).json({
message:error.message
});

}

};

module.exports={
  sendMessage,
  getMessages,
   getRecentChats,
   getUnreadCount,
markMessagesRead
};