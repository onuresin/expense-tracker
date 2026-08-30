import { useTransactions } from "../hooks/useTransactions";

import PeriodSummary from "../components/dashboard/PeriodSummary";
import TrendChart from "../components/dashboard/TrendChart";
import CategoryBreakdownChart from "../components/dashboard/CategoryBreakdownChart";
import MarketWidget from "../components/dashboard/MarketWidget";
import { useLanguage } from "../hooks/useLanguage";
import { useCurrency } from "../hooks/useCurrency";

export default function Overview() {
  const { transactions, loading } = useTransactions();
  const { t } = useLanguage();
  const { formatAmount } = useCurrency();

  const totalIncome = transactions.filter((tx) => tx.type === "income").reduce((s, tx) => s + tx.amount, 0);
  const totalExpense = transactions.filter((tx) => tx.type === "expense").reduce((s, tx) => s + tx.amount, 0);
  const balance = totalIncome - totalExpense;

  if (loading) {
    return <p className="text-sm text-slate-400">{t("common.loading")}</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-navy-950 dark:text-white">{t("dashboard.title")}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t("dashboard.overallBalance")}{" "}
          <span
            className={
              balance >= 0
                ? "font-medium text-income-light dark:text-income-dark"
                : "font-medium text-expense-light dark:text-expense-dark"
            }
          >
            {formatAmount(balance)}
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
