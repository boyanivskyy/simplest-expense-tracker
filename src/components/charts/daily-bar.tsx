"use client";
import { Bar, BarChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DailyBar() {
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
      <CardContent className="h-80">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-foreground/60">
            No data yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} labelFormatter={() => ""} />
              <Bar dataKey="amount" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
