import User from "@/models/user-model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/db-config/db-config";
import jwt from "jsonwebtoken";

connectToDatabase();

export async function GET() {
    try {
        const response = NextResponse.json({ message: "Logout successful", success: true }, { status: 200 });
        
        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),
        });

        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json(
                { error: "An unknown error occurred" },
                { status: 500 }
            );
        }
        
    }
}