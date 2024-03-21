import { NextResponse, NextRequest } from 'next/server';
import { isAuthenticated } from './lib/jwtTokenControl';


export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const result = await isAuthenticated(request)
  console.log(result)

  if (!result) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|login|_next/static|_next/image|favicon.ico).*)',],
};