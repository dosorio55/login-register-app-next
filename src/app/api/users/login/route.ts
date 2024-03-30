import User from "@/models/user-model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/db-config/db-config";
import jwt from "jsonwebtoken";

connectToDatabase();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    if (!email || !password)
      throw new Error("Please provide all required fields");

    const user = await User.findOne({ email });

    if (!user) throw new Error("User or password is incorrect");

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) throw new Error("User or password is incorrect");

    const tokenData = {
      id: user._id,
    };

    const tokenSecret = process.env.TOKEN_SECRET;

    if (!tokenSecret) throw new Error("Token secret is not defined");

    const token = jwt.sign(tokenData, tokenSecret, {
      expiresIn: "1h",
    });

    const nextResponse = NextResponse.json(
      { message: "Login successfull", success: true },
      { status: 200 }
    );

    nextResponse.cookies.set("token", token, {
      httpOnly: true, // Means cookie is not accessible through JavaScript in the client
      secure: process.env.NODE_ENV === "production", // Means cookie is only available on https but for development it is available on http
      path: "/", // Means on what paths the cookie is available
      sameSite: "strict",
    });

    return nextResponse
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
};
