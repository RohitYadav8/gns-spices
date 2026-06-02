import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const cleanEmail = email?.trim().toLowerCase();
  const cleanPassword = password?.trim();

  console.log("LOGIN DATA:", cleanEmail, cleanPassword);

  if (
    cleanEmail === "admin@gnsspices.com" &&
    cleanPassword === "Admin@123"
  ) {
    const res = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    res.cookies.set("admin_token", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}