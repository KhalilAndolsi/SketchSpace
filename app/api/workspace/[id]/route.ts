import connectDB from "@/lib/connectDB";
import Workspace from "@/models/Workspace";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const workspace = await Workspace.findById(params.id);
    if (!workspace) {
      return NextResponse.json(
        { message: "Workspace not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: `Workspace "${workspace.title}" exist`,
        workspace,
        success: false,
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { title, elements } = await req.json();
    const updatedData = await Workspace.findByIdAndUpdate(
      params.id,
      { title, elements },
      { new: true }
    );
    return NextResponse.json(
      { message: "Workspace updated successfully", updatedData, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const workspaceIsExist = await Workspace.findById(params.id);
    if (!workspaceIsExist) {
      return NextResponse.json(
        { message: "Workspace not found!", success: false },
        { status: 404 }
      );
    }
    await Workspace.findByIdAndDelete(params.id);
    return NextResponse.json(
      { message: "Workspace deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json(null, {
    status: 204,
    headers: {
      Allow: "GET, POST, PUT, DELETE, OPTIONS",
    },
  });
}

export const dynamic = "force-dynamic";
