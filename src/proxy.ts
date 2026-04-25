/**
 * Middleware — no-op.
 * Clerk auth removed; routes are protected client-side.
 */
export default function middleware() {
  // pass-through — client-side auth guards handle protection
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
