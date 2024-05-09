import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/user";
import Teacher from "../../../models/teacher";
dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      id,
      tname,
      tsname,
      school,
      desig,
      pan,
      udise,
      sis,
      circle,
      empid,
      question,
      email,
      phone,
    }: any = reqBody;

    let teacherData = await Teacher.findOne(id);
    if (teacherData) {
      teacherData.tname = tname;
      teacherData.tsname = tsname;
      teacherData.school = school;
      teacherData.desig = desig;
      teacherData.pan = pan;
      teacherData.udise = udise;
      teacherData.sis = sis;
      teacherData.circle = circle;
      teacherData.empid = empid;
      teacherData.question = question;
      teacherData.email = email;
      teacherData.phone = phone;
      await teacherData.save();
      let userData = await User.findOne(id);
      if (userData) {
        userData.tname = tname;
        userData.tsname = tsname;
        userData.school = school;
        userData.desig = desig;
        userData.pan = pan;
        userData.udise = udise;
        userData.sis = sis;
        userData.circle = circle;
        userData.empid = empid;
        userData.question = question;
        userData.email = email;
        userData.phone = phone;
        await userData.save();
      }
      return NextResponse.json(
        {
          message: "User Updated Successfully",
          success: true,
          statusText: "Success",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "User Not Found",
          success: false,
          statusText: "Not Found",
        },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
