import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEMO_USER_ID } from "@/lib/demo-user";

export async function PATCH() {
  try {
    const user = await prisma.user.update({
      where: { id: DEMO_USER_ID },
      data: { hasOnboarded: true },
      select: { id: true, hasOnboarded: true },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error("[api/user/onboarded PATCH]", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
