import { NextResponse } from "next/server";

// Test endpoint that returns whatever status code you pass as ?code=XXX
// Usage: /api/test-status?code=404
// For timeout test: /api/test-status?code=200&delay=15000
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = parseInt(searchParams.get("code") || "200", 10);
    const delay = parseInt(searchParams.get("delay") || "0", 10);

    if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
    }

    return new NextResponse(
        JSON.stringify({ status: code, message: `Test response with status ${code}` }),
        {
            status: code,
            headers: { "Content-Type": "application/json" },
        }
    );
}
