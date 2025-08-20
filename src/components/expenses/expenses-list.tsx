"use client";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ExpensesList() {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-foreground/60">Configure NEXT_PUBLIC_CONVEX_URL to see data.</div>
        </CardContent>
      </Card>
    );
  }
  const items = useQuery(api.expenses.list, {}) || [];
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[520px] overflow-auto pr-1">
          {items.length === 0 ? (
            <div className="text-sm text-foreground/60">No expenses yet.</div>
          ) : (
            items.map((e: any) => (
              <div key={e._id} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{e.category}</div>
                  <div className="text-xs text-foreground/60">
                    {new Date(e.date).toLocaleDateString()} {e.note ? `• ${e.note}` : ""}
                  </div>
                </div>
                <div className="text-sm font-semibold">${e.amount.toFixed(2)}</div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
