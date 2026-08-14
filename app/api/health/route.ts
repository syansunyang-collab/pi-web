import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    name: "Pi Web",
    version: process.env.NEXT_PUBLIC_APP_VERSION ?? "unknown",
    piVersion: process.env.NEXT_PUBLIC_PI_VERSION ?? "unknown",
    deployment: "local-tool-result-images-v2",
  });
}
