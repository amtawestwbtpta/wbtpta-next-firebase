import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      teachersID,
      id,
      username,
      email,
      tname,
      school,
      udise,
      desig,
      gender,
      circle,
      empid,
      pan,
      loggedin,
      question,
      password,
      phone,
      url,
      photoName,
    }: any = reqBody;
    let userData = await User.findOne({ id: id });
    if (userData) {
      userData.tname = tname;
      userData.school = school;
      userData.desig = desig;
      userData.pan = pan;
      userData.udise = udise;
      userData.circle = circle;
      userData.empid = empid;
      userData.question = question;
      userData.email = email;
      userData.phone = phone;
      userData.url = url;
      userData.photoName = photoName;
      userData.loggedin = loggedin;
      userData.password = password;
      userData.username = username;
      userData.teachersID = teachersID;
      await userData.save();
    } else {
      const newUser = new User({
        teachersID,
        id,
        username,
        email,
        tname,
        school,
        udise,
        desig,
        gender,
        circle,
        empid,
        pan,
        loggedin,
        question,
        password,
        phone,
        url,
        photoName,
      });
      const savedUser = await newUser.save();
    }

    return NextResponse.json(
      {
        message:
          "You have successfully Registered! Please login to your account.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
