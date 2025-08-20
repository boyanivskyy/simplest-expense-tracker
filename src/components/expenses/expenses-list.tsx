"use client";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import ExpenseDialog from "@/components/expenses/expense-dialog";

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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <div className="space-y-3 h-full overflow-auto pr-1">
          {items.length === 0 ? (
            <div className="text-sm text-foreground/60">No expenses yet.</div>
          ) : (
            items.map((e: any) => (
              <div key={e._id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{e.category}</div>
                  <div className="text-xs text-foreground/60 truncate">
                    {new Date(e.date).toLocaleDateString()} {e.note ? `• ${e.note}` : ""}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold min-w-[72px] text-right">
                    ${e.amount.toFixed(2)}
                  </div>
                  <ExpenseDialog
                    initial={{
                      id: e._id,
                      amount: e.amount,
                      category: e.category,
                      note: e.note,
                      date: e.date,
                    }}
                    trigger={
                      <Button variant="ghost" size="icon" aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    }
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
