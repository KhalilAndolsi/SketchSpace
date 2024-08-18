import connectDB from "@/lib/connectDB";
import Workspace from "@/models/Workspace";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { author, title } = await req.json();
    const workspace = new Workspace({ author, title });
    await workspace.save();
    return NextResponse.json(
      {
        message: `Workspace "${workspace.title}" created successfully`,
        workspace,
        success: true,
      },
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
