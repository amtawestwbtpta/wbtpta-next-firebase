import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      // name,  //Removed For Firebase
      teachersID, //Added For Firebase
      id, //Added For Firebase
      username,
      email,
      // sl,  //Removed For Firebase
      tname,
      tsname,
      school,
      udise,
      desig,
      sis,
      circle,
      empid,
      photoName,
      url,
      pan,
      teacher,
      // aadhaar,  //Removed For Firebase
      loggedin,
      dpscst,
      dpsc,
      dpsc1,
      dpsc2,
      dpsc3,
      dpsc4,
      tan,
      question,
      password,
    }: any = reqBody;

    const newUser = new User({
      // name,  //Removed For Firebase
      teachersID, //Added For Firebase
      id, //Added For Firebase
      username,
      email,
      // sl,  //Removed For Firebase
      tname,
      tsname,
      school,
      udise,
      desig,
      sis,
      circle,
      empid,
      photoName,
      url,
      pan,
      teacher,
      // aadhaar,  //Removed For Firebase
      loggedin,
      dpscst,
      dpsc,
      dpsc1,
      dpsc2,
      dpsc3,
      dpsc4,
      tan,
      question,
      password,
    });
    const savedUser = await newUser.save();

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
