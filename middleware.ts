import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
	publicRoutes: ["/", "/sign-in", "/sign-up"],
	afterAuth(auth, req) {
		const url = new URL(req.url);
		if (!auth.userId && url.pathname.startsWith("/dashboard")) {
			return redirectToSignIn({ returnBackUrl: req.url });
		}
		return NextResponse.next();
	},
});

export const config = {
	matcher: ["/((?!_next|.*\\..*).*)"],
};
