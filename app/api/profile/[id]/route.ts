import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const info = await User.findById(params.id)
      .select("-password")
      .populate({
        path: "workspaces",
        options: { sort: { createdAt: -1 } },
      });

    if (!info) {
      return NextResponse.json(
        { message: "User info is not found!", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Workspace exists", info, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
