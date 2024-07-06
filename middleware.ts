import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getRefreshToken, getToken } from '@/util/cookies/token';
import { getNextPathSetProps } from '@/util/cookies/next-path';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = getToken();
  if (token) {
    return NextResponse.next();
  }
  const queryParams = getRefreshToken() ? '?refresh=true' : '';
  const redirectResponse = NextResponse.redirect(new URL('/login' + queryParams, request.url));
  redirectResponse.cookies.set(getNextPathSetProps(request.nextUrl.pathname));
  return redirectResponse;
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/nextodo/:path*',
  ],
}