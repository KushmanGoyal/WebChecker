import { NextResponse } from "next/server";

const AUTH_PASSWORD = process.env.AUTH_PASSWORD || "admin123";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        if (!password || typeof password !== "string") {
            return NextResponse.json(
                { success: false, error: "Password is required" },
                { status: 400 }
            );
        }

        if (password === AUTH_PASSWORD) {
            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { success: false, error: "Incorrect password" },
            { status: 401 }
        );
    } catch {
        return NextResponse.json(
            { success: false, error: "Invalid request" },
            { status: 400 }
        );
    }
}
