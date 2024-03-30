import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

type tokenData = {
  id: string;
};

export const getDataFromToken = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value ?? "";

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) throw new Error("JWT secret is not defined");

    const decodedToken = jwt.verify(token, jwtSecret);

    if (!decodedToken) throw new Error("Token is not valid");

    if (typeof decodedToken !== "object") throw new Error("Token is not valid");

    return decodedToken as tokenData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred.");
    }
  }
};
