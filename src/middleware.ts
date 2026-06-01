import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Yeh function `middleware` naam se export hona zaroori hai
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // 1. Bypass logic: Agar login page par hai, toh allow karo
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // 2. Admin protection logic
  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "supersecret");
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      // Token invalid ya expired hone par login par bhejo
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// Config yahan hona zaroori hai
export const config = {
  matcher: ['/admin/:path*'],
};