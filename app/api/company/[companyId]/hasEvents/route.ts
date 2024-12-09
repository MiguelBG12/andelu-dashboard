import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { companyId: string } }) {
  try {
    const { companyId } = params;

    const eventCount = await db.event.count({
      where: {
        companyId,
      },
    });

    return NextResponse.json(eventCount > 0);
  } catch (error) {
    console.error("[HAS_EVENTS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
