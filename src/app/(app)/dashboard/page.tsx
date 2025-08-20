import { CategoryPie } from "@/components/charts/category-pie";
import { DailyBar } from "@/components/charts/daily-bar";
import ExpenseDialog from "@/components/expenses/expense-dialog";
import { ExpensesList } from "@/components/expenses/expenses-list";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-4">
        <DailyBar />
        <CategoryPie />
      </div>
      <div className="lg:col-span-1 space-y-4">
        <ExpenseDialog />
        <ExpensesList />
      </div>
    </div>
  );
}
