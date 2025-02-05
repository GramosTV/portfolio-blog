import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const i18nMiddleware = createMiddleware({
  locales: ['en', 'pl'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // localeDetection: false,
});

export async function middleware(req: NextRequest) {
  return i18nMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
