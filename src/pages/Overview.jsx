import { useTransactions } from "../hooks/useTransactions";
import { formatCurrency } from "../utils/formatCurrency";
import PeriodSummary from "../components/dashboard/PeriodSummary";
import TrendChart from "../components/dashboard/TrendChart";
import CategoryBreakdownChart from "../components/dashboard/CategoryBreakdownChart";
import MarketWidget from "../components/dashboard/MarketWidget";

export default function Overview() {
  const { transactions, loading } = useTransactions();

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;

  if (loading) {
    return <p className="text-sm text-slate-400">Yükleniyor...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-navy-950 dark:text-white">Genel Bakış</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Genel bakiye:{" "}
          <span
            className={
              balance >= 0
                ? "font-medium text-income-light dark:text-income-dark"
                : "font-medium text-expense-light dark:text-expense-dark"
            }
          >
            {formatCurrency(balance)}
          </span>
        </p>
      </div>

      <PeriodSummary transactions={transactions} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TrendChart transactions={transactions} />
        </div>
        <MarketWidget />
      </div>

      <CategoryBreakdownChart transactions={transactions} />
    </div>
  );
}
