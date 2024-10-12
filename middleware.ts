import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getRefreshToken, getRefreshTokenSetProps, getToken, getTokenSetProps } from '@/util/cookies/token';
import { getNextPathSetProps } from '@/util/cookies/next-path';
import { refreshLogin } from './features/auth/actions';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = getToken();
  if (token) {
    return NextResponse.next();
  }
  const refreshToken = getRefreshToken();
  if(refreshToken){
    const result = await refreshLogin(refreshToken);
    if(result){
      const next = NextResponse.next();
      next.cookies.set(getTokenSetProps(result.access));
      next.cookies.set(getRefreshTokenSetProps(result.refresh));
      return next;
    }
  }
  const redirectResponse = NextResponse.redirect(new URL('/login', request.url));
  redirectResponse.cookies.set(getNextPathSetProps(request.nextUrl.pathname));
  return redirectResponse;
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/nextodo/:path*',
  ],
}