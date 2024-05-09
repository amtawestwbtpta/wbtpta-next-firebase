import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // name: String,  //Removed For Firebase
    //Photo ID and Photo Name Added
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    // sl: Number,  //Removed For Firebase
    teachersID: String, //Added For Firebase
    id: String, //Added For Firebase
    tname: String,
    tsname: String,
    school: String,
    udise: Number,
    desig: String,
    sis: String,
    circle: String,
    empid: String,
    pan: String,
    teacher: String,
    photoName: String,
    url: String,
    // aadhaar: Number,  //Removed For Firebase
    loggedin: String,
    dpscst: String,
    dpsc: String,
    dpsc1: String,
    dpsc2: String,
    dpsc3: String,
    dpsc4: String,
    tan: String,
    question: String,
    password: {
      type: String,
      select: true,
    },
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.userteacher ||
  mongoose.model("userteacher", userSchema, "userteacher");

export default User;
