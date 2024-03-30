import { connectToDatabase } from "@/db-config/db-config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user-model";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase();

export const GET = async (req: NextRequest) => {
  try {
    const userId = getDataFromToken(req);
    if (!userId) throw new Error("User not found");

    const user = await User.findById(userId.id).select("-password, -__v");

    if (!user) throw new Error("User not found");

    return NextResponse.json(
      { user, message: "User found" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("An unknown error occurred.");
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
};
