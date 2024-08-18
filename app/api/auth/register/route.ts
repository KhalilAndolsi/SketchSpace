import connectDB from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { username, email, password } = await req.json();
    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json(
        { message: "This Email already exists", success: false },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);
    const account = new User({ username, email, password: hashedPassword });
    await account.save();
    return NextResponse.json(
      {
        message: `${username}'s account created successfully`,
        success: true,
        account,
      },
      { status: 200 }
    );
  } catch (error: any) {
    // console.log(error)
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic'
