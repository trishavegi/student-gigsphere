const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },
    profilePic:{
  type:String,
  default:"https://i.pravatar.cc/150"
},

    role:{
        type:String,
        enum:["customer","provider","admin"],
        default:"customer"
    },
    isVerified: {
  type: Boolean,
  default: false,
},

    verificationStatus: {
  type: String,
  enum: ["pending", "approved", "rejected"],
  default: "pending",
},

    college:{
        type:String
    },

    department:{
        type:String
    },

    skills:[String]

},
{
    timestamps:true
}
);

module.exports = mongoose.model("User", userSchema);