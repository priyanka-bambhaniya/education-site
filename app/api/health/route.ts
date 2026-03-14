import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "eduinsight-pro",
    timestamp: new Date().toISOString(),
  });
}
