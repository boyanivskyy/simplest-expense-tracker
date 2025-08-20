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
import { useEffect, useMemo, useState } from "react";

export function DailyBar() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
		return (
			<Card className="h-full min-h-[300px] flex flex-col">
				<CardHeader>
					<CardTitle>Daily Spend (14d)</CardTitle>
				</CardHeader>
				<CardContent className="flex-1 min-h-0 flex items-center justify-center text-sm text-foreground/60">
					Configure NEXT_PUBLIC_CONVEX_URL to see data.
				</CardContent>
			</Card>
		);
	}
	const data = useQuery(api.expenses.byDay, { days: 14 }) || [];
	const ticks = useMemo(() => {
		return data.map((d: any) => d.date);
	}, [data]);
	return (
		<Card className="h-full min-h-[300px] flex flex-col">
			<CardHeader>
				<CardTitle>Daily Spend (14d)</CardTitle>
			</CardHeader>
			<CardContent className="flex-1 min-h-0 flex flex-col">
				{!mounted ? (
					<div className="flex-1 min-h-0 flex items-center justify-center text-sm text-foreground/60">
						Loading chart...
					</div>
				) : data.length === 0 ? (
					<div className="flex-1 min-h-0 flex items-center justify-center text-sm text-foreground/60">
						No data yet.
					</div>
				) : (
					<div className="flex-1 min-h-0">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={data}>
								<XAxis
									dataKey="date"
									ticks={ticks}
									tickMargin={8}
									tick={{
										fill: "currentColor",
										fontSize: 12,
										opacity: 0.7,
									}}
									tickFormatter={(v: string) => {
										const d = new Date(v);
										return `${d.getMonth() + 1}/${d.getDate()}`;
									}}
								/>
								<YAxis hide />
								<Tooltip
									formatter={(v: number) =>
										`$${v.toFixed(2)}`
									}
									labelFormatter={(v: string) => {
										const d = new Date(v);
										return d.toLocaleDateString();
									}}
									contentStyle={{
										backgroundColor: "rgba(0,0,0,0.85)",
										border: "1px solid rgba(255,255,255,0.12)",
										color: "#fff",
									}}
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
