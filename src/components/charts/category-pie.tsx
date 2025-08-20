"use client";
import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#0ea5e9", "#22c55e", "#f97316", "#ef4444", "#a855f7", "#14b8a6"];

export function CategoryPie() {
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
      <CardContent className="h-80">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-foreground/60">
            No data yet.
          </div>
        ) : (
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
        )}
        <div className="mt-2 text-sm text-foreground/70">Total: ${total.toFixed(2)}</div>
      </CardContent>
    </Card>
  );
}
