"use client";
import {
	Bar,
	BarChart,
	Tooltip,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from "recharts";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export function DailyBar() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Daily Spend (14d)</CardTitle>
				</CardHeader>
				<CardContent className="h-80 flex items-center justify-center text-sm text-foreground/60">
					Configure NEXT_PUBLIC_CONVEX_URL to see data.
				</CardContent>
			</Card>
		);
	}
	const data = useQuery(api.expenses.byDay, { days: 14 }) || [];
	return (
		<Card>
			<CardHeader>
				<CardTitle>Daily Spend (14d)</CardTitle>
			</CardHeader>
			<CardContent className="h-full ">
				{!mounted ? (
					<div className="h-full flex items-center justify-center text-sm text-foreground/60">
						Loading chart...
					</div>
				) : data.length === 0 ? (
					<div className="h-full flex items-center justify-center text-sm text-foreground/60">
						No data yet.
					</div>
				) : (
					<div className="h-full ">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={data}>
								<XAxis dataKey="date" hide />
								<YAxis hide />
								<Tooltip
									formatter={(v: number) =>
										`$${v.toFixed(2)}`
									}
									labelFormatter={() => ""}
								/>
								<Bar
									dataKey="amount"
									fill="rgba(14,165,233,0.6)"
									radius={[4, 4, 0, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
