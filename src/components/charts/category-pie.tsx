"use client";
import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

// Muted, dark-theme-friendly palette (with alpha)
const COLORS = [
  "rgba(14,165,233,0.6)", // sky-500
  "rgba(34,197,94,0.6)",  // green-500
  "rgba(249,115,22,0.6)", // orange-500
  "rgba(239,68,68,0.6)",  // red-500
  "rgba(168,85,247,0.6)", // violet-500
  "rgba(20,184,166,0.6)", // teal-500
];

export function CategoryPie() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // If Convex URL isn't configured, show placeholder
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Spend by Category (30d)</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center text-sm text-foreground/60">
          Configure NEXT_PUBLIC_CONVEX_URL to see data.
        </CardContent>
      </Card>
    );
  }
  const data = useQuery(api.expenses.byCategory, { days: 30 }) || [];
  const total = data.reduce((s: number, d: any) => s + (d.value || 0), 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spend by Category (30d)</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        {!mounted ? (
          <div className="h-full flex items-center justify-center text-sm text-foreground/60">
            Loading chart...
          </div>
        ) : data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-foreground/60">
            No data yet.
          </div>
        ) : (
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} />
                <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={100} label>
                  {data.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="mt-3 text-sm text-foreground/70">Total: ${total.toFixed(2)}</div>
      </CardContent>
    </Card>
  );
}
