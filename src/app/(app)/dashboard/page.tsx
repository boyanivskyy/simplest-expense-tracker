import { CategoryPie } from "@/components/charts/category-pie";
import { DailyBar } from "@/components/charts/daily-bar";
import ExpenseDialog from "@/components/expenses/expense-dialog";
import { ExpensesList } from "@/components/expenses/expenses-list";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="grid h-dvh grid-cols-1 lg:grid-cols-3 gap-4 p-4">
      <div className="lg:col-span-2 grid grid-rows-2 gap-4 min-h-0">
        <div className="min-h-0">
          <DailyBar />
        </div>
        <div className="min-h-0">
          <CategoryPie />
        </div>
      </div>
      <div className="lg:col-span-1 flex flex-col gap-4 min-h-0">
        <ExpenseDialog />
        <div className="flex-1 min-h-0">
          <ExpensesList />
        </div>
      </div>
    </div>
  );
}
