"use client";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { convex } from "@/lib/convex";
import { ReactNode } from "react";
import { dark } from "@clerk/themes";

export default function Providers({ children }: { children: ReactNode }) {
	const url = process.env.NEXT_PUBLIC_CONVEX_URL;
	return (
		<ClerkProvider
			publishableKey="pk_test_c3dlZXBpbmctcGVsaWNhbi0yMS5jbGVyay5hY2NvdW50cy5kZXYk"
			appearance={{
				theme: dark,
			}}
		>
			{url ? (
				<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
					{children}
				</ConvexProviderWithClerk>
			) : (
				children
			)}
		</ClerkProvider>
	);
}
