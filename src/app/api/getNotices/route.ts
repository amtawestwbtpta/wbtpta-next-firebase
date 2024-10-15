import dbConnect from "../../../lib/dbConnect";
import Notice from "../../../models/notices";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const NoticeData = await Notice.find();
    if (NoticeData) {
      return NextResponse.json(
        {
          message: "Here is the List of Notices.",
          success: true,
          data: NoticeData,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Cannot Find any Notice",
          success: false,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}