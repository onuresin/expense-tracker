import { formatCurrency } from "../../utils/formatCurrency";
import { startOfToday, startOfWeek, startOfMonth, sumByPeriod } from "../../utils/dateHelpers";
import { useLanguage } from "../../hooks/useLanguage";

export default function PeriodSummary({ transactions }) {
  const { t } = useLanguage();
  const periods = [
    { key: "today", label: t("dashboard.periodToday"), start: startOfToday() },
    { key: "week", label: t("dashboard.periodWeek"), start: startOfWeek() },
    { key: "month", label: t("dashboard.periodMonth"), start: startOfMonth() },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {periods.map((period) => {
        const { income, expense } = sumByPeriod(transactions, period.start);
        const net = income - expense;
        return (
          <div
            key={period.key}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-navy-800 dark:bg-navy-900"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">{period.label}</p>
            <p
              className={`mt-1 text-lg font-semibold ${
                net >= 0
                  ? "text-income-light dark:text-income-dark"
                  : "text-expense-light dark:text-expense-dark"
              }`}
            >
              {net >= 0 ? "+" : ""}
              {formatCurrency(net)}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {t("dashboard.incomeShort")} {formatCurrency(income)} · {t("dashboard.expenseShort")} {formatCurrency(expense)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
