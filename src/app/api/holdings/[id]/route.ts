import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEMO_USER_ID } from "@/lib/demo-user";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.holding.deleteMany({
      where: { id, userId: DEMO_USER_ID },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/holdings/[id] DELETE]", error);
    return NextResponse.json({ error: "Failed to delete holding" }, { status: 500 });
  }
}
