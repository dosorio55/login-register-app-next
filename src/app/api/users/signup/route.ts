import User from "@/models/user-model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/db-config/db-config";

connectToDatabase();

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { userName, email, password } = reqBody;

    if (!userName || !email || !password)
      throw new Error("Please provide all required fields");

    const user = await User.findOne({ email });

    if (user) throw new Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({ user: savedUser }, { status: 201 });
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
