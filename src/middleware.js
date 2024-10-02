import { NextResponse } from 'next/server';

export default function middleware(req) {
 const { pathname } = req.nextUrl;

 if (
    pathname.startsWith("/api") || // exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    pathname.includes(".") // exclude all files in the public folder
  ) return NextResponse.next();

  const idToken = req.cookies.get('token');

  if (!idToken) {
    const url = req.nextUrl.clone();
    url.pathname = '/signup';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|favicon.ico|login|signup|authenticate|terms-of-service|privacy|admin|$).*)'],
}
