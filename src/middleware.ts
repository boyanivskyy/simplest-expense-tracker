import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const session = await auth();
  if (!isPublicRoute(req) && !session.userId) {
    return session.redirectToSignIn({ returnBackUrl: req.url });
  }
});

export const config = {
  // Recommended Clerk matcher for App Router
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
