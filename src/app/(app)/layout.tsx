import { UserButton } from "@clerk/nextjs";
import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

export default function AppLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col">
			<header className="flex items-center justify-between p-4">
				<div className="text-lg font-semibold">Simplest Tracker</div>
				<UserButton afterSignOutUrl="/sign-in" />
			</header>
			<Separator />
			<main className="flex-1 p-4">{children}</main>
		</div>
	);
}
