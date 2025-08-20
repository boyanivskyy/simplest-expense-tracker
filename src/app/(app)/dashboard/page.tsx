import { CategoryPie } from "@/components/charts/category-pie";
import { DailyBar } from "@/components/charts/daily-bar";
import ExpenseDialog from "@/components/expenses/expense-dialog";
import { ExpensesList } from "@/components/expenses/expenses-list";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="h-dvh p-4 flex flex-col lg:flex-row gap-4">
      {/* Left: charts column */}
      <div className="flex-1 min-h-0 flex flex-col gap-4">
        <div className="flex-1 min-h-[300px]">
          <DailyBar />
        </div>
        <div className="flex-1 min-h-[300px]">
          <CategoryPie />
        </div>
      </div>
      {/* Right: add + list */}
      <div className="w-full lg:max-w-sm min-h-0 flex flex-col gap-4">
        <ExpenseDialog />
        <div className="flex-1 min-h-0">
          <ExpensesList />
        </div>
      </div>
    </div>
  );
}
